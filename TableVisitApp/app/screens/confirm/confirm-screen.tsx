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
  Avatar,
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
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useStores } from '../../models';
import { PaymentMethodEnum, PolicyTypeEnum } from '../../utils/app-enums';
import Moment from 'moment';
import { useStripe } from '@stripe/stripe-react-native';
import { RootNavigation } from '../../navigators';
import { confirmApi } from './confirmApi';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Removealldata } from '../../utils/Redux/Action';

// https://stripe.com/docs/payments/accept-a-payment?platform=react-native&ui=payment-sheet
export const ConfirmScreen = observer(function ConfirmScreen(props:any) {
  const [loading, setLoading] = useState<boolean>(false);
  const [booking, setBooking] = useState<any>({});
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const hideDialog = () => setShowDialog(false);

  const [showCloseTable, setShowCloseTable] = useState(false);
  const [date, setDate] = useState(null);
  const [place, setPlace] = useState<any>({});
  const [table, setTable] = useState(props?.route?.params?.item);
const[bookingData,SetBookingData]=useState()
  const [isSpecial, setIsSpecial] = useState(false);
  const onToggleSpecial = () => setIsSpecial(!isSpecial);

  const { policyStore, tableStore } = useStores();
  const { policy } = policyStore;
  const { rate } = tableStore;

  const [specialText, setSpecialText] = useState(null);

  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const { paymentStore, bookingStore } = useStores();
  const { stripe } = paymentStore;
// const {stripe}=useElem
  const [showPaymentResponse, setShowPaymentResponse] =
    useState<boolean>(false);
  const [paymentResponse, setPaymentResponse] = useState('');
  const [paymentConfirmed, setPaymentConfirmed] = useState<boolean>(false);
  const selector = useSelector((elem)=>elem)
  const [foodtotal,setFoodTotal]=useState(selector?.food?.reduce((accumulator, elm) => accumulator + elm.price, 0))
  const dispatch = useDispatch()

let data =selector

useEffect(()=>{
  getTableDetail(props?.route?.params?.item)
},[])
const getTableDetail=(data)=>{
  setTable(props?.route?.params?.item)
  setDate(props?.route?.params?.date)

  setLoading(true);
  confirmApi.getTableDetiles({_path:`${data.venue_info_id}/${data.id}`}, (res: any) => {
    if (res) {
      setPlace(res) 
    }
  setLoading(false);

},(error:any)=>{
 
  setLoading(false);


})
}
  const openPaymentSheet=()=>{
   
    setLoading(true);
    const params={
      table_id:table?.id,
      venue_id:table?.venue_info_id,
      booking_date:moment(date).format("MM/DD/YYYY")  ,   // MM/DD/YYYY
      food_orders:selector?.food?.map((elm) => elm.id),
      bottle_orders:selector?.data.map((elm) => elm.id),
      is_special_reservations:isSpecial,
      special_reservation_description:   isSpecial ?  specialText:""
    }

    confirmApi.getClilentSecret(params,(res: any) => {
      if (res) {
        console.log("res",res)
    setLoading(false);
    SetBookingData(res)
    // setLoading(false);
        finalpaymentCall(res)

      }

  },(error:any)=>{
   
    setLoading(false);
  })
  }

  

 const finalpaymentCall=async (res:any)=>{
if(res?.clientSecret){
  const init = await initPaymentSheet({
    merchantDisplayName: 'Table Visit',
    paymentIntentClientSecret:res?.clientSecret
    
  })
  await presentPaymentSheet()
bookingConfirm(res)

}
 }
 const bookingConfirm=(res:any)=>{
  const params={
    booking_id:res?.booking_id,
    paymentIntentId:res?.paymentIntentId,
    food_orders:selector?.food?.map((elm) => elm.id),
    bottle_orders:selector?.data.map((elm) => elm.id),

  }

  setLoading(true);
  confirmApi.AddBooking(params, (res: any) => {
    if (res) {
      dispatch(Removealldata)
      setShowDialog(true)
      console.log("res",res)
      // setPlace(res) 
    }
  setLoading(false);

},(error:any)=>{
  setHasError(true);
  setErrorMessage(error?.message)
  setLoading(false);


})
  

 }
  

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
<View style={styles.optionsHorizontalListViewStyle}>
      <TouchableOpacity
        onPress={() => {
          RootNavigation.navigate('book_bottles',{
            item:table?.venue_info_id

          });
        }}
        style={AppStyles.image_container}
      >
        <Avatar.Icon
          style={AppStyles.venue_detail_link}
          color={AppColors.STAR}
          size={48}
          icon="bottle-wine-outline"
        />
        <Paragraph
          style={[
            AppStyles.title_center_small,
            { fontSize: moderateScale(10) },
          ]}
        >
          Bottle Menu
        </Paragraph>
      </TouchableOpacity>
      <View style={styles.optionsHorizontalItemSeparatorStyle} />
      <TouchableOpacity
        onPress={() => {
          RootNavigation.navigate('food_menu',{
            item:table?.venue_info_id
          });
        }}
        style={AppStyles.image_container}
      >
        <Avatar.Icon
          style={AppStyles.venue_detail_link}
          color={AppColors.STAR}
          size={48}
          icon="bowl-mix-outline"
        />
        <Paragraph
          style={[
            AppStyles.title_center_small,
            { fontSize: moderateScale(10) },
          ]}
        >
          Food Menu
        </Paragraph>
      </TouchableOpacity>
      <View style={styles.optionsHorizontalItemSeparatorStyle} />
      <TouchableOpacity
        onPress={() => {
          RootNavigation.navigate('floor_plan',{place:place});

        }}
        style={AppStyles.image_container}
      >
        <Avatar.Icon
          style={AppStyles.venue_detail_link}
          color={AppColors.STAR}
          size={48}
          icon="floor-plan"
        />
        <Paragraph
          style={[
            AppStyles.title_center_small,
            { fontSize: moderateScale(10) },
          ]}
        >
          Floor Plan
        </Paragraph>
      </TouchableOpacity>
    </View>

          {/* <OptionsHeader place={place}  /> */}
        </View>
        <View
          style={{
            marginHorizontal: scale(16),
          }}
        >
          <Paragraph style={styles.table_detail_main}>
            Table Information
          </Paragraph>
          <Paragraph style={styles.table_detail_title}>{table?.table_name}</Paragraph>
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
                {table.guest_count}
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
                $ {table.deposit_amount ? table.deposit_amount  : 0}
              </Paragraph>
            </View>
            <View style={AppStyles.content_start}>
              <Paragraph style={AppStyles.table_detail_row_medium}>
                Bottle
              </Paragraph>
            </View>
            <View style={AppStyles.content_end}>
              <Paragraph
                style={[
                  AppStyles.table_detail_row_medium,
                  { color: AppColors.LOGO_COLOR },
                ]}
              >
                $ {selector?.data?.reduce((accumulator, elm) => accumulator + elm.price, 0)}
              </Paragraph>
            </View>
            <View style={AppStyles.content_start}>
              <Paragraph style={AppStyles.table_detail_row_medium}>
                Food
              </Paragraph>
            </View>
            <View style={AppStyles.content_end}>
              <Paragraph
                style={[
                  AppStyles.table_detail_row_medium,
                  { color: AppColors.LOGO_COLOR },
                ]}
              >
                $ {selector?.food?.reduce((accumulator, elm) => accumulator + elm.price, 0)}
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


                {/* $ {selector?.food?.reduce((accumulator, elm) => accumulator + elm.price, 0)} */}
                $ { selector?.food?.reduce((accumulator, elm) => accumulator + elm.price, 0) + selector?.data?.reduce((accumulator, elm) => accumulator + elm.price, 0) + table.deposit_amount  }
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

        {/* <List.Section>EF
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
                RootNavigation.navigate('book_bottles',{
            item:table?.venue_info_id,
            booking:bookingData,
            isfromConfrim:true

                });
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



        <Snackbar
        wrapperStyle={AppStyles.snackbar_wrapper}
        style={AppStyles.snackbar_content}
        visible={hasError}
        onDismiss={() => setHasError(false)}
        action={{
          label: 'OK',
          onPress: () => {},
        }}
        duration={Snackbar.DURATION_MEDIUM}
      >
        <Text style={{ color: AppColors.BLACK, fontFamily: 'Roboto-Regular' }}>
          {errorMessage}
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
  optionsHorizontalListViewStyle: {
    borderColor: '#3A3A3F',
    borderWidth: 2,
    backgroundColor: AppColors.VENUE_CARD,
    flexDirection: 'row',
    // paddingHorizontal: 10,
    marginBottom: 15,
  },
  optionsHorizontalItemSeparatorStyle: {
    height: '100%',
    width: 2,
    backgroundColor: '#3A3A3F',
  },
});
