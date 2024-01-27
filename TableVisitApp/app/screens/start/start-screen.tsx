import {observer} from "mobx-react-lite";
import * as React from 'react';
import {ScrollView, View, Text} from 'react-native';
import {List, useTheme} from "react-native-paper";
import {AppStyles} from "../../theme/app-theme";

export const StartScreen = observer(function StartScreen() {
    const {
        colors
    } = useTheme();
    //const navigation = useNavigation()

    return (
        <ScrollView
            style={[AppStyles.container, {backgroundColor: colors.background}]}
        >
            <List.Section>
                <View style={AppStyles.row}>
                    <View style={AppStyles.container}>
                        <Text style={AppStyles.title}>Start Screen</Text>
                    </View>
                </View>
            </List.Section>
        </ScrollView>
    );
})
