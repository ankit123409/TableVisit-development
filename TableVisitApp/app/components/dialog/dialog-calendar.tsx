import * as React from "react";
import { Portal, Dialog, Button } from "react-native-paper";
import { AppColors, AppStyles } from "../../theme";
import { Calendar } from "react-native-calendars";
import { TouchableOpacity, View } from "react-native";
import Icon from "react-native-paper/src/components/Icon";
import { Text } from "../text/text";
import moment from "moment";

export const DialogCalendar = ({
  visible,
  onDismiss,
  markedDate,
  onDayPress,
  onSelect,
}: {
  visible: boolean;
  onDismiss: any;
  markedDate: any;
  onDayPress: any;
  onSelect: any;
}) => {
  return (
    <Portal>
      <Dialog
        style={{
          borderRadius: 10,
          backgroundColor: AppColors.LIGHT_BLACK,
          width: "90%",
          alignSelf: "center",
        }}
        onDismiss={onDismiss}
        visible={visible}
        dismissable={true}
        theme={{
          colors: {
            backdrop: AppColors.TEXT_BOX_TRANS,
          },
        }}
      >
        {/*@ts-ignore*/}

        <TouchableOpacity
          onPress={onDismiss}
          style={{ alignSelf: "flex-end", marginRight: 15 }}
        >
          <Icon
            source={"close-circle-outline"}
            size={30}
            color={AppColors.WHITE}
          />
        </TouchableOpacity>
        <Dialog.Title
          style={{
            color: AppColors.WHITE,
            textAlign: "center",
            fontWeight: "600",
            fontSize: 20,
            marginTop: 0,
          }}
        >
          Select the date you want to reserve
        </Dialog.Title>
        <Dialog.Content>
          <Calendar
            dayComponent={(props) => {
              const isTodayDate =
                moment().format("YYYY-MM-DD") == props.date.dateString;
              const isSelectedDate =
                Object.keys(markedDate)[0] == props.date.dateString;

              return (
                <TouchableOpacity
                  style={{
                    backgroundColor: isSelectedDate
                      ? "rgba(253, 189, 89, 0.20)"
                      : AppColors.TRANSPARENT,
                    borderRadius: 5,
                    width: 25,
                    height: 25,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={() => props.onPress(props.date)}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      color: isSelectedDate
                        ? AppColors.PRIMARY
                        : isTodayDate
                        ? AppColors.PRIMARY
                        : AppColors.LIGHT_GRAY,
                      fontWeight: "600",
                    }}
                  >
                    {props.children}
                  </Text>
                </TouchableOpacity>
              );
            }}
            markedDates={markedDate}
            hideExtraDays
            theme={{
              backgroundColor: AppColors.LIGHT_BLACK,
              calendarBackground: AppColors.LIGHT_BLACK,
              textSectionTitleColor: "#E1D3BE",
              textSectionTitleDisabledColor: AppColors.DIVIDER_GRAY,
              selectedDayBackgroundColor: `rgba(253, 189, 89, 0.20)`,

              selectedDayTextColor: AppColors.PRIMARY,
              todayTextColor: AppColors.LOGO_COLOR,
              dayTextColor: AppColors.WHITE,

              arrowColor: AppColors.LOGO_COLOR,
              disabledArrowColor: AppColors.DIVIDER_GRAY,
              monthTextColor: AppColors.LOGO_COLOR,

              indicatorColor: AppColors.LOGO_COLOR,
              textDayFontFamily: "Roboto",
              textMonthFontFamily: "Roboto-Bold",
              textDayHeaderFontFamily: "Roboto",
              textDayFontSize: 18,
              textMonthFontSize: 18,
              textDayHeaderFontSize: 14,
              textDayStyle: {
                textTransform: "uppercase",
              },
            }}
            onDayPress={(day) => {
              onDayPress(day);
            }}
            renderHeader={(date) => {
              return (
                <View>
                  <Text
                    style={{
                      color: AppColors.PRIMARY,
                      textTransform: "uppercase",
                      fontWeight: "600",
                      fontSize: 15,
                    }}
                  >
                    {moment(new Date(date)).format("MMM YYYY")}
                  </Text>
                </View>
              );
            }}
          />
          <Button
            mode="contained"
            dark={true}
            buttonColor={AppColors.PRIMARY}
            onPress={onSelect}
            style={[AppStyles.button, { marginTop: 20, borderRadius: 10 }]}
            contentStyle={AppStyles.button_content}
            labelStyle={[AppStyles.button_label, { fontSize: 20 }]}
          >
            Continue
          </Button>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};
