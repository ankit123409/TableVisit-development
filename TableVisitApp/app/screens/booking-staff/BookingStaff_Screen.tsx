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
import { BookingStaffApi } from "./BookingStaffApi";

export const BookingStaffScreen = observer(function BookingStaffScreen(props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [searchText] = useState("");
  const [index, setIndex] = useState(0);
  const [bookings, setBookings] = useState([]);
  const [assigned, setAssigned] = useState<boolean>(true);
  const [routes] = useState([
    { key: "upcoming", title: "Accepted" },
    { key: "past", title: "Requests" },
  ]);

  const { staffBookingStore } = useStores();
  const { inbox_bookings, assigned_bookings } = staffBookingStore;

  useFocusEffect(
    React.useCallback(() => {
      search().then();

      return () => {};
    }, [index])
  );

  const search = async () => {
    try {
      setLoading(true);
      if (index === 0) {
        console.log("heloooo")

        
      
        BookingStaffApi.getAcceptedRequest (null, (res: any) => {
          if (res) {
            console.log("rseseses",)
            setBookings(res);
            setAssigned(true);
            setLoading(false);
      
      }
           
      
      
          
        setLoading(false);
      
      },(error:any)=>{
       
        setLoading(false);
      
      
      })
        // const result = await staffBookingStore.getStaffBookingsAssigned(
        //   searchText
        // );

        // if (result.kind === "unauthorized") {
        //   RootNavigation.navigate("sign_out");
        // }
       
      } else {

        BookingStaffApi.getRequestList (null, (res: any) => {
          if (res) {
            setBookings(res);
        setAssigned(false);
        setLoading(false);
         
      
      }
           
      
      
          
        setLoading(false);
      
      },(error:any)=>{
       
        setLoading(false);
      
      
      })

        // const result = await staffBookingStore.getStaffBookingsInbox(
        //   searchText
        // );
        // if (result.kind === "unauthorized") {
        //   RootNavigation.navigate("sign_out");
        // }
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

  const emptyComponent = () => {
    return (
      <List.Section>
        <Paragraph style={AppStyles.empty_text_home}>
          We didn't find any results..
        </Paragraph>
      </List.Section>
    );
  };

  const renderBookings = () => (
    <FlatList
      data={bookings || []}
      style={AppStyles.flat_container}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => (
        <BookingStaffItemCard
          booking={item}
          index={index}
          assigned={assigned}
          props={props}
        />
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
    upcoming: renderBookings,
    past: renderBookings,
  });

  const layout = useWindowDimensions();

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <Screen unsafe={true} backgroundColor={AppColors.BG}>
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
        </Screen>
      </SafeAreaView>
      <DialogLoadingIndicator visible={loading} />
    </>
  );
});