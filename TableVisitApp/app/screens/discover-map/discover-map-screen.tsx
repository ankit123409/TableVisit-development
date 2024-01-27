import {observer} from "mobx-react-lite";
import * as React from 'react';
import {StyleSheet, ScrollView, View, Text} from 'react-native';
import {List, useTheme} from "react-native-paper";
import {AppStyles} from "../../theme";

export const DiscoverMapScreen = observer(function DiscoverMapScreen() {

    const {
        colors
    } = useTheme();
    //const navigation = useNavigation()

    return (
        <ScrollView
            style={[styles.container, {backgroundColor: colors.background}]}
        >
            <List.Section>
                <View style={styles.row}>
                    <View style={styles.container}>
                        <Text style={AppStyles.title}>Discover Map Screen</Text>
                    </View>
                </View>
            </List.Section>
        </ScrollView>
    );
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 12,
    },
});
