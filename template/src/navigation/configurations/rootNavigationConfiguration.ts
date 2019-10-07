import {Playground} from "../../common/playground";
import {extendWithDontPushTwoPageInStack} from "../extendWithDontPushTwoPageInStack";
import {NavigationPages} from "../navigation";
import {InDeveloping} from "../../common/components/InDeveloping";
import { createStackNavigator } from "react-navigation-stack";

export const RootNavigator = createStackNavigator({
    [NavigationPages.playground]: {screen: Playground},
    [NavigationPages.inDevelopment]: {screen: InDeveloping},
}, {
    headerMode: "screen"
});

extendWithDontPushTwoPageInStack(RootNavigator.router);