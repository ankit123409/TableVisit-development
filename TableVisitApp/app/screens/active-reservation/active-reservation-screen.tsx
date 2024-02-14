import { useNavigation } from '@react-navigation/native';
import Moment from 'moment';
import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  GestureResponderEvent,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Avatar,
  Divider,
  FAB,
  IconButton,
  List,
  Modal,
  Paragraph,
  Portal,
  Snackbar,
} from 'react-native-paper';
import StarRating from 'react-native-star-rating-widget';
import {
  Button,
  DialogLoadingIndicator,
  ScreenBack,
  Text
} from '../../components';
import { useStores } from '../../models';
import { RootNavigation } from '../../navigators';
import {
  AppColors,
  AppStyles,
  moderateScale,
  scale,
  verticalScale,
} from '../../theme';
import { UserTypeEnum } from '../../utils/app-enums';
import { currencyFormat, onShare } from '../../utils/app-helper';
import {
  SELECTED_CHAT_DATA,
  save
} from '../../utils/storage';
import { confirmApi } from '../confirm/confirmApi';
import { activereservationApi } from './activereservationApi';

export const ActiveReservationScreen = (props:any) =>
   {
    const [loading, setLoading] = useState<boolean>(false);
    const [modalVisible, setModalVisible] = React.useState(false);
    const showModal = () => setModalVisible(true);
    const hideModal = () => setModalVisible(false);

    const [booking, setBooking] = useState();
    const navigation = useNavigation();
    const [user, setUser] = useState<any>({});
    const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const { placeStore, policyStore, tableStore, favoriteStore } = useStores();
   const[place,setPlace]=useState()
   const[table,setTable]=useState()
   const[total,setTotal]=useState()




    useEffect(()=>{
      getBookingDetails()

    },[])
    const getBookingDetails=()=>{
      setPlace(props?.route?.params?.booking?.venue_info)
      const params={
       _path:props?.route?.params?.booking.id
         }

      activereservationApi.getBookingDetails(params, (res: any) => {
        if (res) {
          setBooking(res)

          console.log("resxxxxxxx",res)
      getTableDetails(res?.venue_table_info)

      let bottletotal = res?.bottle_orders?.reduce((accumulator, elm) => accumulator + elm.price,0)
     let foodTotal =res?.food_orders.reduce((accumulator, elm) => accumulator + elm.price,0)
      console.log("bottletotal",bottletotal + foodTotal)
      setTotal(bottletotal + foodTotal)
      let total =  bottletotal + res?.venue_table_infos?.deposit_amount
      // console.log("rseseses",res?.bottle_orders?.reduce((accumulator, elm) => accumulator + elm.price))
// console.log("total",total);

  }
      setLoading(false);
  
    },(error:any)=>{
     
      setLoading(false); 
  
   
    })

    }
    const getTableDetails=(data:any)=>{
      confirmApi.getTableDetiles({_path:`${data.venue_info_id}/${data.id}`}, (res: any) => {
        if (res) {
          setTable(res)
        }
      setLoading(false);
    
    },(error:any)=>{
     
      setLoading(false);
    
    
    })

    }


    const perssCheck=()=>{

      const params={
        _path:props?.route?.params?.booking.id,
        // book_id:props?.route?.params?.booking.id,
        venue_id:place?.id,
        check_in:true,
      }


      activereservationApi.updateBooking(params, (res: any) => {
        if (res) {
          console.log("ressssssssss",res)
          setShowSnackbar(true);
          //     setIsDisabled(true);
          getBookingDetails()

  
  }
         
  
  
          // setPlace(res) 
        // }
      setLoading(false);
  
    },(error:any)=>{
     
      setLoading(false);
  
  
    })

    }
    // useEffect(() => {
    //   setLoading(true);

    //   const fetchData = async () => {
    //     try {
    //       const temp_booking = await load(SELECTED_BOOKING);

    //       if (temp_booking) {
    //         setBooking(temp_booking);
    //         const result = await placeStore.getPlace(temp_booking.place_id);

    //         // if (result === UNAUTHORIZED_API) {
    //         //   RootNavigation.navigate('sign_out');
    //         // }

    //         await policyStore.getPolicy(
    //           temp_booking.place_id,
    //           PolicyTypeEnum.Cancellation
    //         );
    //         await tableStore.getTable(temp_booking.table_id);

    //         await save(SELECTED_PLACE, place);
    //       }

    //       let user_data = await load(USER_DATA);

    //       if (user_data) setUser(user_data);
    //     } catch (e) {
    //       console.warn(e);
    //     } finally {
    //       setLoading(false);
    //     }
    //   };

    //   fetchData().then();
    // }, []);

    // const sendNotification = async () => {
    //   setLoading(true);
    //   try {
    //     const payload = {
    //       booking_id: booking.id,
    //     };
    //     await placeStore.postCheckIn(payload);
    //     setShowSnackbar(true);
    //     setIsDisabled(true);
    //   } catch (e) {
    //     console.warn(e);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // const sendNotificationIndividual = async (id) => {
    //   setLoading(true);

    //   try {
    //     const payload = {
    //       booking_id: booking.id,
    //       user_type: id,
    //     };
    //     await placeStore.postCheckIn(payload);
    //     setShowSnackbar(true);
    //     setIsDisabled(true);
    //   } catch (e) {
    //     console.warn(e);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    const goToChat = async (chat_type) => {
      // console.log("goCHat",booking,chat_type);
      await save(SELECTED_CHAT_DATA, {
        code: booking.confirmation_code + '_' + chat_type,
        name:
          booking.confirmation_code +
          '_' +
          UserTypeEnum[chat_type].replace('_', ' '),
        type: chat_type,
        booking_id: booking.id,
        title: UserTypeEnum[chat_type].replace('_', ' '),
        table_id: table.id,
        place_id: place.id,
      });

      hideModal();

      RootNavigation.navigate('chat', {
        name: table?.table_number,
      });
    };
    return (
      <>
        <ScreenBack
          unsafe={true}
          preset={'fixed'}
          style={AppStyles.screen_container}
          backgroundColor={AppColors.BG}
        >
          <SafeAreaView />
          <View style={styles.headerStyle}>
            <IconButton
              iconColor={AppColors.WHITE}
              size={30}
              icon="chevron-left"
              onPress={() => navigation.goBack()}
            />
            <Text
              style={[
                AppStyles.title_center_small,
                { color: '#E1D3BE', fontWeight: '500' },
              ]}
            >
              {place?.name}
            </Text>
            <View style={styles.headerRightStyle}>
              <TouchableOpacity
                onPress={async () => {
                  await favoriteStore.add(place.id).then(async () => {
                    setFavorite(true);
                  });
                }}
              >
                {/* {favorite ? (
                  <Avatar.Icon
                    color={AppColors.LOGO_COLOR}
                    style={[AppStyles.venue_list_action, { marginRight: 10 }]}
                    size={30}
                    icon="heart"
                  />
                ) : (
                  <Avatar.Icon
                    color={AppColors.LOGO_COLOR}
                    style={[AppStyles.venue_list_action, { marginRight: 10 }]}
                    size={30}
                    icon="heart-outline"
                  />
                )} */}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={async () => {
                  await onShare(place);
                }}
              >
                <Avatar.Icon
                  color={AppColors.LOGO_COLOR}
                  style={[AppStyles.venue_list_action, { marginRight: 10 }]}
                  size={30}
                  icon="share-variant"
                />
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Image
              style={[styles.headerImageStyle]}
              source={{ uri: place?.image || place?.image_path }}
            />

            <View style={styles.mainViewStyle}>
              <FAB
                icon={'chat'}
                style={styles.chatIconStyle}
                color={AppColors.WHITE}
                onPress={async () => {
                  showModal();
                  // RootNavigation.navigate("chat");
                }}
              />
              <FAB
                icon={'music'}
                style={styles.djIconStyle}
                color={AppColors.WHITE}
                onPress={async () => {
                  RootNavigation.navigate('request_song', { booking_id: booking?.id });
                }}
              />
              <Text style={styles.venueOpenHoursStyle}>
                {
                  place?.open_from +
                  ' to ' +
                  place?.closed_at}
              </Text>

              <View style={styles.venueWithCheckButtonContainerStyle}>
                <View>
                  <Text
                    style={[
                      AppStyles.venue_open_hours,
                      AppStyles.mt15,
                      { marginBottom: 0 },
                    ]}
                  >
                    Venue
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={[AppStyles.title, { width: scale(200) }]}
                  >
                    {place?.name}
                  </Text>
                </View>

                <Button
                  style={{
                    backgroundColor: booking?.user_checked_in || isDisabled ? 'gray' : AppColors.LOGO_COLOR,
                  }}
                  onPress={() => {
                    // console.log("user_checked_in",booking)

                    perssCheck()
                    // if (!table.is_checkedIn) {
                    //   sendNotification();
                    // }
                  }}
                >
                  <Text
                    style={[
                      AppStyles.item_title_help,
                      { color: AppColors.WHITE, paddingHorizontal: 5 },
                    ]}
                  >
                    Check - In
                  </Text>
                </Button>
              </View>


              <View style={styles.optionsHorizontalListViewStyle}>
      <TouchableOpacity
        onPress={() => {
          console.log("bokiiii",place)

          RootNavigation.navigate('book_bottles',{
            item:place.id,
            booking:booking

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
        <Paragraph style={[AppStyles.title_center_small, { fontSize: 10 }]}>
          Bottle Menu
        </Paragraph>
      </TouchableOpacity>
      <View style={styles.optionsHorizontalItemSeparatorStyle} />
      <TouchableOpacity
        onPress={() => {
          RootNavigation.navigate('food_menu',{
            item:place.id,
            booking:booking,
            onpress:()=>getBookingDetails()

            // booking_id:
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
        <Paragraph style={[AppStyles.title_center_small, { fontSize: 10 }]}>
          Food Menu
        </Paragraph>
      </TouchableOpacity>
      <View style={styles.optionsHorizontalItemSeparatorStyle} />
      <TouchableOpacity
        onPress={() => {
          RootNavigation.navigate('floor_plan',{
            place:place?.place
          });
        }}
        style={AppStyles.image_container}
      >
        <Avatar.Icon
          style={AppStyles.venue_detail_link}
          color={AppColors.STAR}
          size={48}
          icon="floor-plan"
        />
        <Paragraph style={[AppStyles.title_center_small, { fontSize: 10 }]}>
          Floor Plan
        </Paragraph>
      </TouchableOpacity>
    </View>
        
              

              {/* <OptionsHorizontalListView  place={place} booking={"1"}/> */}
              <DetailsViewItem
                leftText={'Date'}
                rightText={Moment(booking?.book_date).format('DD MMM YYYY')}
              />


              <DetailsViewItem
                leftText={'Confirmation code'}
                rightText={booking?.booking_confirmation_code || ''}
              />
              <DetailsViewItem
                leftText={'Guest List'}
                rightText={'View'}
                rightTextStyle={{ textDecorationLine: 'underline' }}
                onPressRightText={() => {
                  RootNavigation.navigate('guest_list',
                  {
                    booking:props?.route?.params?.booking?.id
                  }
                  );
                }}
                containerStyle={{ paddingBottom: 0 }}
              />
              <Divider style={AppStyles.booking_data_divider} />
              <DetailsViewItem
                leftText={table?.venue_table_infos[0]?.guest_count + ' Guest'}
                leftTextStyle={{ color: AppColors.PRIMARY }}
              />

              <DetailsViewItem
                leftText={
                  'Standard VIP Table in the venue. Location is the best available upon arrival.'
                }
                leftTextStyle={{ fontSize: 11 }}
              />
              <DetailsViewItem
                leftText={'Guests'}
                rightText={table?.venue_table_infos[0]?.guest_count}
              />
              <DetailsViewItem
                leftText={'Minimum Spend'}
                rightText={currencyFormat(table?.venue_table_infos[0]?.minimum_spend)}
              />
              <Divider style={AppStyles.booking_data_divider} />

              <Text>Payment Details</Text>
             
              <View style={styles.paymentDetailsContainerStyle}>
                <DetailsViewItem
                  leftText={'Amount'}
                  rightText={
                    table?.total_amount ? currencyFormat(table?.total_amount) : 0
                  }
                />
                <DetailsViewItem
                  leftText={'Taxes & fees'}
                  rightText={
                    table?.tax_and_fees ? currencyFormat(table?.tax_and_fees) : 0
                  }
                />
                <DetailsViewItem
                  leftText={'Gratuity'}
                  rightText={
                    table?.gratuity_on_booking
                      ? currencyFormat(booking?.gratuity_on_booking)
                      : 0
                  }
                />
                <View style={styles.dottedDividerStyle} />
                <DetailsViewItem
                  leftText={
                    <Text style={{ fontWeight: '800' }}>Booking Total</Text>
                  }
                  rightText={
                    table?.total_amount
                      ? currencyFormat(table?.total_amount)
                      : 0
                  }
                  rightTextStyle={{ fontSize: 16 }}
                  containerStyle={{ paddingBottom: 0 }}
                />
              </View>
              <View style={styles.paymentDetailsContainerStyle}>
                <DetailsViewItem
                  leftText={'Tab Total'}
                  rightText={
                    total
                      ? currencyFormat(total)
                      : 0
                  }
                />
                {/* <DetailsViewItem
                  leftText={'Gratuity'}
                  rightText={
                    booking.spent_gratuity
                      ? currencyFormat(booking.spent_gratuity)
                      : 0
                  }
                /> */}
                <View style={styles.dottedDividerStyle} />
                <DetailsViewItem
                  leftText={
                    <Text style={{ fontWeight: '800' }}>Amount to Pay</Text>
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
              <Text>Cancellation Policy</Text>
              <DetailsViewItem
                leftText={
                  'You have up to 72 hours before the reserved date to cancel your VIP Section and move it to another day. We do not Refund Deposits. '
                }
                leftTextStyle={{ fontSize: 11 }}
                containerStyle={{ paddingHorizontal: 0, paddingTop: 10 }}
              />
              <Text>Rate & Review</Text>

              <DetailsViewItem
                leftText={'Share your experience to help others.'}
                leftTextStyle={{ fontSize: 11 }}
                containerStyle={{
                  paddingHorizontal: 0,
                  paddingTop: 10,
                  paddingBottom: 0,
                }}
              />
              <StarRating
                starSize={15}
                rating={0}
                onChange={() => RootNavigation.navigate('rate_review')}
                color={AppColors.LOGO_COLOR}
                enableSwiping={false}
                enableHalfStar={false}
              />
              <Button
                onPress={() => RootNavigation.navigate('booking_payment',{
                  booking:booking,
                  table:table,
                  total:total
                })}
                style={styles.paymentButtonStyle}
              >
                <Text
                  style={[
                    AppStyles.item_title_help,
                    { color: AppColors.WHITE, paddingHorizontal: 5 },
                  ]}
                >
                  Payment Details
                </Text>
              </Button>
            </View>
            <View style={styles.bottomBGCoverViewStyle} />
          </ScrollView>
        </ScreenBack>
        <Portal>
          <Modal
            visible={modalVisible}
            onDismiss={hideModal}
            contentContainerStyle={{
              backgroundColor: AppColors.LIGHTGRAY,
              marginHorizontal: 20,
              padding: 20,
              borderRadius: 10,
            }}
            theme={{ colors: { backdrop: AppColors.TRANSPARENCY } }}
          >
            {/*@ts-ignore*/}
            <Text style={[AppStyles.title_center, { marginBottom: 10 }]}>
              Send a message to
            </Text>
            <TouchableOpacity
              key={UserTypeEnum.Hookah_Waitress}
              style={[styles.modalButtonContainerStyle]}
              onPress={async () => {
                await goToChat(UserTypeEnum.Waitress);
              }}
            >
              <Text style={AppStyles.title_center_small}>
                Message Cocktail Server
              </Text>
              <List.Icon icon="chevron-right" color={AppColors.WHITE} />
            </TouchableOpacity>
            <TouchableOpacity
              key={UserTypeEnum.Hookah_Waitress}
              style={[styles.modalButtonContainerStyle]}
              onPress={async () => {
                sendNotificationIndividual(UserTypeEnum.Hookah_Waitress);
              }}
            >
              <Text style={AppStyles.title_center_small}>
                Request Hookah Server
              </Text>
              <List.Icon icon="chevron-right" color={AppColors.WHITE} />
            </TouchableOpacity>
            <TouchableOpacity
              key={UserTypeEnum.Valet_Parking}
              style={styles.modalButtonContainerStyle}
              onPress={async () => {
                sendNotificationIndividual(UserTypeEnum.Security);
              }}
            >
              <Text style={AppStyles.title_center_small}>Request Security</Text>
              <List.Icon icon="chevron-right" color={AppColors.WHITE} />
            </TouchableOpacity>
            <TouchableOpacity
              key={UserTypeEnum.Server}
              style={styles.modalButtonContainerStyle}
              onPress={async () => {
                sendNotificationIndividual(UserTypeEnum.Manager);
              }}
            >
              <Text style={AppStyles.title_center_small}>Request Manager</Text>
              <List.Icon icon="chevron-right" color={AppColors.WHITE} />
            </TouchableOpacity>
            <TouchableOpacity
              key={UserTypeEnum.DJ}
              style={styles.modalButtonContainerStyle}
              onPress={async () => {
                sendNotificationIndividual(UserTypeEnum.DJ);
              }}
            >
              <Text style={AppStyles.title_center_small}>Request Song</Text>
              <List.Icon icon="chevron-right" color={AppColors.WHITE} />
            </TouchableOpacity>
          </Modal>
        </Portal>
        <DialogLoadingIndicator visible={loading} />
        <Snackbar
          wrapperStyle={AppStyles.snackbar_wrapper}
          style={AppStyles.snackbar_content}
          visible={showSnackbar}
          onDismiss={() => setShowSnackbar(false)}
          action={{
            label: 'OK',
            onPress: () => { },
          }}
          duration={Snackbar.DURATION_MEDIUM}
        >
          <Text
            style={{
              color: AppColors.BLACK,
              fontFamily: 'Roboto-Regular',
            }}
          >
            Notification sent successfully
          </Text>
        </Snackbar>
      </>
    );
  }

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
const OptionsHorizontalListView = (place:any,booking:any) => {
  {
    console.log("bokkingggdgdgdgd",booking)
    
    }
  return (
    <View style={styles.optionsHorizontalListViewStyle}>
      <TouchableOpacity
        onPress={() => {
          console.log("bokiiii",booking)

          return
          RootNavigation.navigate('book_bottles',{
            item:place?.place?.id,
            booking:booking

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
        <Paragraph style={[AppStyles.title_center_small, { fontSize: 10 }]}>
          Bottle Menu
        </Paragraph>
      </TouchableOpacity>
      <View style={styles.optionsHorizontalItemSeparatorStyle} />
      <TouchableOpacity
        onPress={() => {
          console.log("placacaca",)
          RootNavigation.navigate('food_menu',{
            item:place?.place?.id,
            booking:booking

            // booking_id:
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
        <Paragraph style={[AppStyles.title_center_small, { fontSize: 10 }]}>
          Food Menu
        </Paragraph>
      </TouchableOpacity>
      <View style={styles.optionsHorizontalItemSeparatorStyle} />
      <TouchableOpacity
        onPress={() => {
          RootNavigation.navigate('floor_plan',{
            place:place?.place
          });
        }}
        style={AppStyles.image_container}
      >
        <Avatar.Icon
          style={AppStyles.venue_detail_link}
          color={AppColors.STAR}
          size={48}
          icon="floor-plan"
        />
        <Paragraph style={[AppStyles.title_center_small, { fontSize: 10 }]}>
          Floor Plan
        </Paragraph>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  headerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRightStyle: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  headerImageStyle: {
    resizeMode: 'cover',
    height: 287,
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  mainViewStyle: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    top: -30,
    backgroundColor: AppColors.LIGHTGRAY,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  bottomBGCoverViewStyle: {
    height: 30,
    backgroundColor: AppColors.LIGHTGRAY,

    position: 'absolute',

    width: '100%',
    zIndex: 100,
    bottom: 0,
  },
  venueOpenHoursStyle: {
    color: '#E1D3BE',
    fontSize: moderateScale(10),
  },
  venueWithCheckButtonContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentButtonStyle: {
    alignSelf: 'center',
    width: '80%',
    paddingVertical: 10,
    marginTop: 15,
    borderRadius: 10,
    shadowColor: AppColors.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
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
  chatIconStyle: {
    backgroundColor: AppColors.PRIMARY,
    position: 'absolute',
    right: scale(80),
    top: -verticalScale(22),
    zIndex: 100,
    borderRadius: 100,
  },
  djIconStyle: {
    backgroundColor: AppColors.PRIMARY,
    position: 'absolute',
    right: scale(20),
    top: -verticalScale(22),
    zIndex: 100,
    borderRadius: 100,
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
  modalButtonContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: AppColors.BG,
    marginBottom: 10,
    alignItems: 'center',
    padding: 10,
    paddingVertical: 7,
    paddingLeft: 15,
    borderRadius: 5,
  },
});
