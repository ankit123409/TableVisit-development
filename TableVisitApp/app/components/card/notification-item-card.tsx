import * as React from 'react';
import {TouchableOpacity, View} from "react-native";
import {AppStyles} from "../../theme";
import {RootNavigation} from "../../navigators";

export const NotificationItemCard = ({notification, index}: {
    notification: any;
    index: number;
}) => {
    return (
        <TouchableOpacity
            onPress={async () => {
                RootNavigation.navigate("chat");
            }}
        >
            <View style={AppStyles.venue_list_container}>

            </View>
        </TouchableOpacity>
    );
};
