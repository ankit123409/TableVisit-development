import * as React from 'react';
import { Avatar, Paragraph } from 'react-native-paper';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { AppColors, AppStyles, scale } from '../../theme';
import { RootNavigation } from '../../navigators';
import { save, SELECTED_PLACE } from '../../utils/storage';
import { Text } from '../text/text';
import { useStores } from '../../models';

export const PlaceItemCard = ({
  place,
  index,
}: {
  place: any;
  index: number;
}) => {
  const [favorite, setFavorite] = React.useState<boolean>(place.is_favorite);
  const { favoriteStore } = useStores();

  return (
    <TouchableOpacity
      onPress={async () => {
        await save(SELECTED_PLACE, place);
        RootNavigation.navigate('detail');
      }}
    >
      <View
        style={[
          AppStyles.venue_container,
          { width: scale(156), backgroundColor: '#2D2D35' },
        ]}
      >
        <ImageBackground
          // defaultSource={require("../../screens/shared/venue.png")}
          style={[AppStyles.venue_card_pic, { height: 110, width: '100%' }]}
          imageStyle={{ borderRadius: 10 }}
          source={{ uri: place.image }}
        >
          <View style={styles.reviewContainerStyle}>
            <Avatar.Icon
              color={AppColors.BLACK}
              style={{ backgroundColor: AppColors.PRIMARY }}
              size={20}
              icon="star"
            />
            <Text style={{ color: AppColors.BLACK, fontSize: 12 }}>
              {place.place_rating_avg}
            </Text>
          </View>
        </ImageBackground>

        <Paragraph numberOfLines={1} style={AppStyles.venue_card_type}>
          {place.place_type_name}
        </Paragraph>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text
            numberOfLines={1}
            style={[AppStyles.venue_card_name, { flex: 1 }]}
          >
            {place.name}
          </Text>
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
                style={[AppStyles.venue_list_action]}
                size={30}
                icon="heart"
              />
            ) : (
              <Avatar.Icon
                color={AppColors.LOGO_COLOR}
                style={[AppStyles.venue_list_action]}
                size={30}
                icon="heart-outline"
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  reviewContainerStyle: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 10,
    backgroundColor: AppColors.PRIMARY,
    alignItems: 'center',
    paddingRight: 10,
    borderStartEndRadius: 10,
    borderEndEndRadius: 10,
  },
});
