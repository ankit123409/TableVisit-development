import { observer } from "mobx-react-lite";
import { Button, Divider, List, Paragraph, TextInput } from "react-native-paper";
import {
  Animated,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  View,
  useWindowDimensions,
  Image,
  Text,
  StyleSheet,
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
import { Controller, useForm } from "react-hook-form";

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
export const DjRequestScreen = observer(function DjRequestScreen(props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [index, setIndex] = useState(1);
  const [songs, setSongs] = useState(songsRequests);
  const [routes] = useState([
    { key: "requests", title: "Songs Requests" },
    { key: "tips", title: "Tips for DJ" },
  ]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      name: '',
      bank_name: '',
      account_number: '',
      routing_number: '',
    },
  });

  const emptyComponent = () => {
    return (
      <List.Section>
        <Paragraph style={AppStyles.empty_text_home}>
          We didn't find any results..
        </Paragraph>
      </List.Section>
    );
  };

  const handleSend = async (data) => {
  }

  const renderTips = () => {
    return (
      <View
        style={{
          paddingHorizontal: scale(16),
          flexDirection: 'column',
        }}
      >
        <List.Section >
          <Paragraph style={styles.text_form}>Full Beneficiary Name</Paragraph>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                textAlign={'left'}
                autoCapitalize={'none'}
                mode="flat"
                label={null}
                style={styles.input_flat}
                placeholder="Enter Beneficiary Name"
                value={value}
                onChangeText={onChange}
                textColor="white"
                underlineColor={AppColors.DIVIDER_GRAY}
              />
            )}
            name="name"
          />
          {errors.name && (
            <Paragraph style={AppStyles.error_text}>
              Please enter your name.
            </Paragraph>
          )}
        </List.Section>
        <List.Section>
          <Paragraph style={styles.text_form}>Bank Name</Paragraph>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                textAlign={'left'}
                autoCapitalize={'none'}
                mode="flat"
                label={null}
                style={styles.input_flat}
                placeholder="Enter Bank Name"
                value={value}
                onChangeText={onChange}
                textColor="white"
                underlineColor={AppColors.DIVIDER_GRAY}
              />
            )}
            name="bank_name"
          />
          {errors.bank_name && (
            <Paragraph style={AppStyles.error_text}>
              Please enter bank detail.
            </Paragraph>
          )}
        </List.Section>
        <List.Section>
          <Paragraph style={styles.text_form}>Account Number</Paragraph>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                textAlign={'left'}
                autoCapitalize={'none'}
                mode="flat"
                label={null}
                style={styles.input_flat}
                placeholder="Enter Account Number"
                value={value}
                onChangeText={onChange}
                textColor="white"
                underlineColor={AppColors.DIVIDER_GRAY}
              />
            )}
            name="account_number"
          />
          {errors.account_number && (
            <Paragraph style={AppStyles.error_text}>
              Please enter account number.
            </Paragraph>
          )}
        </List.Section>
        <List.Section>
          <Paragraph style={styles.text_form}>Routing Number</Paragraph>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                textAlign={'left'}
                autoCapitalize={'none'}
                mode="flat"
                label={null}
                style={styles.input_flat}
                placeholder="Enter Routing Number"
                value={value}
                onChangeText={onChange}
                textColor="white"
                underlineColor={AppColors.DIVIDER_GRAY}
              />
            )}
            name="routing_number"
          />
          {errors.routing_number && (
            <Paragraph style={AppStyles.error_text}>
              Please enter routing number.
            </Paragraph>
          )}
        </List.Section>

        <Button
          mode="contained"
          dark={true}
          buttonColor={AppColors.LOGO_COLOR}
          onPress={handleSubmit(handleSend)}
          style={[
            AppStyles.button,
            {
              marginHorizontal: scale(47),
              borderRadius: scale(10),
              marginTop: verticalScale(20)
            },
          ]}
          contentStyle={AppStyles.button_content}
          labelStyle={AppStyles.button_label}
        >
          Transfer Now
        </Button>
      </View>
    )
  };

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

const styles = StyleSheet.create({
  text_form: {
    marginLeft: scale(5),
    marginRight: scale(5),
    color: AppColors.WHITE,
    fontFamily: "Roboto-Regular",
    fontSize: 15,
    marginVertical: 0,
  },
  input_flat: {
    marginLeft: scale(5),
    marginRight: scale(5),
    backgroundColor: AppColors.BG,
    marginTop: verticalScale(5)
  }
});
