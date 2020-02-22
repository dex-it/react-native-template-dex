import React, {Component} from "react";
import {SafeAreaView, Text, TextStyle, TouchableOpacity, View, ViewStyle} from "react-native";
import {styleSheetCreate, styleSheetFlatten} from "../utils";
import {Colors, CommonStyles, Fonts, minWindowDimension} from "../../core/theme";
import {HeaderHeightContext} from "react-navigation-stack";

export class UnhandledError extends Component<IProps> {
    render(): JSX.Element {
        const header = this.props.hideHeader ? null : (
            <HeaderHeightContext.Consumer>
                {this.renderHeader}
            </HeaderHeightContext.Consumer>
        );

        return (
            <View style={styles.container}>
                {header}
                <View style={CommonStyles.flex1}/>
                <Text style={styles.text}>An unexpected error occurred</Text>
                <Text style={styles.text}>We already work on it</Text>
                <View style={styles.separator}/>
                <TouchableOpacity onPress={this.props.onReset}>
                    <Text style={styles.continueText}>Send a report and continue</Text>
                </TouchableOpacity>
                <View style={CommonStyles.flex1}/>
            </View>
        );
    }

    private renderHeader = (headerHeight: number): JSX.Element => {
        const headerStyle = styleSheetFlatten(styles.header, {height: headerHeight});

        return (
            <SafeAreaView style={headerStyle}>
                <View style={headerStyle}/>
            </SafeAreaView>
        );
    };
}

interface IProps {
    hideHeader?: boolean;
    onReset: () => void;
}

const styles = styleSheetCreate({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.white,
    } as ViewStyle,
    text: {
        color: Colors.black,
        fontSize: 18,
        fontFamily: Fonts.regular,
    } as TextStyle,
    separator: {
        margin: 20,
    } as ViewStyle,
    continueText: {
        fontFamily: Fonts.regular,
        fontSize: 15,
        color: Colors.black,
        margin: 10,
    } as TextStyle,
    header: {
        backgroundColor: Colors.black,
        width: minWindowDimension,
    } as ViewStyle,
});