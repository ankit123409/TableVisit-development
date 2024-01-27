import {observer} from "mobx-react-lite";
import {List, Paragraph, useTheme} from "react-native-paper";
import {View} from "react-native";
import * as React from "react";
import {AppStyles} from "../../theme";
import {Screen, ScreenBack} from "../../components";

export const ManageLocationScreen = observer(function ManageLocationScreen() {

    const {
        colors
    } = useTheme();

    return (
        <ScreenBack
            unsafe={true}
            backgroundColor={colors.background}
        >
            <List.Section>
                <View style={AppStyles.row}>
                    <View style={AppStyles.wrapper}>
                        <Paragraph style={AppStyles.title_center}>Manage Location Screen</Paragraph>
                    </View>
                </View>
            </List.Section>
        </ScreenBack>
    );
})
