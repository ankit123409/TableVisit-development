import { observer } from 'mobx-react-lite';
import { Divider, List, Paragraph } from 'react-native-paper';
import {
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import * as React from 'react';

import { useState } from 'react';
import { AppColors, AppStyles } from '../../theme';
import { DialogLoadingIndicator, Screen, ScreenBack } from '../../components';
import BookingStaffItemCard from '../../components/card/booking-staff-item-card';
import Icon from 'react-native-paper/src/components/Icon';
import { RootNavigation } from '../../navigators';
import { useStores } from '../../models';
import { useFocusEffect } from '@react-navigation/core';

export const SecurityBookingScreen = observer(function SecurityBookingScreen() {
  const [loading, setLoading] = useState<boolean>(true);
  const [searchText] = useState('');
  const [bookings, setBookings] = useState([]);
  const [assigned, setAssigned] = useState<boolean>(true);

  const { staffBookingStore } = useStores();

  useFocusEffect(
    React.useCallback(() => {
      search().then();

      return () => {};
    }, [])
  );

  const search = async () => {
    try {
      setLoading(true);
      const result = await staffBookingStore.getStaffBookingsAssigned(
        searchText
      );

      if (result.kind === 'unauthorized') {
        RootNavigation.navigate('sign_out');
      }
      setBookings(result.assigned_bookings);
      setAssigned(true);
      setLoading(false);
    } catch (e) {
      console.warn(e);
    } finally {
      setLoading(false);
    }
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
      <SafeAreaView style={{ flex: 1 }}>
        <ScreenBack unsafe={true} backgroundColor={AppColors.BG}>
          <View style={AppStyles.header_style}>
            <View />
            <Image
              style={AppStyles.logo_image_style}
              source={require('../shared/table-visit.png')}
            />
            <TouchableOpacity
              onPress={() => RootNavigation.navigate('sign_out')}
            >
              <Icon source={'login'} size={25} color={AppColors.LIGHR_WHITE} />
            </TouchableOpacity>
          </View>
          <FlatList
            data={bookings || []}
            style={AppStyles.flat_container}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <BookingStaffItemCard
                booking={item}
                index={index}
                assigned={assigned}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => {
              return <Divider style={AppStyles.items_divider} />;
            }}
            ListEmptyComponent={emptyComponent}
          ></FlatList>
        </ScreenBack>
      </SafeAreaView>
      <DialogLoadingIndicator visible={loading} />
    </>
  );
});
