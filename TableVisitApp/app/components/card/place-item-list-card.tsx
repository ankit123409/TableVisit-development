import * as React from 'react';
import { Avatar, IconButton, Paragraph } from 'react-native-paper';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image as RNImage,
} from 'react-native';
import {
  AppColors,
  AppStyles,
  moderateScale,
  scale,
  verticalScale,
} from '../../theme';
import { RootNavigation } from '../../navigators';
import { save, SELECTED_PLACE } from '../../utils/storage';
import { onShare } from '../../utils/app-helper';
import { useStores } from '../../models';
import { useState } from 'react';

export const PlaceItemListCard = ({
  place,
  index,
  favorite_list = false,
  onRefresh,
}: {
  place: any;
  index: number;
  favorite_list?: boolean;
  onRefresh(): void;
}) => {
  const { favoriteStore } = useStores();
  const [favorite, setFavorite] = useState<boolean>(place.is_favorite);

  return (
    // heart
    <TouchableOpacity
      onPress={async () => {
        await save(SELECTED_PLACE, place);
        console.log('place...', place.name);
        RootNavigation.navigate('detail', {
          placeName: place.name,
        });
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
            {favorite_list ? (
              <TouchableOpacity
                onPress={async () => {
                  await favoriteStore.remove(place.rel_id).then(async () => {
                    await onRefresh();
                  });
                }}
              >
                <Avatar.Icon
                  color={AppColors.LOGO_COLOR}
                  style={[
                    AppStyles.venue_list_action,
                    { marginRight: 10, borderColor: 'yellow', borderWidth: 1 },
                  ]}
                  size={30}
                  icon="trash-can-outline"
                />
              </TouchableOpacity>
            ) : null}
            {!favorite_list ? (
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
            ) : null}
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
            <RNImage
              source={{ uri: place.image }}
              style={styles.venue_list_pic}
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
            <Paragraph numberOfLines={1} style={AppStyles.venue_card_name}>
              {place.name}
            </Paragraph>
            <View style={AppStyles.row_wrap}>
              <Paragraph numberOfLines={1} style={AppStyles.venue_card_rating}>
                {place.place_rating_count + ' reviews'}
              </Paragraph>
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
