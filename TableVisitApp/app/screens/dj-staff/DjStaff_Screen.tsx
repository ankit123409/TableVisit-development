import { observer } from "mobx-react-lite";
import { Divider, List, Paragraph } from "react-native-paper";
import {
  Animated,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  View,
  useWindowDimensions,
  Image,
  Text,
} from "react-native";
import * as React from "react";

import { useState } from "react";
import { SceneMap, TabView } from "react-native-tab-view";
import {
  AppColors,
  AppStyles,
  moderateScale,
  scale,
  verticalScale,
} from "../../theme";
import { DialogLoadingIndicator, Screen, ScreenBack } from "../../components";
import BookingStaffItemCard from "../../components/card/booking-staff-item-card";
import Icon from "react-native-paper/src/components/Icon";
import { RootNavigation } from "../../navigators";
import { useStores } from "../../models";
import { useFocusEffect } from "@react-navigation/core";
import DjStaffItemCard from "../../components/card/dj-staff-item-card";
import DjStaffSongItemCard from "../../components/card/dj-staff-song-item-card";

const songsRequests = [
  {
    id: 1,
    customer_name: "Zavin Levin",
    song: "Closer",
    table: {
      table_number: 9,
    },
    artist: "Emniem",
  },
];
const tipsData = [
  {
    id: 1,
    customer_name: "Zavin Levin",
    song: "Closer",
    table: {
      table_number: 9,
    },
    artist: "Emniem",
    amount: 10,
  },
];
export const DjStaffScreen = observer(function BookingStaffScreen(props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [index, setIndex] = useState(1);
  const [songs, setSongs] = useState(songsRequests);
  const [routes] = useState([
    { key: "requests", title: "Songs Requests" },
    { key: "tips", title: "Tips" },
  ]);

  //   useFocusEffect(
  //     React.useCallback(() => {
  //       search().then();

  //       return () => {};
  //     }, [index])
  //   );

  //   const search = async () => {
  //     try {
  //       setLoading(true);
  //       if (index === 0) {
  //         const result = await staffBookingStore.getStaffBookingsAssigned(
  //           searchText
  //         );

  //         if (result.kind === "unauthorized") {
  //           RootNavigation.navigate("sign_out");
  //         }
  //         setBookings(result.assigned_bookings);
  //         setAssigned(true);
  //         setLoading(false);
  //       } else {
  //         const result = await staffBookingStore.getStaffBookingsInbox(
  //           searchText
  //         );
  //         if (result.kind === "unauthorized") {
  //           RootNavigation.navigate("sign_out");
  //         }
  //         setBookings(result.inbox_bookings);
  //         setAssigned(false);
  //         setLoading(false);
  //       }
  //     } catch (e) {
  //       console.warn(e);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  const emptyComponent = () => {
    return (
      <List.Section>
        <Paragraph style={AppStyles.empty_text_home}>
          We didn't find any results..
        </Paragraph>
      </List.Section>
    );
  };

  const renderTips = () => (
    <FlatList
      data={tipsData || []}
      style={AppStyles.flat_container}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => (
        <DjStaffItemCard index={index} song={item} />
      )}
      keyExtractor={(item) => item.id.toString()}
      ItemSeparatorComponent={() => {
        return <Divider style={AppStyles.items_divider} />;
      }}
      ListEmptyComponent={emptyComponent}
    ></FlatList>
  );

  const renderSongRequest = () => (
    <FlatList
      data={tipsData || []}
      style={AppStyles.flat_container}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => (
        <DjStaffSongItemCard index={index} song={item} />
      )}
      keyExtractor={(item) => item.id.toString()}
      ItemSeparatorComponent={() => {
        return <Divider style={AppStyles.items_divider} />;
      }}
      ListEmptyComponent={emptyComponent}
    ></FlatList>
  );


  const renderTabBar = (props) => {
    return (
      <View style={{ flexDirection: "row" }}>
        {props.navigationState.routes.map((item, index) => {
          const isSelected = index == props.navigationState.index;

          return (
            <TouchableOpacity
              onPress={() => {
                props.jumpTo(item.key);
              }}
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: isSelected ? AppColors.PRIMARY : AppColors.LIGHT_GRAY,
                  fontWeight: "700",
                }}
              >
                {item.title}
              </Text>
              <View
                style={{
                  width: 20,
                  height: 3.5,
                  backgroundColor: isSelected
                    ? AppColors.PRIMARY
                    : AppColors.BG,
                  marginTop: 10,
                  borderRadius: 10,
                }}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const renderScene = SceneMap({
    requests: renderSongRequest,
    tips: renderTips,
  });

  const layout = useWindowDimensions();

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <ScreenBack unsafe={true} backgroundColor={AppColors.BG}>
          <View style={AppStyles.header_style}>
            <View />
            <Image
              style={AppStyles.logo_image_style}
              source={require("../shared/table-visit.png")}
            />
            <TouchableOpacity
              onPress={() => RootNavigation.navigate("sign_out")}
            >
              <Icon source={"login"} size={25} color={AppColors.LIGHR_WHITE} />
            </TouchableOpacity>
          </View>
          <TabView
            renderTabBar={renderTabBar}
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
        <TouchableOpacity style={{
          backgroundColor: AppColors.BG,
          position: "absolute",
          bottom: verticalScale(50),
          right: scale(20)
        }} onPress={() => props.navigation.navigate("withdrow")}>
          <Image
            style={{ width: scale(50), resizeMode: 'contain', height: verticalScale(70) }}
            source={require('../../screens/shared/wallet.png')}
          />
        </TouchableOpacity>
      </SafeAreaView>
      <DialogLoadingIndicator visible={loading} />
    </>
  );
});