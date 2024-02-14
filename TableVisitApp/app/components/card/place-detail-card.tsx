import * as React from 'react';
import { Avatar, Paragraph } from 'react-native-paper';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { AppColors, AppStyles, scale, verticalScale } from '../../theme';

export const PlaceDetailCard = ({ place, date }: { place: any; date: any }) => {
  console.log("place",place)
  return (
    <View
      style={[
        styles.venue_list_container,
        { backgroundColor: AppColors.LIGHTGRAY },
      ]}
    >
      <View style={styles.header_card_style}>
        <Paragraph numberOfLines={1} style={[styles.venue_open_hours]}>
          {'Open from ' + place.open_from + ' to ' + place.closed_at}
        </Paragraph>
        <View style={AppStyles.venue_list_row}>
          <TouchableOpacity onPress={async () => {}}>
            <Avatar.Icon
              color={AppColors.LOGO_COLOR}
              style={[AppStyles.venue_list_action]}
              size={30}
              icon="share-variant"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={async () => {}}>
            <Avatar.Icon
              color={AppColors.LOGO_COLOR}
              style={[AppStyles.venue_list_action, { marginRight: 10 }]}
              size={30}
              icon="heart-outline"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          borderBottomColor: '#3A3A3F',
          borderBottomWidth: 1,
          width: '100%',
          marginVertical: verticalScale(5),
        }}
      />
      <View style={{
        flexDirection: 'row',
      }}>
        <View style={{ position: 'relative' }}>
          <Image
            style={styles.venue_list_pic}
            source={{ uri: place.image || place.image_path }}
          />
          <View
            style={{
              backgroundColor: AppColors.LOGO_COLOR,
              position: 'absolute',
              bottom: verticalScale(30),
              flexDirection: 'row',
              borderTopRightRadius: scale(10),
              borderBottomRightRadius: scale(10),
              padding: scale(5),
              paddingRight: scale(10),
            }}
          >
            <Avatar.Icon
              color={AppColors.BLACK}
              style={{ backgroundColor: AppColors.TRANSPARENT }}
              size={24}
              icon="star"
            />
            <Paragraph
              numberOfLines={1}
              style={[AppStyles.venue_card_rating, { color: AppColors.BLACK }]}
            >{"4"}


              {/* {place?.venue_ratings?.reduce((accumulator, elm) => accumulator + elm, 0)/place?.place?.venue_ratings.length} */}
            </Paragraph>
          </View>
        </View>
        <View style={styles.column_wrap}>
          <Paragraph numberOfLines={1} style={AppStyles.venue_list_type}>
            {place.place_type_name}
          </Paragraph>
          <Paragraph numberOfLines={1} style={AppStyles.venue_card_name}>
            {place.name}
          </Paragraph>
          <View style={[AppStyles.detail_card_row, { marginVertical: 5 }]}>
            <Avatar.Icon
              style={[
                AppStyles.detail_card_icon,
                { backgroundColor: AppColors.LIGHTGRAY },
              ]}
              size={25}
              icon="map-marker-outline"
            />
            <Paragraph numberOfLines={2} style={AppStyles.detail_card_small}>
              {place.address}
            </Paragraph>
          </View>
          <View style={[AppStyles.detail_card_row, { marginVertical: 5 }]}>
            <Avatar.Icon
              style={[
                AppStyles.detail_card_icon,
                { backgroundColor: AppColors.LIGHTGRAY },
              ]}
              size={25}
              icon="calendar-blank"
            />
            <Paragraph numberOfLines={2} style={AppStyles.detail_card_small}>
              {date}
            </Paragraph>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  venue_list_container: {
    marginVertical: verticalScale(5),
    marginHorizontal: scale(10),
    backgroundColor: AppColors.BG,
    padding: 8,
    flexDirection: 'column',
    flexWrap: 'wrap',
    borderRadius: scale(8),
  },
  venue_container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: verticalScale(5),
  },
  venue_list_pic: {
    borderRadius: scale(10),
    resizeMode: 'cover',
    width: scale(115),
    height: verticalScale(80),
    marginRight: scale(15),
  },
  header_card_style: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  venue_open_hours: {
    color: AppColors.WHITE,
    fontSize: 13,
    textAlign: 'left',
    fontFamily: 'Roboto-Regular',
  },
  column_wrap: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    gap: 2,
  },
});
