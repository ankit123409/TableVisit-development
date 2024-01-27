import { observer } from 'mobx-react-lite';
import { List, Paragraph, Searchbar } from 'react-native-paper';
import {
  FlatList,
  RefreshControl,
  TouchableOpacity,
  StyleSheet,
  View,
  SafeAreaView,
  Image as RNImage,
} from 'react-native';
import * as React from 'react';
import {
  AppColors,
  AppStyles,
  moderateScale,
  scale,
  verticalScale,
} from '../../theme';
import { DialogLoadingIndicator, Screen, ScreenBack } from '../../components';
import { useState } from 'react';
import moment from 'moment';
import Icon from 'react-native-paper/src/components/Icon';
import { RootNavigation } from '../../navigators';
import { useFocusEffect } from '@react-navigation/core';
import { useStores } from '../../models';
import { Notifications } from '../../models/notifications-model/notifications-model';

export const BookingStaffNotifications = observer(
  function BookingStaffNotifications() {
    const [refreshing] = useState(false);
    const [notificationsList, setNotificatinsList] = useState<Notifications[]>(
      []
    );
    const { staffBookingStore } = useStores();

    // const { notifications } = staffBookingStore;

    const [loading, setLoading] = useState<boolean>(true);

    useFocusEffect(
      React.useCallback(() => {
        search().then();

        return () => {};
      }, [])
    );

    const search = async () => {
      try {
        setLoading(true);
        const res = await staffBookingStore.getNotifications();
        console.log('Res,,,', res);
        setNotificatinsList(res.data);
        setLoading(false);
      } catch (e) {
        console.warn(e);
      } finally {
        setLoading(false);
      }
    };

    const renderNotifications = ({ item }: { item: Notifications }) => {
      return (
        <TouchableOpacity onPress={async () => {}}>
          <View style={styles.venue_list_container}>
            <View
              style={{
                backgroundColor: '#ffbd591A',
                width: moderateScale(46),
                height: moderateScale(46),
                borderRadius: moderateScale(46),
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon
                source={'bell-ring-outline'}
                size={25}
                color={AppColors.LOGO_COLOR}
              />
            </View>
            <View
              style={[
                styles.column_wrap,
                {
                  marginLeft: scale(10),
                },
              ]}
            >
              <View
                style={{
                  width: '100%',
                }}
              >
                
                <Paragraph style={styles.time_style}>
                 { moment.utc(item.date).local().fromNow()}
                </Paragraph>
                <Paragraph
                  numberOfLines={1}
                  style={[AppStyles.venue_card_name]}
                >
                  {item.table.table_number} - {item?.table?.name}
                </Paragraph>
                <Paragraph
                  numberOfLines={2}
                  style={styles.notification_des_style}
                >
                  {item?.booking?.user?.name}
                </Paragraph>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    };

    console.log("notificationsList", notificationsList)
    return (
      <>
        <SafeAreaView style={{ flex: 1 }}>
          <ScreenBack unsafe={true} backgroundColor={AppColors.BG}>
            <View style={AppStyles.header_style}>
              <View />
              <RNImage
                style={AppStyles.logo_image_style}
                source={require('../shared/table-visit.png')}
              />
              <TouchableOpacity
                onPress={() => RootNavigation.navigate('sign_out')}
              >
                <Icon
                  source={'login'}
                  size={25}
                  color={AppColors.LIGHR_WHITE}
                />
              </TouchableOpacity>
            </View>
            <FlatList
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  tintColor={AppColors.LIGHT_GRAY}
                />
              }
              data={notificationsList}
              style={AppStyles.flat_container}
              showsVerticalScrollIndicator={false}
              renderItem={renderNotifications}
              keyExtractor={(item) => item.id.toString()}
            ></FlatList>
          </ScreenBack>
        </SafeAreaView>
        <DialogLoadingIndicator visible={loading} />
      </>
    );
  }
);

const styles = StyleSheet.create({
  venue_list_container: {
    marginLeft: scale(12),
    marginRight: scale(12),
    marginBottom: verticalScale(12),
    backgroundColor: '#2E3034',
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(5),
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    borderRadius: scale(10),
  },
  column_wrap: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  venue_list_pic: {
    borderRadius: scale(5),
    resizeMode: 'cover',
    width: moderateScale(40),
    height: moderateScale(40),
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
  search_input: {
    borderRadius: scale(5),
    margin: scale(10),
    backgroundColor: '#3A3A3F',
  },
  notification_des_style: {
    color: AppColors.WHITE,
    fontSize: moderateScale(12),
    fontFamily: 'Roboto-Regular',
    textAlign: 'left',
    lineHeight: verticalScale(14),
  },

  main_view_style: {
    flexDirection: 'column',
  },
  time_style: {
    color: '#B1B1AF',
    fontSize: moderateScale(12),
    fontFamily: 'Roboto-Regular',
    textAlign: 'right',
    lineHeight: verticalScale(14),
    flexDirection: 'row',
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
  },
});
