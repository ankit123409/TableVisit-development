import { observer } from 'mobx-react-lite';
import { Divider, List, Paragraph } from 'react-native-paper';
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import * as React from 'react';
import Moment from 'moment';

import {
  AppColors,
  AppStyles,
  moderateScale,
  scale,
  verticalScale,
} from '../../theme';
import { Screen, ScreenBack } from '../../components';
import moment from 'moment';
import { useStores } from '../../models';
import { activereservationApi } from '../active-reservation/activereservationApi';


export const BookingStaffDetailsScreen = observer(
  function BookingStaffDetailsScreen(props) {
    const booking = props?.route?.params?.data;
const[result,bookResult]=React.useState()
    const { staffTableSpendStore, bookingGuestStore } = useStores();
    const { bottle_table_spends, food_table_spends } = staffTableSpendStore;
    const { booking_guests } = bookingGuestStore;

    const [loading, setLoading] = React.useState<boolean>(false);
    React.useEffect(()=>{
      getBookingDetails()

    },[])
    const getBookingDetails=()=>{
      const params={
       _path:booking.id
         }

      activereservationApi.getBookingDetails(params, (res: any) => {
        if (res) {
          console.log("res",res)
          bookResult(res)


        

  }
      setLoading(false);
  
    },(error:any)=>{
     
      setLoading(false); 
  
   
    })
  }
    // React.useEffect(() => {
    //   async function fetchData() {
    //     try {
    //       setLoading(true);

    //       await staffTableSpendStore.getStaffTableSpends({
    //         booking_id: booking.id,
    //       });
    //     } catch (e) {
    //       console.warn(e);
    //     } finally {
    //       setLoading(false);
    //     }
    //   }
    //   async function fetchGuests() {
    //     try {
    //       await bookingGuestStore.getBookingGuests(booking.id);
    //     } catch (e) {
    //       console.warn(e);
    //     } finally {
    //     }
    //   }

    //   fetchData().then();
    //   fetchGuests().then();

    //   return () => {};
    // }, []);

    const renderTableDetail = ({ item, index }) => {
      return (
        <View style={styles.drink_item_style}>
          <Paragraph style={styles.order_name_style}>
            {item.service_name}
          </Paragraph>
          <Paragraph style={styles.order_price_style}>
            $ {item.total_amount}
          </Paragraph>
        </View>
      );
    };

    const renderGuest = ({ item, index }) => {
      return (
        <View style={styles.drink_item_style}>
          <Paragraph style={styles.order_name_style}>{item.name}</Paragraph>
        </View>
      );
    };

    const emptyComponent = () => {
      return (
        <List.Section>
          <Paragraph style={AppStyles.empty_text_home}>
            We didn't find any results..
          </Paragraph>
        </List.Section>
      );
    };

    return (
      <>
        <ScreenBack unsafe={true} backgroundColor={AppColors.BG}>
          <View style={styles.main_view_style}>
            <View style={styles.venue_list_container}>
              <Image
                style={styles.venue_list_pic}
                source={{
                  uri:
                    booking.customer_avatar ||
                    'https://fastly.picsum.photos/id/1/200/300.jpg?hmac=jH5bDkLr6Tgy3oAg5khKCHeunZMHq0ehBZr6vGifPLY',
                }}
              />
              <View style={styles.column_wrap}>
                <View>
                  <Paragraph
                    numberOfLines={1}
                    style={AppStyles.venue_card_name}
                  >
                    {booking.customer_name}
                  </Paragraph>
                  <Paragraph
                    numberOfLines={1}
                    style={AppStyles.venue_list_type}
                  >
                    {booking.confirmation_code}
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
                    Table: {booking.guests_count}
                  </Paragraph>
                </View>
              </View>
            </View>
            <ScrollView style={[styles.container]}>
              <View style={styles.drink_order_view_style}>
                <Paragraph style={styles.main_title_style}>
                  Drink Order
                </Paragraph>
                <View>
                  <FlatList
                    contentContainerStyle={{
                      gap: verticalScale(10),
                    }}
                    data={bottle_table_spends}
                    style={styles.drink_order_style}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderTableDetail}
                    keyExtractor={(item) => item.id.toString()}
                    ListEmptyComponent={emptyComponent}
                  ></FlatList>
                </View>
              </View>
              <View style={styles.drink_order_view_style}>
                <Paragraph style={styles.main_title_style}>
                  Food Order
                </Paragraph>
                <View>
                  <FlatList
                    contentContainerStyle={{
                      gap: verticalScale(10),
                    }}
                    data={food_table_spends}
                    style={styles.drink_order_style}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderTableDetail}
                    keyExtractor={(item) => item.id.toString()}
                    ListEmptyComponent={emptyComponent}
                  ></FlatList>
                </View>
              </View>
              <View style={styles.drink_order_view_style}>
                <Paragraph style={styles.main_title_style}>
                  Guest List
                </Paragraph>
                <View>
                  <FlatList
                    contentContainerStyle={{
                      gap: verticalScale(10),
                    }}
                    data={booking_guests}
                    style={styles.drink_order_style}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderGuest}
                    keyExtractor={(item) => item.id.toString()}
                    ListEmptyComponent={emptyComponent}
                  ></FlatList>
                </View>
              </View>
            </ScrollView>
          </View>
        </ScreenBack>
      </>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    height: Dimensions.get('screen').height - verticalScale(160),
  },
  venue_list_container: {
    marginLeft: scale(20),
    marginRight: scale(20),
    marginBottom: verticalScale(12),
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(5),
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
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
  drink_order_view_style: {
    flexDirection: 'column',
    gap: verticalScale(7),
    marginHorizontal: scale(20),
  },
  drink_order_style: {
    backgroundColor: '#282A2D',
    padding: moderateScale(16),
    borderRadius: moderateScale(5),
  },
  main_title_style: {
    fontWeight: '600',
    fontSize: moderateScale(15),
    color: AppColors.WHITE,
    marginTop: verticalScale(15),
  },
  drink_item_style: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  order_price_style: {
    color: AppColors.LOGO_COLOR,
    fontSize: moderateScale(13),
    textAlign: 'right',
    fontFamily: 'Roboto-Bold',
  },
  order_name_style: {
    color: AppColors.WHITE,
    fontSize: moderateScale(14),
    fontFamily: 'Roboto-Regular',
  },
  main_view_style: {
    flexDirection: 'column',
  },
});
