import React, { useState } from "react";
import {
  Button,
  Dialog,
  Paragraph,
  Portal,
  Snackbar,
} from "react-native-paper";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  AppColors,
  AppStyles,
  moderateScale,
  scale,
  verticalScale,
} from "../../theme";
import { RootNavigation } from "../../navigators";
import { load, USER_DATA } from "../../utils/storage";
import Moment from "moment";
import { useStores } from "../../models";

const DjStaffItemCard = ({
  song,
  index,
  props,
}: {
  song: any;
  index: number;
  props: any;
}) => {
  console.log(song);
  return (
    <TouchableOpacity>
      <View style={styles.tips_container}>
        <View style={styles.innerContainer}>
          <Image
            style={styles.userAvatar}
            source={{
              uri:
                song?.customer_avatar ||
                "https://fastly.picsum.photos/id/1/200/300.jpg?hmac=jH5bDkLr6Tgy3oAg5khKCHeunZMHq0ehBZr6vGifPLY",
            }}
          />
          <View style={styles.details_container}>
            <View>
              <Paragraph numberOfLines={1} style={AppStyles.venue_card_name}>
                {song.customer_name}
              </Paragraph>
              <Paragraph numberOfLines={1} style={AppStyles.venue_list_type}>
                Tip: ${song.amount}
              </Paragraph>
            </View>
            <View>
              <Paragraph
                numberOfLines={1}
                style={[AppStyles.booking_date, styles.booking_date]}
              >
                {Moment("Thu Nov     25 2023 17:30:03 GMT+0300").fromNow()}
              </Paragraph>

              <Paragraph
                numberOfLines={1}
                style={(AppStyles.booking_amount, styles.booking_amount)}
              >
                Table: {song.table ? song.table.table_number : null}
              </Paragraph>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DjStaffItemCard;

const styles = StyleSheet.create({
  tips_container: {
    marginHorizontal: 16,
    padding: 10,
    borderRadius: 5,
    border: 1,
    borderColor: "#2E3034",
    backgroundColor: "#282A2D",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  userAvatar: {
    height: moderateScale(35),
    width: moderateScale(35),
    borderRadius: scale(5),
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: scale(15),
  },
  details_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  booking_amount: {
    color: "#B1B1AF",
    fontSize: moderateScale(10)
  }
});