import React, {ErrorInfo, PureComponent} from "react";
import {Store} from "redux";
import {AppStateStatus, EventSubscription, UIManager, View} from "react-native";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {appSettingsProvider} from "./core/settings";
import {configureStore, MigrateStoreMode} from "./core/store/configureStore";
import {IAppState} from "./core/store/appState";
import {UnhandledError} from "./common/components/UnhandledError";
import {Splash} from "./common/components/Splash";
import {EventNames, eventRegister} from "./common/eventRegister";
import {BaseRequest} from "./core/api";
import {CommonStyles} from "./core/theme";
import {NavigationActions} from "./navigation/navigation";
import {SystemActions} from "./core/store/systemActions";
import _ from "lodash";
import DevMenu from "react-native-dev-menu";
import {TokenResponse} from "./core/identity/generated/dto/TokenResponse.g";
import {LoadingModal} from "./common/components/LoadingModal";
import {BugsnagConfiguration} from "./core/BugsnagConfiguration";
import {localization} from "./common/localization/localization";
import {BackButtonHandler} from "./navigation/components";
import {initNavigationConfig} from "./navigation/config/initNavigationConfig";
import {NavigationConfig} from "./navigation/config";
import {Appearance, AppearanceProvider} from "react-native-appearance";
import {AppearancePreferences, ColorSchemeName} from "react-native-appearance/src/Appearance.types";
import {NavigationAction} from "react-navigation";

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
initNavigationConfig();

interface IState {
  isError: boolean;
  appState: AppStateStatus;
  theme: ColorSchemeName;
}

export class App extends PureComponent<IEmpty, IState> {
  private store: Store<IAppState>;
  private persistor: any;
  private logoutListenerId: string;
  private forceResetListenerId: string;
  private changeLanguageListenerId: string;
  private changeThemeListenerId: EventSubscription;

  constructor(props: IEmpty) {
    super(props);
    this.onStoreConfigured = this.onStoreConfigured.bind(this);
    this.resetState = this.resetState.bind(this);
    this.forceResetApp = this.forceResetApp.bind(this);
    this.logout = this.logout.bind(this);
    this.forceChangeLanguage = this.forceChangeLanguage.bind(this);
    this.onThemeChanged = this.onThemeChanged.bind(this);

    this.createStore(appSettingsProvider.settings.devOptions.purgeStateOnStart
        ? MigrateStoreMode.purge
        : MigrateStoreMode.none,
    );

    this.state = {isError: false, appState: "active", theme: Appearance.getColorScheme()};
  }

  componentDidMount(): void {
    this.logoutListenerId = eventRegister.addEventListener(EventNames.logout, this.logout);
    this.forceResetListenerId = eventRegister.addEventListener(EventNames.reset, this.forceResetApp);
    this.changeLanguageListenerId = eventRegister.addEventListener(EventNames.changeLanguage, this.forceChangeLanguage);
    this.changeThemeListenerId = Appearance.addChangeListener(this.onThemeChanged);
  }
  componentWillUnmount(): void {
    eventRegister.removeEventListener(this.logoutListenerId);
    eventRegister.removeEventListener(this.changeLanguageListenerId);
    eventRegister.removeEventListener(this.forceResetListenerId);
    this.changeThemeListenerId.remove();
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.warn("UnhandledError with Info: ", errorInfo);
    BugsnagConfiguration.notifyIfNeedIt(error, "UnhandledError", {errorInfo});
    this.setState({isError: true});
  }

  render(): JSX.Element {
    if (this.state.isError) {
      return <UnhandledError onReset={this.forceResetApp}/>;
    } else {
      const RootNavigation = NavigationConfig.instance.getNavigationComponent("root");

      return (
          <AppearanceProvider>
            <Provider store={this.store}>
              <PersistGate loading={<Splash/>} persistor={this.persistor}>
                <View style={CommonStyles.flex1}>
                  <BackButtonHandler/>
                  <RootNavigation theme={this.state.theme}/>
                  <LoadingModal/>
                </View>
              </PersistGate>
            </Provider>
          </AppearanceProvider>
      );
    }
  }

  private createStore(mode: MigrateStoreMode): void {
    const {store, persistor} = configureStore(this.onStoreConfigured, {migrateMode: mode});
    this.store = store;
    this.persistor = persistor;
  }

  private onStoreConfigured(): void {
    if (__DEV__) {
      DevMenu.addItem(
          "Navigate to Playground",
          (): NavigationAction => this.store.dispatch(NavigationActions.navigateToPlayground()),
      );
    }

    const store = this.store;
    const state = store.getState();

    if (state != null && state.entities != null) {
      localization.setLanguage(state.entities.language);
    }

    BaseRequest.globalOptions = {
      setToken: (t: TokenResponse): any => this.store.dispatch(SystemActions.setToken(t)),
      getToken: (): string | null => this.store.getState().system.authToken,
      onAuthError: _.debounce((): void => {
        this.logout();
      }, 600),
    };

    if (appSettingsProvider.settings.useBugReporter) {
      BugsnagConfiguration.configure(this.store);
    }
  }

  private logout(): void {
    this.setState({isError: true}, (): void => {
      setTimeout((): void => this.resetState(MigrateStoreMode.resetStateWithToken), 100);
    });
  }

  private resetState(mode: MigrateStoreMode): void {
    this.createStore(mode);
    this.setState({isError: false});
  }

  private forceResetApp(): void {
    this.setState({isError: true}, (): void => {
      this.resetState(MigrateStoreMode.resetStatePreserveToken);
    });
  }

  private forceChangeLanguage(): void {
    const language = this.store.getState().entities.language;
    localization.setLanguage(language);
    this.setState({isError: true}, (): void => {
      this.setState({isError: false});
    });
  }

  private onThemeChanged(preferences: AppearancePreferences): void {
    this.setState({theme: preferences.colorScheme});
  }
}