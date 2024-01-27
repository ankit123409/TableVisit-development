import * as React from 'react';
import { Avatar, Divider, Paragraph } from 'react-native-paper';
import { TouchableOpacity, View } from 'react-native';
import { AppColors, AppStyles } from '../../theme';
import { onShare } from '../../utils/app-helper';
import { OptionsHeader } from './options-header';
import { useStores } from '../../models';
import { useState } from 'react';

export const DetailHeader = ({ place }: { place: any }) => {
  const { favoriteStore } = useStores();
  const [favorite, setFavorite] = useState<boolean>(place.is_favorite);

  return (
    <View style={AppStyles.venue_detail_header}>
      <View style={AppStyles.venue_detail_header_in}>
        <View style={AppStyles.row_wrap}>
          <View style={[AppStyles.content_start, { flex: 3 }]}>
            <Paragraph numberOfLines={1} style={AppStyles.venue_detail_name}>
              {place.name}
            </Paragraph>
          </View>
          <View style={[AppStyles.content_end, { flex: 1 }]}>
            <View style={AppStyles.column_wrap}>
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
          </View>
        </View>
        <Paragraph numberOfLines={1} style={AppStyles.venue_address}>
          {place.address}
        </Paragraph>
        <Paragraph numberOfLines={1} style={[AppStyles.venue_open_hours]}>
          {'Open from ' + place.open_at + ' to ' + place.close_at}
        </Paragraph>
        <View style={AppStyles.row_wrap}>
          <Avatar.Icon
            color={AppColors.STAR}
            style={AppStyles.venue_rating}
            size={24}
            icon="star"
          />
          <Paragraph numberOfLines={1} style={AppStyles.venue_card_rating}>
            {place.place_rating_avg}
            {' | ' + place.place_rating_count + ' reviews'}
          </Paragraph>
        </View>
      </View>

      <Divider style={AppStyles.venue_detail_divider} />
      <OptionsHeader />
    </View>
  );
};
