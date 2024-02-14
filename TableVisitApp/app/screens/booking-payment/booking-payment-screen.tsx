import { observer } from 'mobx-react-lite';
import * as React from 'react';
import {
  Button,
  Dialog,
  Divider,
  IconButton,
  List,
  Paragraph,
  Portal,
  Snackbar,
} from 'react-native-paper';
import { AppColors, AppStyles, scale, verticalScale } from '../../theme';
import { DialogLoadingIndicator, Screen, ScreenBack, Text } from '../../components';
import { useEffect, useState } from 'react';
import { load, SELECTED_BOOKING } from '../../utils/storage';
import {
  FlatList,
  GestureResponderEvent,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import Moment from 'moment';
import { useStores } from '../../models';
import { currencyFormat } from '../../utils/app-helper';
import { useStripe } from '@stripe/stripe-react-native';
import { PaymentMethodEnum } from '../../utils/app-enums';
import { RootNavigation } from '../../navigators';
import { bookingPaymentApi } from './bookingPaymentApi';

export const BookingPaymentScreen = (props:any)=> {
  const [loading, setLoading] = useState<boolean>(false);
  const [booking, setBooking] = useState<any>({});
  const [tableSpends, setTableSpends] = useState<any>([]);
  const [showPaymentResponse, setShowPaymentResponse] =
    useState<boolean>(false);
  const [paymentResponse, setPaymentResponse] = useState('');
  const [paymentConfirmed, setPaymentConfirmed] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const hideDialog = () => setShowDialog(false);

  const { tableSpendStore, paymentStore } = useStores();
  const { table_spends, close_request } = tableSpendStore;
const[table,SetTable]=useState()
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const[total,setTotle]=useState()
  const { stripe } = paymentStore;
  useEffect(()=>{
    console.log("props",props?.route?.params?.table)
    setBooking(props?.route?.params?.booking)
    SetTable(props?.route?.params?.table)
    setTotle(props?.route?.params?.total)
  },[])

  // const fetchPaymentSheetParams = async (current: any) => {
  //   let amount = 0;

  //   if (current) {
  //     amount = parseFloat(current.amount_to_pay);
  //   }

  //   await paymentStore.getStripe(amount * 100);

  //   const { paymentIntent, ephemeralKey, customer } = stripe;

  //   return {
  //     paymentIntent,
  //     ephemeralKey,
  //     customer,
  //     amount,
  //   };
  // };

  // const initializePaymentSheet = async (current: any) => {
  //   setLoading(true);

  //   try {
  //     const { paymentIntent, ephemeralKey, customer, amount } =
  //       await fetchPaymentSheetParams(current);
  //     console.log('paymentIntent', paymentIntent, ephemeralKey);
  //     if (amount != 0) {
  //       const { error } = await initPaymentSheet({
  //         customerId: customer,
  //         customerEphemeralKeySecret: ephemeralKey,
  //         paymentIntentClientSecret: paymentIntent,
  //         style: 'alwaysDark',
  //         merchantDisplayName: 'Table Visit',
  //       });

  //       if (!error) {
  //       }
  //     }
  //   } catch (e) {
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  console.log("booking.id", booking.id)
  // const openPaymentSheet = async () => {
  //   const { error } = await presentPaymentSheet({
  //     confirmPayment: true,
  //   });

  //   if (error) {
  //     setPaymentResponse('Your payment has been cancelled.');
  //     setPaymentConfirmed(false);
  //     setShowPaymentResponse(true);
  //   } else {
  //     const payment = {
  //       booking_id: booking.id,
  //       amount: booking.amount_to_pay,
  //       payment_method: PaymentMethodEnum.CreditCard,
  //     };

  //     await paymentStore.add(payment);

  //     setPaymentConfirmed(true);
  //     setShowDialog(true);
  //   }
  // };

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       setLoading(true);

  //       const temp_booking = await load(SELECTED_BOOKING);

  //       if (temp_booking) {
  //         setBooking(temp_booking);
  //         await tableSpendStore.getTableSpends({ booking_id: temp_booking.id });
  //         await initializePaymentSheet(temp_booking);
  //       }

  //       if (table_spends) setTableSpends(table_spends);
  //     } catch (e) {
  //       console.warn(e);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   fetchData().then();
  // }, []);
const closeTable=()=>{
  console.log("bjbj",booking);
  
  const params={
    booking_id:booking.id,
    venue_id:booking?.venue_info_id,
    table_id:booking.venue_table_info_id
  }

  bookingPaymentApi.closeTable (params, (res: any) => {
    if (res) {
   
      RootNavigation.navigate('bottomNav')

}
     


      // setPlace(res) 
    // }
  setLoading(false);

},(error:any)=>{
 
  setLoading(false);


})


}
  const emptyComponent = () => {
    return (
      <List.Section>
        <Paragraph style={[AppStyles.empty_text, AppStyles.mh15]}>
          Sorry we didn't find any results..
        </Paragraph>
      </List.Section>
    );
  };
  return (
    <>
      <View style={{ flex: 1, backgroundColor: AppColors.BG }}>
        <SafeAreaView />
        <View style={styles.headerStyle}>
          <IconButton
            iconColor={AppColors.WHITE}
            size={30}
            icon="chevron-left"
            onPress={() => RootNavigation.goBack()}
          />
          <Text style={[AppStyles.title_center_small]}>Tab & Payments</Text>
        </View>
        <ScreenBack
          preset={'scroll'}
          unsafe={true}
          backgroundColor={AppColors.BG}
          style={{ flexGrow: 1 }}
        >
          <View style={{ padding: 20 }}>
            <Text style={{ marginBottom: 10 }}>Booking Information</Text>
            <DetailsViewItem
              leftText={'Date'}
              rightText={Moment(booking.book_date).format('DD MMM YYYY')}
            />
            <DetailsViewItem
              leftText={'Confirmation code'}
              rightText={booking.confirmation_code}
            />
            <DetailsViewItem
              leftText={'Status'}
              rightText={booking.paid ? 'Paid' : 'Outstanding'}
            />
            {
              console.log("datatata",table?.total_amount)
            }
            <DetailsViewItem
              leftText={'Booking Total'}
              rightText={
                table?.total_amount ? currencyFormat(table?.total_amount) : 0
              }
            />
            <Text style={{ marginBottom: 10 }}>Payment Details</Text>
            <View style={styles.paymentDetailsContainerStyle}>
              <DetailsViewItem
                leftText={'Table Cost'}
                rightText={
                  total
                    ? currencyFormat(total)
                    : 0
                }
              />

              <DetailsViewItem
                leftText={'Gratuity'}
                rightText={
                  booking.spent_gratuity
                    ? currencyFormat(booking.spent_gratuity)
                    : 0
                }
              />
              <View style={styles.dottedDividerStyle} />
              <DetailsViewItem
                leftText={
                  <Text style={{ fontWeight: '800' }}>Amount to pay</Text>
                }
                rightText={
                  total
                    ? currencyFormat(total)
                    : 0
                }
                rightTextStyle={{ fontSize: 16 }}
                containerStyle={{ paddingBottom: 0 }}
              />
            </View>
            <Text style={{ marginVertical: 10 }}>Table Requests</Text>
            <FlatList
              scrollEnabled={false}
              style={{ marginBottom: 25 }}
              showsVerticalScrollIndicator={false}
              data={booking.food_orders}
              keyExtractor={(item) => String(item.id)}
              ItemSeparatorComponent={() => {
                return <Divider style={AppStyles.items_divider} />;
              }}
              renderItem={({ item, index }) => {
                return (
                
                  <DetailsViewItem
                    leftText={item?.name}
                    rightText={`$ ${item.price}`}
                  />
                );
              }}
              ListEmptyComponent={emptyComponent}
            />
            <FlatList
              scrollEnabled={false}
              style={{ marginBottom: 25 }}
              showsVerticalScrollIndicator={false}
              data={booking.bottle_orders}
              keyExtractor={(item) => String(item.id)}
              ItemSeparatorComponent={() => {
                return <Divider style={AppStyles.items_divider} />;
              }}
              renderItem={({ item, index }) => {
                return (
                
                  <DetailsViewItem
                    leftText={item?.name}
                    rightText={`$ ${item.price}`}
                  />
                );
              }}
              ListEmptyComponent={emptyComponent}
            />
          </View>
          {close_request !== 1 &&
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
            }}
          >
            <SafeAreaView style={{ backgroundColor: AppColors.BG }}>
              <Button
                disabled={
                  !booking ||
                  booking.is_past ||
                  booking.paid ||
                  paymentConfirmed
                }
                mode="contained"
                dark={true}
                buttonColor={AppColors.PRIMARY}
                style={[
                  AppStyles.button,
                  {
                    width: '80%',
                    alignSelf: 'center',
                  },
                ]}
                contentStyle={AppStyles.button_content}
                labelStyle={AppStyles.button_label}
                // onPress={openPaymentSheet}
                onPress={() => setShowDialog(true)}
              >
                Close Table
              </Button>
            </SafeAreaView>
          </View>
}
          <Portal>
            <Dialog
              style={{ borderRadius: 5, backgroundColor: AppColors.BG }}
              visible={showDialog}
              dismissable={false}
            >
              {/*@ts-ignore*/}
              <Dialog.Title style={AppStyles.dialog_title}>
                Your Table will close
              </Dialog.Title>
              <Dialog.Content>
                <View style={AppStyles.row_wrap}>
                  <Paragraph style={[AppStyles.text_16_color]}>
                  Request for closing your table has been set to staff, thank you
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
                  onPress={async() => {
                    hideDialog();
                    RootNavigation.navigate('bottomNav');
                  }}
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
                  onPress={async() => {
                    closeTable()
                  //   await tableSpendStore.closeTable({ booking_id: booking.id });
                  //   hideDialog();
                  //  props.navigation.goBack()
                  }}
                >
                  Close
                </Button>
              </Dialog.Actions>
            </Dialog>

            <Snackbar
              wrapperStyle={AppStyles.snackbar_wrapper}
              style={AppStyles.snackbar_content}
              visible={showPaymentResponse}
              onDismiss={() => setShowPaymentResponse(false)}
              action={{
                label: 'OK',
                onPress: () => {
                  if (paymentConfirmed) RootNavigation.navigate('bottomNav');
                },
              }}
              duration={Snackbar.DURATION_MEDIUM}
            >
              <Text
                style={{ color: AppColors.BLACK, fontFamily: 'Roboto-Regular' }}
              >
                {paymentResponse}
              </Text>
            </Snackbar>
          </Portal>
        </ScreenBack>
      </View>
      <DialogLoadingIndicator visible={loading} />
    </>
  );
};
const DetailsViewItem = ({
  leftText,
  rightText,
  leftTextStyle,
  rightTextStyle,
  onPressRightText,
  containerStyle,
}: {
  leftText?: any | string;
  rightText?: any | string;
  leftTextStyle?: any;
  rightTextStyle?: any;
  onPressRightText?: (event: GestureResponderEvent) => void;
  containerStyle?: any;
}) => {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 15,
          paddingBottom: 10,
        },
        containerStyle,
      ]}
    >
      <Text style={[{ color: '#E1D3BE', fontSize: 13 }, leftTextStyle]}>
        {leftText}
      </Text>
      <Text
        style={[{ color: AppColors.PRIMARY, fontSize: 13 }, rightTextStyle]}
        onPress={onPressRightText}
      >
        {rightText}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  headerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentDetailsContainerStyle: {
    backgroundColor: '#282A2D',
    borderWidth: 1,
    borderColor: '#3A3A3F',
    padding: 15,
    marginVertical: 10,
  },
  dottedDividerStyle: {
    width: '100%',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: AppColors.DIVIDER_GRAY,
    marginBottom: 10,
  },
  paymentButtonStyle: {
    alignSelf: 'center',
    width: '80%',
    paddingVertical: 10,
    marginTop: 15,
    borderRadius: 10,
    backgroundColor: AppColors.PRIMARY,
    shadowColor: AppColors.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
