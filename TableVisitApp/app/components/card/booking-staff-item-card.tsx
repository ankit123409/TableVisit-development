import React, { useState } from 'react';
import {
  Button,
  Dialog,
  Paragraph,
  Portal,
  Snackbar,
} from 'react-native-paper';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  AppColors,
  AppStyles,
  moderateScale,
  scale,
  verticalScale,
} from '../../theme';
import { RootNavigation } from '../../navigators';
import { load, USER_DATA } from '../../utils/storage';
import Moment from 'moment';
import { useStores } from '../../models';
import { BookingStaffApi } from '../../screens/booking-staff/BookingStaffApi';

const BookingStaffItemCard = ({
  booking,
  index,
  assigned,
  props,
}: {
  booking: any;
  index: number;
  assigned: boolean;
  props: any;
}) => {
  console.log("bookingssss",booking)
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const hideDialog = () => setShowDialog(false);
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  const [message, setMessage] = useState(null);

  const { staffBookingStore } = useStores();

  const goToAction = async () => {
    const user = await load(USER_DATA);

    // if (user) {
      if (assigned) {
        RootNavigation.navigate('booking_staff_details', {
          data: booking,
        });
      } else setShowDialog(true);
    // }
  };

  const accept = async () => {
    // console.log("helooo")
const params={
  _path:booking.id
}
    BookingStaffApi.AcceptRequest (params, (res: any) => {
      if (res) {
        console.log("rseseses",res)
     
  
  }
       
  
  
      
    // setLoading(false);
  
  },(error:any)=>{
   
    // setLoading(false);
  
  
  })

    return
    try {
      const result = await staffBookingStore.assignBooking({
        booking_id: booking.id,
      });
      setShowDialog(false);
      if (result.code !== 100) {
        RootNavigation.navigate('booking_staff_details', {
          data: booking,
        });
      } else {
        setMessage(result.message);
        setShowSnackbar(true);
      }
    } catch (e) {
      console.warn(e);
    } finally {
    }
  };

  return (
    <>
      <TouchableOpacity
        onPress={async () => {
          await goToAction();
        }}
      >
        <View style={styles.venue_container}>
          <View style={styles.venue_list_container}>
            <Image
              style={styles.venue_list_pic}
              source={{
                uri: booking?.customer_avatar || 'https://fastly.picsum.photos/id/1/200/300.jpg?hmac=jH5bDkLr6Tgy3oAg5khKCHeunZMHq0ehBZr6vGifPLY',
              }}
            />
            <View style={styles.column_wrap}>
              <View>
                <Paragraph numberOfLines={1} style={AppStyles.venue_card_name}>
                  {booking.customer_name || "patel"}
                </Paragraph>
                <Paragraph numberOfLines={1} style={AppStyles.venue_list_type}>
                  {booking?.booking_confirmation_code}
                </Paragraph>
              </View>
              <View>
                <Paragraph
                  numberOfLines={1}
                  style={[AppStyles.booking_date, styles.booking_date]}
                >
                  {Moment(booking.book_date).format('DD MMM YYYY')}
                </Paragraph>

                <Paragraph
                  numberOfLines={1}
                  style={(AppStyles.booking_amount, styles.booking_amount)}
                >
                  Table: {booking?.venue_table_info_id ? booking?.venue_table_info_id : null}
                </Paragraph>
              </View>
            </View>
          </View>
          {booking.closed_at && (
            <View
              style={{
                backgroundColor: AppColors.RED,
                paddingVertical: scale(5),
                paddingHorizontal: scale(10),
                borderRadius: scale(5),
              }}
            >
              <Text
                style={{
                  color: AppColors.WHITE,
                  fontSize: moderateScale(14),
                  fontFamily: 'Roboto-Bold',
                }}
              >
                {'Closed'}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
      <Portal>
        <Dialog
          style={{
            borderRadius: scale(10),
            backgroundColor: AppColors.LIGHTGRAY,
          }}
          visible={showDialog}
          onDismiss={hideDialog}
        >
          <Dialog.Title style={styles.dialog_title}>ACCEPT TABLE</Dialog.Title>
          <Dialog.Content
            style={{ flexDirection: 'column', gap: verticalScale(10) }}
          >
            <View style={styles.drink_item_style}>
              <Paragraph style={styles.order_name_style}>
                {'Customer'}
              </Paragraph>
              <Paragraph style={styles.order_price_style}>
                {booking.customer_name}
              </Paragraph>
            </View>
            <View style={styles.drink_item_style}>
              <Paragraph style={styles.order_name_style}>{'Code'}</Paragraph>
              <Paragraph style={styles.order_price_style}>
                {booking.confirmation_code}
              </Paragraph>
            </View>
            <View style={styles.drink_item_style}>
              <Paragraph style={styles.order_name_style}>{'Table'}</Paragraph>
              <Paragraph style={styles.order_price_style}>
                {booking.table ? booking.table.table_number : null}
              </Paragraph>
            </View>
            <View style={styles.drink_item_style}>
              <Paragraph style={styles.order_name_style}>{'Guests'}</Paragraph>
              <Paragraph style={styles.order_price_style}>
                {booking.guests_count}
              </Paragraph>
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              style={[
                AppStyles.button,
                {
                  borderRadius: scale(5),
                  backgroundColor: '#16181B',
                  margin: 0,
                },
              ]}
              contentStyle={{
                paddingVertical: verticalScale(0),
                width: scale(70),
              }}
              labelStyle={AppStyles.button_label}
              onPress={hideDialog}
            >
              Cancel
            </Button>
            <Button
              style={[
                AppStyles.button,
                {
                  borderRadius: 5,
                  backgroundColor: AppColors.LOGO_COLOR,
                  margin: 0,
                },
              ]}
              contentStyle={{
                paddingVertical: verticalScale(0),
                width: scale(70),
              }}
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

export default BookingStaffItemCard;

const styles = StyleSheet.create({
  venue_list_container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  venue_container: {
    marginLeft: scale(12),
    marginRight: scale(12),
    marginBottom: verticalScale(12),
    backgroundColor: '#282A2D',
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(5),
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: verticalScale(5),
  },
  column_wrap: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  venue_list_pic: {
    borderRadius: 5,
    resizeMode: 'cover',
    width: moderateScale(35),
    height: moderateScale(35),
    marginRight: scale(12),
  },
  booking_date: {
    color: '#919499',
    fontSize: moderateScale(10),
  },
  booking_amount: {
    color: AppColors.LIGHR_WHITE,
    fontSize: moderateScale(12),
    textAlign: 'right',
  },
  dialog_title: {
    fontSize: moderateScale(17),
    color: AppColors.WHITE,
    fontFamily: 'Roboto-Bold',
    textAlign: 'center',
  },

  drink_item_style: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  order_price_style: {
    color: AppColors.LOGO_COLOR,
    fontSize: moderateScale(14),
    textAlign: 'right',
    fontFamily: 'Roboto-Bold',
  },
  order_name_style: {
    color: AppColors.WHITE,
    fontSize: moderateScale(14),
    fontFamily: 'Roboto-Regular',
    width: scale(80),
  },
});
