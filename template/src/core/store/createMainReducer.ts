import {combineReducers, Reducer} from "redux";
import {entitiesReducer} from "../../modules/entities/entitiesReducer";
import {IAppState, INavigationState} from "./appState";
import {Reducers} from "./Reducers";
import {systemReducer} from "./systemReducer";
import {NavigationConfig} from "../../navigation/config";

export function createMainReducer(combineMethod: (reducers: any) => Reducer<IAppState>): Reducer<IAppState> {
    const navigationReducers: Reducers<INavigationState> = NavigationConfig.instance.getReducer();

    const reducers: Reducers<IAppState> = {
        navigation: combineReducers(navigationReducers),
        system: systemReducer,
        entities: entitiesReducer,
    };

    return combineMethod(reducers);
}