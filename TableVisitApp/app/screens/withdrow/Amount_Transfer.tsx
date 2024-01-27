import { observer } from "mobx-react-lite";
import * as React from "react";
import { AppColors, AppStyles, moderateScale, scale, verticalScale } from "../../theme";
import { DialogLoadingIndicator, Screen, ScreenBack } from "../../components";
import { Dimensions, FlatList, Image, RefreshControl, SafeAreaView, StyleSheet, Text } from "react-native";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import {
    View,
} from "react-native";
import { Button, Paragraph } from "react-native-paper";



export const AmountTransfer = observer(function AmountTransfer(props) {

    return (
        <>
            <SafeAreaView style={{ flex: 1 }}>
                <ScreenBack
                    unsafe={true}
                    style={AppStyles.screen_container}
                    backgroundColor={AppColors.BG}
                >
                    <View
                        style={{
                            flex: 1, display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <View style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            gap : verticalScale(10)
                        }}>
                            <Image
                                style={{ width: scale(80), resizeMode: 'contain', height: verticalScale(80) }}
                                source={require('../../screens/shared/transfer.png')}
                            />
                            <Paragraph style={{ color: "#FDBD59", fontSize: moderateScale(25), lineHeight: moderateScale(26), fontFamily: "Roboto-Bold", textAlign: "center" }}>
                                Your Amount Transfer Successfully
                            </Paragraph>
                        </View>
                        <Button
                            mode="contained"
                            dark={true}
                            onPress={() => props.navigation.navigate("dj")}
                            buttonColor={AppColors.LOGO_COLOR}
                            style={[
                                AppStyles.button,
                                {
                                    marginHorizontal: scale(47),
                                    borderRadius: scale(10),
                                    position : "absolute",
                                    bottom : verticalScale(20)
                                },
                            ]}
                            contentStyle={AppStyles.button_content}
                            labelStyle={{
                                fontSize: moderateScale(18),
                                fontFamily: 'Roboto-bold',
                            }}
                        >
                            Back to main page
                        </Button>
                    </View>
                </ScreenBack>
            </SafeAreaView>
        </>
    );
});


const styles = StyleSheet.create({
    titleStyle: {
        fontSize: moderateScale(13),
        color: "#B1B1AF"
    },
    descriptionStyle: {
        fontSize: moderateScale(35),
        color: "#FDBD59",
        fontFamily: "Roboto-Bold"
    },
    venue_list_container: {
        marginLeft: scale(12),
        marginRight: scale(12),
        marginBottom: verticalScale(12),
        backgroundColor: '#2E3034',
        paddingHorizontal: scale(10),
        paddingVertical: verticalScale(10),
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        borderRadius: scale(5),
    },
    column_wrap: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
    },
    time_style: {
        color: "#FDBD59",
        fontSize: moderateScale(13),
        fontFamily: 'Roboto-Bold',
        textAlign: 'right',
        lineHeight: verticalScale(14),
        flexDirection: 'row',
        alignSelf: 'flex-end',
        justifyContent: 'flex-end',
    },
})