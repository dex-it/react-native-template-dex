import {Playground} from "../../common/playground";
import {extendWithDontPushTwoPageInStack} from "../extendWithDontPushTwoPageInStack";
import {NavigationPages} from "../navigation";
import {InDeveloping} from "../../common/components/InDeveloping";
import { createStackNavigator } from "react-navigation-stack";
import {Colors} from "../../core/theme";

export const RootNavigator = createStackNavigator({
    [NavigationPages.playground]: {screen: Playground},
    [NavigationPages.inDevelopment]: {screen: InDeveloping},
}, {
    headerMode: "screen",
    navigationOptions: {
        cardStyle: {
            backgroundColor: {
                light: Colors.white,
                dark: Colors.black,
            },
        },
    },
});

extendWithDontPushTwoPageInStack(RootNavigator.router);