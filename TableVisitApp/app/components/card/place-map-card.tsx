import * as React from 'react';
import { Paragraph } from 'react-native-paper';
import { Image, TouchableOpacity, View } from 'react-native';
import { AppStyles } from '../../theme';
import { save, SELECTED_PLACE } from '../../utils/storage';
import { RootNavigation } from '../../navigators';

export const PlaceMapCard = ({ place }: { place: any }) => {
  return (
    <TouchableOpacity
      onPress={async () => {
        await save(SELECTED_PLACE, place);
        RootNavigation.navigate('detail');
      }}
    >
      <View style={AppStyles.map_footer_row}>
        <Image
          style={AppStyles.venue_pic}
          source={{ uri: place.large_image_path || place.image_path }}
        />
        <View>
          <Paragraph numberOfLines={1} style={AppStyles.venue_title}>
            {place.name}
          </Paragraph>
          <Paragraph numberOfLines={1} style={AppStyles.venue_card_type}>
            {place.place_type_name}
          </Paragraph>
          <Paragraph numberOfLines={2} style={AppStyles.venue_detail}>
            {place.address}
          </Paragraph>
        </View>
      </View>
    </TouchableOpacity>
  );
};
