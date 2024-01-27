import { observer } from "mobx-react-lite";
import { Divider, List, Paragraph } from "react-native-paper";
import {
  FlatList,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import * as React from "react";
import {
  BookingItemCard,
  DialogLoadingIndicator,
  ScreenBack,
  Text,
} from "../../components";
import { AppColors, AppStyles } from "../../theme";
import { useCallback, useState } from "react";
import { SceneMap, TabView } from "react-native-tab-view";
import { useStores } from "../../models";
import { useFocusEffect } from "@react-navigation/native";
import { RootNavigation } from "../../navigators";
import { remove, SELECTED_BOOKING } from "../../utils/storage";

export const BookingsScreen = observer(function BookingsScreen() {
  const [loading, setLoading] = useState<boolean>(false);
  const [index, setIndex] = useState(0);

  const { bookingStore } = useStores();
  const { bookings } = bookingStore;

  const [userBookings, setUserBookings] = useState([]);

  const [routes] = useState([
    { key: "upcoming", title: "Upcoming Bookings" },
    { key: "past", title: "Past Bookings" },
  ]);


  useFocusEffect(
    useCallback(() => {
      setLoading(true);

      const fetchData = async () => {
        const result = await bookingStore.getBookings();
        
        if (result === "unauthorized") {
          RootNavigation.navigate("sign_out");
        }

        await remove(SELECTED_BOOKING);
      };

      fetchData().then(() => {
        if (index === 0)
          setUserBookings(bookings.filter((item) => item.is_past === false));
        else setUserBookings(bookings.filter((item) => item.is_past === true));

        setLoading(false);
      });

      return () => {};
    }, [index])
  );

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
      data={userBookings}
      style={AppStyles.flat_container}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => (
        <BookingItemCard booking={item} index={index} />
      )}
      keyExtractor={(item) => item.id.toString()}
      ItemSeparatorComponent={() => {
        return <Divider style={AppStyles.items_divider} />;
      }}
      ListEmptyComponent={emptyComponent}
    ></FlatList>
  );

  const renderScene = SceneMap({
    upcoming: renderBookings,
    past: renderBookings,
  });

  const layout = useWindowDimensions();

  return (
    <>
      <ScreenBack unsafe={true} backgroundColor={AppColors.BG}>
        {/* <Paragraph style={AppStyles.bookings_title}>Bookings</Paragraph> */}
        <TabView
          // renderTabBar={(props) => (
          //   // <TabBar
          //   //   style={AppStyles.tab_view}
          //   //   indicatorStyle={AppStyles.tab_view_indicator}
          //   //   labelStyle={AppStyles.tab_view_label}
          //   //   {...props}
          //   // />
          // )}
          renderTabBar={(props) => {
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
                          color: isSelected
                            ? AppColors.PRIMARY
                            : AppColors.LIGHT_GRAY,
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
          }}
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
