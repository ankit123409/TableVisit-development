import * as React from 'react';
import {Portal, Dialog, Button} from 'react-native-paper';
import {AppColors, AppStyles} from '../../theme';
import {Calendar} from 'react-native-calendars';

export const DialogDatepicker = ({
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
}) => (
  <Portal>
    <Dialog
      style={{borderRadius: 0, backgroundColor: AppColors.BG}}
      onDismiss={onDismiss}
      visible={visible}
      dismissable={true}>
      <Dialog.Content>
        <Calendar
          markedDates={markedDate}
          theme={{
            backgroundColor: AppColors.BG,
            calendarBackground: AppColors.BG,
            textSectionTitleColor: AppColors.LOGO_COLOR,
            textSectionTitleDisabledColor: AppColors.DIVIDER_GRAY,
            selectedDayBackgroundColor: AppColors.LOGO_COLOR,
            selectedDayTextColor: AppColors.BG,
            todayTextColor: AppColors.LOGO_COLOR,
            dayTextColor: AppColors.WHITE,
            arrowColor: AppColors.LOGO_COLOR,
            disabledArrowColor: AppColors.DIVIDER_GRAY,
            monthTextColor: AppColors.LOGO_COLOR,
            indicatorColor: AppColors.LOGO_COLOR,
            textDayFontFamily: 'Roboto',
            textMonthFontFamily: 'Roboto-Bold',
            textDayHeaderFontFamily: 'Roboto',
            textDayFontSize: 18,
            textMonthFontSize: 18,
            textDayHeaderFontSize: 14,
          }}
          onDayPress={day => {
            onDayPress(day);
          }}
          enableSwipeMonths={true}
        />
        <Button
          mode="contained"
          dark={true}
          buttonColor={AppColors.LOGO_COLOR}
          onPress={onSelect}
          style={[AppStyles.button, {marginTop: 20}]}
          contentStyle={AppStyles.button_content}
          labelStyle={AppStyles.button_label}>
          SELECT
        </Button>
      </Dialog.Content>
    </Dialog>
  </Portal>
);
