import React, {ReactNode} from "react";
import {View} from "react-native";
import {ImageResources} from "../../common/ImageResources.g";
import {NavigationActions} from "../../navigation/navigation";
import {Colors} from "./colors";
import {HeaderWrapper, HeaderButton} from "../../navigation/components";
import {eventRegister} from "../../common/eventRegister";
import {NavigationStackOptions} from "react-navigation-stack";
import {StackHeaderLeftButtonProps} from "react-navigation-stack/src/vendor/types";
import {StackHeaderProps} from "react-navigation-stack/lib/typescript/src/vendor/types";

export const NoHeaderNavigation: NavigationStackOptions = {
    header: undefined,
};

export function mainHeaderNavigation(mode: "back", right: "none" | "event", eventName?: string):
    NavigationStackOptions {
    const rightImage = ImageResources.image_back;
    const rightAction = NavigationActions.navigateToBack;
    const eventClick = (): void => eventRegister.emitEvent(eventName!);

    let rightNode: ReactNode;

    switch (right) {
        case "event":
            rightNode = <HeaderButton image={ImageResources.image_back} onPress={eventClick}/>;
            break;
        default:
            rightNode = <View/>;
            break;
    }

    return {
        header: (props: StackHeaderProps): any => <HeaderWrapper {...props}/>,
        headerLeft: (props: StackHeaderLeftButtonProps): JSX.Element => <HeaderButton image={rightImage} action={rightAction}/>,
        headerRight: (props: { tintColor?: string }): ReactNode => rightNode,
        headerTitle: "",
        headerStyle: {
            borderBottomWidth: 0,
            elevation: 0,
            backgroundColor: Colors.transparent,
        },
    };
}