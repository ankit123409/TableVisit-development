import { observer } from "mobx-react-lite";
import * as React from "react";
import { AppColors, AppStyles, moderateScale, scale, verticalScale } from "../../theme";
import { DialogLoadingIndicator, Screen, ScreenBack } from "../../components";
import { Dimensions, FlatList, Image, RefreshControl, SafeAreaView, StyleSheet, Text } from "react-native";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import {
    TouchableOpacity,
    View,
} from "react-native";
import { RootNavigation } from "../../navigators";
import { Button, Divider, List, Paragraph, Snackbar } from "react-native-paper";
import BankDetailsSheet from "./Bank_Details_Sheet";


type DataType = {
    id: number
    title: string
    price: string
}
const data: DataType[] = [
    {
        id: 1,
        title: "Alena Lubin",
        price: "$ 13"
    },
    {
        id: 2,
        title: "Craig Dorwart",
        price: "$ 17"
    },
    {
        id: 3,
        title: "Roger Septimus",
        price: "$ 15"
    },
    {
        id: 4,
        title: "Zaire Vetrovs",
        price: "$ 32"
    },
    {
        id: 5,
        title: "Gretchen Botosh",
        price: "$ 20"
    },
    {
        id: 6,
        title: "Tiana Schleifer",
        price: "$ 18"
    },
    {
        id: 7,
        title: "Tiana Schleifer",
        price: "$ 18"
    },
    {
        id: 8,
        title: "Tiana Schleifer",
        price: "$ 18"
    },
    {
        id: 9,
        title: "Tiana Schleifer",
        price: "$ 18"
    },
]
export const WithdrowScreen = observer(function WithdrowScreen(props) {

    const [isVisible, setIsVisible] = React.useState({ 
        visible: false,
      });
      const [isCloseConfirm, setIsCloseConfirm] = React.useState<{
        visible: false;
      }>({
        visible: false,
      });

    const renderNotifications = ({ item }: { item: DataType }) => {
        return (
            <TouchableOpacity onPress={async () => { }}>
                <View style={styles.venue_list_container}>
                    <View
                        style={{
                            width: '100%',
                            flexDirection: "row",
                            justifyContent: "space-between"
                        }}
                    >
                        <Paragraph
                            numberOfLines={1}
                            style={[AppStyles.venue_card_name, { fontSize: moderateScale(13), fontFamily: "Roboto-Regular" }]}
                        >
                            {item.title}
                        </Paragraph>
                        <Paragraph
                            numberOfLines={2}
                            style={styles.time_style}
                        >
                            {item?.price}
                        </Paragraph>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <>
            <SafeAreaView style={{ flex: 1 }}>
                <ScreenBack
                    unsafe={true}
                    style={AppStyles.screen_container}
                    backgroundColor={AppColors.BG}
                >
                    <View
                        style={{ flex: 1 }}
                    >
                        <View style={{
                            marginTop: verticalScale(30),
                            paddingBottom: 1,
                            justifyContent: "center",
                            alignSelf: "center",
                            alignItems: "center",
                            marginBottom: verticalScale(10)

                        }}>
                            <Text style={styles.titleStyle}>Total Tip</Text>
                            <Text style={styles.descriptionStyle}>$1700</Text>
                        </View>
                        <View style={{height : verticalScale(400)}}>
                            <FlatList
                                data={data}
                                style={AppStyles.flat_container}
                                showsVerticalScrollIndicator={false}
                                renderItem={renderNotifications}
                                keyExtractor={(item) => item.id.toString()}
                            ></FlatList>
                        </View>
                        <Button
                            mode="contained"
                            dark={true}
                            buttonColor={AppColors.LOGO_COLOR}
                            style={[
                                AppStyles.button,
                                {
                                    marginHorizontal: scale(47),
                                    borderRadius: scale(10),
                                },
                            ]}
                            onPress={() => {
                                setIsVisible({
                                    visible : true
                                })
                            }}
                            contentStyle={AppStyles.button_content}
                            labelStyle={{
                                fontSize: moderateScale(18),
                                fontFamily: 'Roboto-bold',
                            }}
                        >
                            Balance
                        </Button>
                    </View>
                </ScreenBack>
            </SafeAreaView>
            {isVisible.visible && (
        <BankDetailsSheet
          isVisible={isVisible}
          setIsVisible={() =>
            setIsVisible({
              visible: false,
            })
          }
          props={props}
        />
      )}
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