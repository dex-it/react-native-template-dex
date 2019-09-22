import React, {PureComponent} from "react";
import {ScrollView, View, Text, ViewStyle, TextStyle} from "react-native";
import {Colors, CommonStyles} from "../../core/theme";
import {showInDevAlert} from "../helpers";
import {localization} from "../localization/localization";
import {MainButton} from "../components/MainButton";
import {ButtonType} from "../enums/buttonType";
import {styleSheetCreate} from "../utils";

interface IState {
}

export class Playground extends PureComponent<IEmpty, IState> {
    constructor(props: IEmpty) {
        super(props);
        this.state = {
        };
    }

    render(): JSX.Element {
        return (
            <ScrollView style={CommonStyles.flexWhiteBackground}>
                {this.renderContentInfo("MainButton (Action)")}
                <MainButton type={ButtonType.Action} onPress={showInDevAlert} title={localization.common.ok}/>
                {this.renderContentInfo("MainButton (Negative)")}
                <MainButton type={ButtonType.Negative} onPress={showInDevAlert} title={localization.common.ok}/>
                {this.renderContentInfo("MainButton (Positive)")}
                <MainButton type={ButtonType.Positive} onPress={showInDevAlert} title={localization.common.ok}/>
                {this.renderContentInfo("MainButton (Neutral)")}
                <MainButton type={ButtonType.Neutral} onPress={showInDevAlert} title={localization.common.ok}/>
                {this.renderContentInfo("MainButton (Transparent)")}
                <MainButton type={ButtonType.Transparent} onPress={showInDevAlert} title={localization.common.ok}/>
                {this.renderContentInfo("MainButton (Border)")}
                <MainButton type={ButtonType.Border} onPress={showInDevAlert} title={localization.common.ok}/>
            </ScrollView>
        );
    }

    private renderContentInfo = (title: string): JSX.Element => {
        return (
            <React.Fragment>
                <View style={styles.contentContainer}/>
                <Text style={styles.title}>{title}</Text>
            </React.Fragment>
        );
    };
}

const styles = styleSheetCreate({
    contentContainer: {
        marginTop: 30,
        borderTopWidth: 1,
        borderTopColor: "purple",
    } as ViewStyle,
    title: {
        color: Colors.black,
        textAlign: "center",
        marginVertical: 10,
    } as TextStyle,
    colorContainer: {
        alignItems: "center",
        justifyContent: "center",
    } as ViewStyle,
    colorItem: {
        width: 100,
        height: 100,
    },
});