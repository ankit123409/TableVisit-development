import { observer } from "mobx-react-lite";
import { Button, List, Paragraph, TextInput } from "react-native-paper";
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  useWindowDimensions,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import * as React from "react";

import { useState } from "react";
import { SceneMap, TabView } from "react-native-tab-view";
import {
  AppColors,
  AppStyles,
  scale,
  verticalScale,
} from "../../theme";
import { DialogLoadingIndicator, ScreenBack } from "../../components";
import { Controller, useForm } from "react-hook-form";
import { useStores } from "../../models";

const direct_array = [
  {
    id: 1,
    amount: "10",
  },
  {
    id: 2,
    amount: '50',
  },
  {
    id: 3,
    amount: '100',
  },
];

export const RequestSong = observer(function RequestSong(props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "requests", title: "Songs Requests" },
    { key: "tips", title: "Tip for DJ" },
  ]);
  const [selected, setSelected] = useState(null);

  const { bookingStore } = useStores();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    defaultValues: {
      song_name: '',
      artist_name: "",

    },
  });

  const {
    control: control1,
    handleSubmit: handleSubmit1,
    formState: { errors: errors1 },
    watch: watch1,
    setValue,
    getValues
  } = useForm({
    defaultValues: {
      tip_amount: ""
    },
  });


  const handleSend = async (data) => {
    setLoading(true);
    const payload = {
      ...data,
      booking_id: props?.route?.params?.booking_id
    }
    const res = await bookingStore.songRequest(payload)
    setLoading(false);
    reset()
    console.log("Resds", res)
  }

  const handleSendTips = async (data) => {
    console.log("Data..", data)
    setLoading(true);
    const payload = {
      ...data,
      booking_id: props?.route?.params?.booking_id
    }
    const res = await bookingStore.songRequest(payload)
    setLoading(false);
    reset()
    console.log("Resds", res)
  }

  const renderTips = () => {
    return (
      <View
        style={{
          paddingHorizontal: scale(16),
          flexDirection: 'column',
          marginTop: verticalScale(50),
          height: Dimensions.get("screen").height - verticalScale(200),
        }}
      >
        <List.Section >
          <Paragraph style={styles.text_form}>Song Name</Paragraph>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                textAlign={'left'}
                autoCapitalize={'none'}
                mode="outlined"
                label={null}
                style={styles.input_flat}
                placeholder="Enter Song Name"
                value={value}
                onChangeText={onChange}
                textColor="white"
                underlineColor={AppColors.DIVIDER_GRAY}
              />
            )}
            name="song_name"
          />
          {errors.song_name && (
            <Paragraph style={AppStyles.error_text}>
              Please enter song.
            </Paragraph>
          )}
        </List.Section>
        <List.Section>
          <Paragraph style={styles.text_form}>Artist Name</Paragraph>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                textAlign={'left'}
                autoCapitalize={'none'}
                mode="outlined"
                label={null}
                style={styles.input_flat}
                placeholder="Enter artist name"
                value={value}
                onChangeText={onChange}
                textColor="white"
                underlineColor={AppColors.DIVIDER_GRAY}
              />
            )}
            name="artist_name"
          />
          {errors.artist_name && (
            <Paragraph style={AppStyles.error_text}>
              Please enter artist name.
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
              marginTop: verticalScale(20),
              position: "absolute",
              bottom: verticalScale(10),
              width: "80%"
            },
          ]}
          contentStyle={AppStyles.button_content}
          labelStyle={AppStyles.button_label}
        >
          Send
        </Button>
      </View>
    )
  };

  const renderSongRequest = () => {
    return (
      <View
        style={{
          paddingHorizontal: scale(16),
          flexDirection: 'column',
          marginTop: verticalScale(50),
          height: Dimensions.get("screen").height - verticalScale(200),
        }}
      >
        <List.Section >
          <Paragraph style={styles.text_form}>Enter your tip amount</Paragraph>
          <Controller
            control={control1}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                textAlign={'left'}
                autoCapitalize={'none'}
                mode="outlined"
                label={null}
                style={styles.input_flat}
                placeholder="Enter your tip"
                value={value}
                onChangeText={onChange}
                textColor="white"
                underlineColor={AppColors.DIVIDER_GRAY}
              />
            )}
            name="tip_amount"
          />
          {errors1.tip_amount && (
            <Paragraph style={AppStyles.error_text}>
              Please enter tip amount.
            </Paragraph>
          )}
        </List.Section>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            gap: scale(20),
            marginTop: verticalScale(5),
            paddingBottom: verticalScale(100)
          }}
        >
          {direct_array.map((message, index) => {
            return (
              <TouchableOpacity
                onPress={async () => {
                  setSelected(message.id)
                  setValue("tip_amount", message.amount)
                }}
                key={message.id}
                style={{
                  backgroundColor: '#FDBD5933',
                  paddingHorizontal: scale(20),
                  paddingVertical: verticalScale(5),
                  borderRadius: scale(30),
                  borderColor:
                    selected === message.id ? '#FDBD59' : '#FDBD5933',
                  borderWidth: 1,
                }}
              >
                <Text
                  style={{
                    color: selected === message.id ? '#FDBD59' : 'white',
                    fontFamily: 'Roboto-Bold',
                  }}
                >
                  ${message.amount}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <Button
          mode="contained"
          dark={true}
          buttonColor={AppColors.LOGO_COLOR}
          onPress={handleSubmit1(handleSendTips)}
          style={[
            AppStyles.button,
            {
              marginHorizontal: scale(47),
              borderRadius: scale(10),
              marginTop: verticalScale(20),
              position: "absolute",
              bottom: verticalScale(10),
              width: "80%"
            },
          ]}
          contentStyle={AppStyles.button_content}
          labelStyle={AppStyles.button_label}
        >
          Submit
        </Button>
      </View>
    )
  }


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
    tips: renderSongRequest,
    requests: renderTips,
  });

  const layout = useWindowDimensions();

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <ScreenBack unsafe={true} backgroundColor={AppColors.BG}>

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
    backgroundColor: "#212428",
    marginTop: verticalScale(5),
  }
});
