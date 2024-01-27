import * as React from 'react';
import {
  Avatar,
  Button,
  Dialog,
  Paragraph,
  Portal,
  Snackbar,
} from 'react-native-paper';
import { Text, TouchableOpacity, View } from 'react-native';
import { AppColors, AppStyles } from '../../theme';
import {
  load,
  save,
  SELECTED_BOOKING,
  SELECTED_CHAT_DATA,
  USER_DATA,
} from '../../utils/storage';
import Moment from 'moment';
import { RootNavigation } from '../../navigators';
import { UserTypeEnum } from '../../utils/app-enums';
import { useState } from 'react';
import { useStores } from '../../models';

export const StaffBookingItemCard = ({
  booking,
  assigned,
}: {
  booking: any;
  assigned: boolean;
}) => {
  // console.log("Booking",booking)
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const hideDialog = () => setShowDialog(false);
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  const [message, setMessage] = useState(null);

  const { staffBookingStore } = useStores();

  const goToAction = async () => {
    const user = await load(USER_DATA);

    if (user) {
      if (assigned) {
        await goToChat();
      } else setShowDialog(true);
    }
  };

  const accept = async () => {
    try {
      const result = await staffBookingStore.assignBooking({
        booking_id: booking.id,
      });

      setShowDialog(false);

      if (result.code !== 100) {
        await goToChat();
      } else {
        setMessage(result.message);
        setShowSnackbar(true);
      }
    } catch (e) {
      console.warn(e);
    } finally {
    }
  };

  const goToChat = async () => {
    const user = await load(USER_DATA);
    console.log('booking', user);
    if (user) {
      await save(SELECTED_CHAT_DATA, {
        code: booking.confirmation_code + '_' + user.user_type_id,
        name:
          booking.confirmation_code +
          '_' +
          UserTypeEnum[user.user_type_id].replace('_', ' '),
        type: user.user_type_id,
        booking_id: booking.id,
        title: booking.customer_name + ' ' + booking.customer_last_name,
        to_user: booking.customerId,
        table_id: booking.table_id,
      });

      RootNavigation.navigate('chat', {
        name: user?.name,
      });
    }
  };

  return (
    <>
      <TouchableOpacity
        onLongPress={async () => {
          await save(SELECTED_BOOKING, booking);
          RootNavigation.navigate('staff_table_spends');
        }}
        onPress={async () => {
          await goToAction();
        }}
      >
        <View style={AppStyles.venue_list_container}>
          <Avatar.Image
            size={55}
            style={AppStyles.booking_customer_pic}
            source={{ uri: booking.customer_avatar }}
          />
          <View style={AppStyles.column_wrap}>
            <View style={AppStyles.row_wrap}>
              <View style={AppStyles.content_start}>
                <Paragraph
                  numberOfLines={1}
                  style={[AppStyles.staff_booking_title]}
                >
                  {booking.customer_name} {booking.customer_last_name}
                </Paragraph>
              </View>
              <View style={AppStyles.content_end}>
                <Paragraph
                  numberOfLines={1}
                  style={AppStyles.staff_booking_date}
                >
                  {Moment(booking.book_date).format('MM-DD-YYYY')}
                </Paragraph>
              </View>
            </View>
            <View style={AppStyles.row_wrap}>
              <View style={AppStyles.content_start}>
                <Paragraph numberOfLines={1} style={AppStyles.booking_code}>
                  # {booking.confirmation_code}
                </Paragraph>
              </View>
              <View style={AppStyles.content_end}>
                <Paragraph numberOfLines={1} style={AppStyles.staff_table}>
                  Table: {booking.table ? booking.table.table_number : null}
                </Paragraph>

                {/*<Paragraph numberOfLines={1}
                                       style={AppStyles.venue_list_type}>{booking.guests_count} guest(s)</Paragraph>*/}
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      <Portal>
        <Dialog
          style={{ borderRadius: 5, backgroundColor: AppColors.BG }}
          visible={showDialog}
          onDismiss={hideDialog}
        >
          {/*@ts-ignore*/}
          <Dialog.Title style={AppStyles.dialog_title}>
            ACCEPT TABLE
          </Dialog.Title>
          <Dialog.Content>
            <View style={AppStyles.row_wrap}>
              <View style={[AppStyles.content_start_35]}>
                <Paragraph style={[AppStyles.text_16]}>Customer</Paragraph>
              </View>
              <View style={[AppStyles.content_end_left]}>
                <Paragraph style={[AppStyles.text_16_color]}>
                  {booking.customer_name} {booking.customer_last_name}
                </Paragraph>
              </View>
            </View>
            <View style={[AppStyles.row_wrap, { marginTop: 10 }]}>
              <View style={[AppStyles.content_start_35]}>
                <Paragraph style={[AppStyles.text_16]}>Code</Paragraph>
              </View>
              <View style={[AppStyles.content_end_left]}>
                <Paragraph style={[AppStyles.text_16_color]}>
                  {booking.confirmation_code}
                </Paragraph>
              </View>
            </View>
            <View style={[AppStyles.row_wrap, { marginTop: 10 }]}>
              <View style={[AppStyles.content_start_35]}>
                <Paragraph style={[AppStyles.text_16]}>Table</Paragraph>
              </View>
              <View style={[AppStyles.content_end_left]}>
                <Paragraph style={[AppStyles.text_16_color]}>
                  {booking.table ? booking.table.table_number : null}
                </Paragraph>
              </View>
            </View>
            <View style={[AppStyles.row_wrap, { marginTop: 10 }]}>
              <View style={[AppStyles.content_start_35]}>
                <Paragraph style={[AppStyles.text_16]}>Guest(s)</Paragraph>
              </View>
              <View style={[AppStyles.content_end_left]}>
                <Paragraph style={[AppStyles.text_16_color]}>
                  {booking.guests_count}
                </Paragraph>
              </View>
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              style={[AppStyles.button, { borderRadius: 5 }]}
              contentStyle={AppStyles.button_content}
              labelStyle={AppStyles.button_label}
              onPress={hideDialog}
            >
              Cancel
            </Button>
            <Button
              style={[AppStyles.button, { borderRadius: 5 }]}
              contentStyle={AppStyles.button_content}
              labelStyle={AppStyles.button_label}
              onPress={async () => await accept()}
            >
              Yes
            </Button>
          </Dialog.Actions>
        </Dialog>
        <Snackbar
          wrapperStyle={AppStyles.snackbar_wrapper}
          style={AppStyles.snackbar_content}
          visible={showSnackbar}
          onDismiss={() => setShowSnackbar(false)}
          action={{
            label: 'OK',
            onPress: () => {
              setShowSnackbar(false);
            },
          }}
          duration={Snackbar.DURATION_MEDIUM}
        >
          <Text
            style={{ color: AppColors.BLACK, fontFamily: 'Roboto-Regular' }}
          >
            {message}
          </Text>
        </Snackbar>
      </Portal>
    </>
  );
};
