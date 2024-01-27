import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { AppColors, AppStyles } from '../../theme';
import { DialogLoadingIndicator, Screen, ScreenBack } from '../../components';
import { useCallback, useState } from 'react';
import { Avatar, Divider, Paragraph } from 'react-native-paper';
import { useStores } from '../../models';
import {
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { StaffBookingItemCard } from '../../components';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import { useFocusEffect } from '@react-navigation/native';
import { RootNavigation } from '../../navigators';

export const StaffHomeScreen = observer(function StaffHomeScreen() {
  const [loading, setLoading] = useState<boolean>(true);
  const [searchText] = useState('');
  const [index, setIndex] = useState(0);
  const [bookings, setBookings] = useState([]);
  const [assigned, setAssigned] = useState<boolean>(true);
  // const [refreshing] = useState<boolean>(false);

  const { staffBookingStore } = useStores();
  const { inbox_bookings, assigned_bookings } = staffBookingStore;
  // console.log("assigned_bookings",JSON.stringify(assigned_bookings));
  useFocusEffect(
    useCallback(() => {
      search().then();

      return () => {};
    }, [index])
  );

  const search = async () => {
    try {
      setLoading(true);
      if (index === 0) {
        const result = await staffBookingStore.getStaffBookingsAssigned(
          searchText
        );

        if (result.kind === 'unauthorized') {
          RootNavigation.navigate('sign_out');
        }
        setBookings(result.assigned_bookings);
        setAssigned(true);
        setLoading(false);
      } else {
        const result = await staffBookingStore.getStaffBookingsInbox(
          searchText
        );
        if (result.kind === 'unauthorized') {
          RootNavigation.navigate('sign_out');
        }
        setBookings(result.inbox_bookings);
        setAssigned(false);
        setLoading(false);
      }
    } catch (e) {
      console.warn(e);
    } finally {
      setLoading(false);
    }
  };

  const [routes] = useState([
    { key: 'assigned', title: 'Accepted' },
    { key: 'inbox', title: 'Inbox' },
  ]);

  const layout = useWindowDimensions();

  const renderBookings = () => (
    <FlatList
      /*refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={async () => {
                        await search();
                    }}
                    tintColor={AppColors.LIGHT_GRAY}/>
            }*/
      data={bookings}
      style={AppStyles.flat_container}
      ItemSeparatorComponent={() => {
        return <Divider style={AppStyles.items_divider} />;
      }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => (
        <StaffBookingItemCard assigned={assigned} booking={item} />
      )}
      keyExtractor={(item, index) => index} //item.id.toString(),
    ></FlatList>
  );

  const renderScene = SceneMap({
    assigned: renderBookings,
    inbox: renderBookings,
  });

  return (
    <>
      <ScreenBack
        unsafe={true}
        style={AppStyles.screen_container}
        backgroundColor={AppColors.BG}
      >
        <View style={AppStyles.row_wrap}>
          <View style={AppStyles.content_start}>
            <Paragraph style={AppStyles.staff_page_title}>Bookings</Paragraph>
          </View>
          <View style={[AppStyles.content_end]}>
            <TouchableOpacity
              style={{ marginEnd: 5 }}
              onPress={async () => {
                await search();
              }}
            >
              <Avatar.Icon
                size={45}
                style={[AppStyles.base_icon, { marginTop: 2 }]}
                icon={'refresh-circle'}
              />
            </TouchableOpacity>
          </View>
        </View>
        {/*<Searchbar
                    autoCorrect={false}
                    autoCapitalize={"none"}
                    placeholderTextColor={AppColors.SEARCH_GRAY}
                    style={AppStyles.search_input}
                    textAlign={"left"}
                    placeholder={"Search by code.."}
                    iconColor={AppColors.LOGO_COLOR}
                    onChangeText={setSearchText}
                    value={searchText}
                    onEndEditing={search}
                />*/}
        <TabView
          renderTabBar={(props) => (
            <TabBar
              style={AppStyles.tab_view}
              indicatorStyle={AppStyles.tab_view_indicator}
              labelStyle={AppStyles.tab_view_label}
              {...props}
            />
          )}
          style={{ backgroundColor: AppColors.BG }}
          navigationState={{ index, routes }}
          sceneContainerStyle={[
            AppStyles.wrapper,
            { backgroundColor: AppColors.BG },
          ]}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
        />
      </ScreenBack>

      <DialogLoadingIndicator visible={loading} />
    </>
  );
});
