import * as React from 'react';
import { Avatar, Paragraph } from 'react-native-paper';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { AppColors, AppStyles, moderateScale } from '../../theme';
import { RootNavigation } from '../../navigators';

export const OptionsHeader = (props:any) => {
  const[id,setId]=React.useState(props?.place)
  console.log("props",props?.place?.id)
  return (
    <View style={styles.optionsHorizontalListViewStyle}>
      <TouchableOpacity
        onPress={() => {
          RootNavigation.navigate('book_bottles',{
            item:props?.place?.id
          });
        }}
        style={AppStyles.image_container}
      >
        <Avatar.Icon
          style={AppStyles.venue_detail_link}
          color={AppColors.STAR}
          size={48}
          icon="bottle-wine-outline"
        />
        <Paragraph
          style={[
            AppStyles.title_center_small,
            { fontSize: moderateScale(10) },
          ]}
        >
          Bottle Menu
        </Paragraph>
      </TouchableOpacity>
      <View style={styles.optionsHorizontalItemSeparatorStyle} />
      <TouchableOpacity
        onPress={() => {
          RootNavigation.navigate('food_menu',{
            item:props?.place?.id

          });
        }}
        style={AppStyles.image_container}
      >
        <Avatar.Icon
          style={AppStyles.venue_detail_link}
          color={AppColors.STAR}
          size={48}
          icon="bowl-mix-outline"
        />
        <Paragraph
          style={[
            AppStyles.title_center_small,
            { fontSize: moderateScale(10) },
          ]}
        >
          Food Menu
        </Paragraph>
      </TouchableOpacity>
      <View style={styles.optionsHorizontalItemSeparatorStyle} />
      <TouchableOpacity
        onPress={() => {
          RootNavigation.navigate('floor_plan',{place:props});

        }}
        style={AppStyles.image_container}
      >
        <Avatar.Icon
          style={AppStyles.venue_detail_link}
          color={AppColors.STAR}
          size={48}
          icon="floor-plan"
        />
        <Paragraph
          style={[
            AppStyles.title_center_small,
            { fontSize: moderateScale(10) },
          ]}
        >
          Floor Plan
        </Paragraph>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  optionsHorizontalListViewStyle: {
    borderColor: '#3A3A3F',
    borderWidth: 2,
    backgroundColor: AppColors.VENUE_CARD,
    flexDirection: 'row',
    // paddingHorizontal: 10,
    marginBottom: 15,
  },
  optionsHorizontalItemSeparatorStyle: {
    height: '100%',
    width: 2,
    backgroundColor: '#3A3A3F',
  },
});
