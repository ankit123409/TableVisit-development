import * as React from 'react';
import { Avatar, IconButton, Paragraph } from 'react-native-paper';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import {
  AppColors,
  AppStyles,
  moderateScale,
  scale,
  verticalScale,
} from '../../theme';
import { RootNavigation } from '../../navigators';
import { save, SELECTED_BOOKING } from '../../utils/storage';
import Moment from 'moment';
import { useStores } from '../../models';
import { currencyFormat, onShare } from '../../utils/app-helper';
import { Text } from '../text/text';

export const BookingItemCard = ({
  booking,
  index,
}: {
  booking: any;
  index: number;
}) => {
  const place = booking.place;
  const { favoriteStore } = useStores();
  const [favorite, setFavorite] = React.useState<boolean>(place.is_favorite);
  return (
    <TouchableOpacity
      onPress={async () => {
        console.log("booking", booking)
        await save(SELECTED_BOOKING, booking);
        RootNavigation.navigate('active_reservation');
      }}
    >
      <View
        style={[
          styles.venue_list_container,
          { backgroundColor: AppColors.LIGHTGRAY },
        ]}
      >
        <View style={styles.header_card_style}>
          <Paragraph numberOfLines={1} style={[styles.venue_open_hours]}>
            {'Open from ' + place.open_at + ' to ' + place.close_at}
          </Paragraph>
          <View style={AppStyles.venue_list_row}>
            <TouchableOpacity
              onPress={async () => {
                await onShare(place);
              }}
            >
              <Avatar.Icon
                color={AppColors.LOGO_COLOR}
                style={[AppStyles.venue_list_action]}
                size={30}
                icon="share-variant"
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={async () => {
                await favoriteStore.add(place.id).then(async () => {
                  setFavorite(true);
                });
              }}
            >
              {favorite ? (
                <Avatar.Icon
                  color={AppColors.LOGO_COLOR}
                  style={[AppStyles.venue_list_action, { marginRight: 10 }]}
                  size={30}
                  icon="heart"
                />
              ) : (
                <Avatar.Icon
                  color={AppColors.LOGO_COLOR}
                  style={[AppStyles.venue_list_action, { marginRight: 10 }]}
                  size={30}
                  icon="heart-outline"
                />
              )}
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
        <View style={styles.venue_container}>
          <View style={{ position: 'relative' }}>
            <Image
              style={[styles.venue_list_pic]}
              source={{ uri: place.large_image_path || place.image_path }}
            />
            <View
              style={{
                backgroundColor: AppColors.PRIMARY,
                position: 'absolute',
                bottom: verticalScale(10),
                flexDirection: 'row',
                borderTopRightRadius: scale(10),
                borderBottomRightRadius: scale(10),

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
                style={[
                  AppStyles.venue_card_rating,
                  { color: AppColors.BLACK },
                ]}
              >
                {place.place_rating_avg}
              </Paragraph>
            </View>
          </View>
          <View style={styles.column_wrap}>
            <Paragraph numberOfLines={1} style={AppStyles.venue_list_type}>
              {place.place_type_name}
            </Paragraph>
            <Paragraph
              numberOfLines={2}
              style={[AppStyles.venue_card_name, { width: scale(170) }]}
            >
              {place.name}
            </Paragraph>
            <View
              style={[
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                },
              ]}
            >
              <IconButton
                icon={'calendar-outline'}
                iconColor="#E1D3BE"
                size={20}
                style={{ margin: 0, marginLeft: -10 }}
              />
              <Text numberOfLines={1} style={{ color: '#E1D3BE' }}>
                {Moment(booking.book_date).format('DD MMM YYYY')}
              </Text>
            </View>
            <Text
              numberOfLines={1}
              style={{ color: '#E1D3BE', fontWeight: '600' }}
            >
              {booking?.confirmation_code}
            </Text>
            <View style={AppStyles.row_wrap}>
              <Text numberOfLines={1} style={AppStyles.venue_list_type}>
                {booking.total_amount
                  ? currencyFormat(booking.total_amount)
                  : 0}{' '}
                - {booking.guests_count} Guests
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
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
    flexGrow: 1,
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
  venueOpenHoursStyle: {
    color: '#E1D3BE',
    fontSize: moderateScale(10),
  },
});
