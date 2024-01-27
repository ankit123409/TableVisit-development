import { observer } from 'mobx-react-lite';
import * as React from 'react';
import {
  AppColors,
  AppStyles,
  moderateScale,
  scale,
  verticalScale,
} from '../../theme';
import { useEffect, useState } from 'react';
import {
  load,
  save,
  SELECTED_BOOKING,
  SELECTED_PLACE,
  SELECTED_TABLE,
} from '../../utils/storage';
import {
  DialogLoadingIndicator,
  PlaceDetailCard,
  ScreenBack,
} from '../../components';
import {
  Button,
  Dialog,
  Divider,
  Paragraph,
  Portal,
  Snackbar,
  Switch,
  TextInput,
} from 'react-native-paper';
import { OptionsHeader } from '../../components/place/options-header';
import { loadSelectedDate } from '../../utils/app-helper';
import { SafeAreaView, View, StyleSheet, Text } from 'react-native';
import { useStores } from '../../models';
import { PaymentMethodEnum, PolicyTypeEnum } from '../../utils/app-enums';
import Moment from 'moment';
import { useStripe } from '@stripe/stripe-react-native';
import { RootNavigation } from '../../navigators';

// https://stripe.com/docs/payments/accept-a-payment?platform=react-native&ui=payment-sheet
export const ConfirmScreen = observer(function ConfirmScreen() {
  const [loading, setLoading] = useState<boolean>(false);
  const [booking, setBooking] = useState<any>({});

  const [showDialog, setShowDialog] = useState<boolean>(false);
  const hideDialog = () => setShowDialog(false);

  const [showCloseTable, setShowCloseTable] = useState(false);
  const [date, setDate] = useState(null);
  const [place, setPlace] = useState<any>({});
  const [table, setTable] = useState<any>({});

  const [isSpecial, setIsSpecial] = useState(false);
  const onToggleSpecial = () => setIsSpecial(!isSpecial);

  const { policyStore, tableStore } = useStores();
  const { policy } = policyStore;
  const { rate } = tableStore;

  const [specialText, setSpecialText] = useState(null);

  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const { paymentStore, bookingStore } = useStores();
  const { stripe } = paymentStore;

  const [showPaymentResponse, setShowPaymentResponse] =
    useState<boolean>(false);
  const [paymentResponse, setPaymentResponse] = useState('');
  const [paymentConfirmed, setPaymentConfirmed] = useState<boolean>(false);

  // const fetchPaymentSheetParams = async () => {
  //   let amount = 0
  //   if (rate) {
  //     console.log("rate----->", table.minimum_spend)
  //     amount = parseFloat(table.minimum_spend / 2)
  //   }

  //   await paymentStore.getStripe(amount * 100)

  //   const { paymentIntent, ephemeralKey, customer } = stripe

  //   return {
  //     paymentIntent,
  //     ephemeralKey,
  //     customer,
  //     amount,
  //   }
  // }
  const fetchPaymentSheetParams = async () => {
    let amount = 0;
    let tax = 0;
    let total = 0;
    if (rate) {
      console.log('rate----->', rate);
      amount = parseFloat(rate.total_rate);
      tax = parseFloat(Number(rate.tax));
      console.log('tax----->', amount);
      total = amount;
      // amount = parseFloat(rate.total_rate)
    }
    console.log('total', total, rate);
    await paymentStore.getStripe(total * 100);

    const { paymentIntent, ephemeralKey, customer } = stripe;

    return {
      paymentIntent,
      ephemeralKey,
      customer,
      amount,
    };
  };

  const initializePaymentSheet = async () => {
    setLoading(true);
    try {
      const { paymentIntent, ephemeralKey, customer, amount } =
        await fetchPaymentSheetParams();
      console.log('customer...', customer);
      if (amount != 0) {
        const { error } = await initPaymentSheet({
          customerId: customer,
          customerEphemeralKeySecret: ephemeralKey,
          paymentIntentClientSecret: paymentIntent,
          style: 'alwaysDark',
          merchantDisplayName: 'Table Visit',
        });

        if (!error) {
        }
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  const openPaymentSheet = async () => {
    const final_rate = rate.total_rate;
    console.log('hello', final_rate);

    const { error } = await presentPaymentSheet({
      clientSecret:
        'sk_test_51JUvAKHc45h8j8XYdV1z8M8Tc3cA0uCQB5NvUmXF0uJ67I5yKYK9sWsYPO2WQxUioSXdf4CGkYnZ0OeSbUmQzHfO00GeLw8js1',
      confirmPayment: true,
    });

    console.log('payment error : -=-=-> ', error);

    if (error) {
      // setPaymentResponse("Your payment has been cancelled.")
      setPaymentResponse(`Error: ${error.code} ${error.message}`);
      setPaymentConfirmed(false);
      setShowPaymentResponse(true);
    } else {
      let book_date = await loadSelectedDate();

      const book = {
        rate: rate.rate,
        tax: rate.tax,
        total_rate: final_rate,
        // gratuity: rate.gratuity,
        date: Moment(book_date).format('YYYY-MM-DD HH:mm:ss'),
        place_id: place.id,
        table_id: table.id,
        table_rate_id: rate.id,
        special_comment: isSpecial ? specialText : null,
      };
      // __DEV__ && console.log(book)

      const response = await bookingStore.book(book);
      console.log('book', response);
      if (response) {
        const payment = {
          booking_id: response.id,
          amount: response.total_amount,
          payment_method: PaymentMethodEnum.CreditCard,
        };

        await paymentStore.add(payment);

        await save(SELECTED_BOOKING, response);

        setBooking(response);

        setPaymentConfirmed(true);
        setShowDialog(true);
      } else {
        setPaymentResponse('An error occurred. Please try again later.');
        setPaymentConfirmed(false);
        setShowPaymentResponse(true);
      }
    }
  };

  useEffect(() => {
    let date;

    const fetchData = async () => {
      setLoading(true);

      try {
        date = await loadSelectedDate();

        if (date) date = Moment(date).format('MM-DD-YYYY');

        let temp_place = await load(SELECTED_PLACE);

        if (temp_place) {
          setPlace(temp_place);
          await policyStore.getPolicy(
            temp_place.id,
            PolicyTypeEnum.Cancellation
          );
        }

        let temp_table = await load(SELECTED_TABLE);
        if ('id' in temp_table) {
          setTable(temp_table);
          console.log('Called..', temp_table.id, date);
          await tableStore.getRate(temp_table.id, date);
          initializePaymentSheet().then();
        }
      } catch (e) {
        console.warn(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData().then(async () => {
      if (date) setDate(date);
    });
  }, []);

  useEffect(() => {
    if ('id' in table) {
      console.log('tabel : ', table);
      initializePaymentSheet().then();
    }
  }, [table, rate]);

  return (
    <>
      <ScreenBack preset={'scroll'} unsafe={true} backgroundColor={AppColors.BG}>
        <View
          style={{
            marginTop: verticalScale(30),
          }}
        >
          <PlaceDetailCard date={date} place={place} />
        </View>

        <View
          style={{
            marginTop: verticalScale(15),
            marginHorizontal: scale(15),
          }}
        >
          <OptionsHeader />
        </View>
        <View
          style={{
            marginHorizontal: scale(16),
          }}
        >
          <Paragraph style={styles.table_detail_main}>
            Table Information
          </Paragraph>
          <Paragraph style={styles.table_detail_title}>{table.name}</Paragraph>
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Paragraph style={styles.table_detail_title}>Guests</Paragraph>
              <Paragraph style={styles.table_detail_row}>
                {table.guests_count}
              </Paragraph>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Paragraph style={styles.table_detail_title}>
                Table Minimum
              </Paragraph>
              <Paragraph style={styles.table_detail_row}>
                $ {table.minimum_spend}
              </Paragraph>
            </View>
          </View>
        </View>
        <Divider style={styles.horizontal_line_style} />
        <View style={[AppStyles.row_wrap, { marginHorizontal: scale(16) }]}>
          <View style={[AppStyles.content_start, { flex: 2 }]}>
            <Paragraph style={styles.reservation_text_style}>
              Is this a special reservation?
            </Paragraph>
          </View>
          <View style={[AppStyles.content_end, { flex: 1 }]}>
            <Switch
              color={AppColors.LOGO_COLOR}
              value={isSpecial}
              onValueChange={onToggleSpecial}
            />
          </View>
        </View>
        <Divider style={styles.horizontal_line_style} />
        {isSpecial ? (
          <View
            style={[
              AppStyles.row_wrap,
              { marginHorizontal: 10, marginBottom: 10 },
            ]}
          >
            <TextInput
              style={AppStyles.input_special}
              underlineColor={AppColors.DIVIDER_GRAY}
              textAlign={'left'}
              autoCapitalize={'none'}
              mode="flat"
              multiline={true}
              placeholder={'Let us know what you are celebrating...'}
              label={null}
              value={specialText}
              onChangeText={setSpecialText}
            />
          </View>
        ) : null}
        <Paragraph
          style={[styles.table_detail_main, { marginHorizontal: scale(16) }]}
        >
          Payment Details
        </Paragraph>
        <View
          style={{
            backgroundColor: '#282A2D',
            marginHorizontal: scale(16),
            paddingVertical: verticalScale(4),
            paddingHorizontal: scale(14),
          }}
        >
          <View
            style={[AppStyles.row_wrap, { marginVertical: verticalScale(5) }]}
          >
            <View style={AppStyles.content_start}>
              <Paragraph style={AppStyles.table_detail_row_medium}>
                Deposit
              </Paragraph>
            </View>
            <View style={AppStyles.content_end}>
              <Paragraph
                style={[
                  AppStyles.table_detail_row_medium,
                  { color: AppColors.LOGO_COLOR },
                ]}
              >
                $ {rate.rate ? rate.rate : 0}
              </Paragraph>
            </View>
          </View>
          <View
            style={[AppStyles.row_wrap, { marginVertical: verticalScale(5) }]}
          >
            <View style={AppStyles.content_start}>
              <Paragraph style={AppStyles.table_detail_row_medium}>
                Taxes & fees
              </Paragraph>
            </View>
            <View style={AppStyles.content_end}>
              <Paragraph
                style={[
                  AppStyles.table_detail_row_medium,
                  { color: AppColors.LOGO_COLOR },
                ]}
              >
                $ {rate.tax ? rate.tax : 0}
              </Paragraph>
            </View>
          </View>
          {/* <View style={[AppStyles.row_wrap, { marginVertical: verticalScale(5) }]}>
          <View style={AppStyles.content_start}>
            <Paragraph style={AppStyles.table_detail_row_medium}>Gratuity</Paragraph>
          </View>
          <View style={AppStyles.content_end}>
            <Paragraph style={AppStyles.table_detail_row_medium}>
              $ {rate.gratuity ? rate.gratuity : 0}
            </Paragraph>
          </View>
        </View> */}
          <View style={[styles.dottedDividerStyle]} />
          <View
            style={[AppStyles.row_wrap, { marginVertical: verticalScale(5) }]}
          >
            <View style={AppStyles.content_start}>
              <Paragraph style={AppStyles.table_detail_row_total}>
                Total
              </Paragraph>
            </View>
            <View style={AppStyles.content_end}>
              <Paragraph
                style={[
                  AppStyles.table_detail_row_total,
                  { color: AppColors.LOGO_COLOR },
                ]}
              >
                $ {rate.total_rate ? rate.total_rate : 0}
              </Paragraph>
            </View>
          </View>
        </View>

        <Paragraph
          style={[
            styles.table_detail_main,
            { marginTop: verticalScale(15), marginHorizontal: scale(16) },
          ]}
        >
          Cancellation policy
        </Paragraph>
        <Paragraph
          style={{
            fontFamily: 'Roboto-Regular',
            fontSize: moderateScale(11),
            color: '#CFCFCF',
            marginHorizontal: scale(16),
          }}
        >
          You have up to 72 hours before the reserved date to cancel your VIP
          Section and move it to another day. We do not Refund Deposits.
        </Paragraph>
        <View
          style={[
            AppStyles.row_wrap,
            { marginHorizontal: 10, marginBottom: 15 },
          ]}
        >
          <Paragraph style={AppStyles.table_detail_policy}>
            {policy.detail}
          </Paragraph>
        </View>

        {/* <List.Section>
          <Button
            mode="contained"
            dark={true}
            buttonColor={AppColors.LOGO_COLOR}
            onPress={() => {
              Alert.alert(
                'Alert',
                'You are only being charged a deposit. Your balance will be due at the venue when you check in for your reservation.',
                [{ text: 'OK', onPress: () => openPaymentSheet() }]
              );
            }}
            style={[
              AppStyles.button,
              {
                marginHorizontal: scale(47),
                borderRadius: scale(10),
              },
            ]}
            contentStyle={AppStyles.button_content}
            labelStyle={{
              fontSize: moderateScale(18),
              fontFamily: 'Roboto-bold',
            }}
          >
            CONFIRM & PAY
          </Button>
        </List.Section> */}
      </ScreenBack>
      <SafeAreaView style={{ backgroundColor: AppColors.BG }}>
        <Button
          mode="contained"
          dark={true}
          buttonColor={AppColors.LOGO_COLOR}
          onPress={() => {
            // Alert.alert(
            //   'Alert',
            //   'You are only being charged a deposit. Your balance will be due at the venue when you check in for your reservation.',
            //   [{ text: 'OK', onPress: () => setShowCloseTable(true) }]
            // );
            setShowCloseTable(true);
          }}
          style={[
            AppStyles.button,
            {
              marginHorizontal: scale(47),
              borderRadius: scale(10),
            },
          ]}
          contentStyle={AppStyles.button_content}
          labelStyle={{
            fontSize: moderateScale(18),
            fontFamily: 'Roboto-bold',
          }}
        >
          CONFIRM & PAY
        </Button>
      </SafeAreaView>
      <Portal>
        <Dialog
          style={{ borderRadius: 5, backgroundColor: AppColors.BG }}
          visible={showDialog}
          onDismiss={hideDialog}
        >
          {/*@ts-ignore*/}
          <Dialog.Title style={AppStyles.dialog_title}>
            Your reservation is confirmed!
            <View style={AppStyles.row_wrap}>
              <Paragraph style={[AppStyles.text_16]}>
                # {booking.confirmation_code}
              </Paragraph>
            </View>
          </Dialog.Title>
          <Dialog.Content>
            <View style={AppStyles.row_wrap}>
              <Paragraph style={[AppStyles.text_16_color]}>
                Do you want to add bottle requests to the booking? This is only
                a request and you will be charged by the venue directly upon
                arrival.
              </Paragraph>
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              style={[AppStyles.button, { borderRadius: 5 }]}
              contentStyle={AppStyles.button_content}
              labelStyle={AppStyles.button_label}
              onPress={() => {
                hideDialog();
                RootNavigation.navigate('bottomNav');
              }}
            >
              No
            </Button>
            <Button
              style={[AppStyles.button, { borderRadius: 5 }]}
              contentStyle={AppStyles.button_content}
              labelStyle={AppStyles.button_label}
              onPress={async () => {
                hideDialog();
                RootNavigation.navigate('book_bottles');
              }}
            >
              Yes
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
      <Portal>
        <Dialog
          style={{ borderRadius: 5, backgroundColor: AppColors.BG }}
          visible={showCloseTable}
          onDismiss={() => setShowCloseTable(false)}
        >
          {/*@ts-ignore*/}
          <Dialog.Content>
            <View style={AppStyles.row_wrap}>
              <Paragraph style={[AppStyles.text_16_color]}>
              Your reservation will be confirmed once your deposit is paid. The balance of your reservation will be due at the venue.
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
              onPress={() => {
                setShowCloseTable(false);
              }}
            >
              No
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
              onPress={async () => {
                openPaymentSheet();
                setShowCloseTable(false);
              }}
            >
              Yes
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
      <DialogLoadingIndicator visible={loading} />
    </>
  );
});

const styles = StyleSheet.create({
  table_detail_main: {
    fontFamily: 'Roboto-Bold',
    fontSize: moderateScale(15),
    color: '#CFCFCF',
    marginVertical: verticalScale(5),
  },
  table_detail_title: {
    fontFamily: 'Roboto-Regular',
    fontSize: moderateScale(13),
    color: '#E1D3BE',
    marginVertical: verticalScale(5),
    marginHorizontal: scale(10),
  },
  table_detail_row: {
    fontFamily: 'Roboto-Regular',
    fontSize: moderateScale(13),
    color: AppColors.LOGO_COLOR,
    marginVertical: verticalScale(5),
    marginHorizontal: scale(10),
  },
  reservation_text_style: {
    fontFamily: 'Roboto-Regular',
    fontSize: moderateScale(15),
    color: '#CFCFCF',
    marginVertical: verticalScale(5),
    marginHorizontal: scale(10),
  },
  horizontal_line_style: {
    marginVertical: verticalScale(12),
    backgroundColor: AppColors.DIVIDER_GRAY,
    height: verticalScale(1),
    marginHorizontal: scale(16),
  },
  dottedDividerStyle: {
    width: '100%',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: AppColors.DIVIDER_GRAY,
    marginVertical: verticalScale(5),
  },
});
