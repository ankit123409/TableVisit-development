import { observer } from 'mobx-react-lite';
import {
  Avatar,
  Button,
  IconButton,
  Paragraph,
  Snackbar,
} from 'react-native-paper';
import * as React from 'react';
import { AppColors, AppStyles, moderateScale } from '../../theme';
import {
  DialogCalendar,
  ScreenBack,
  Text,
} from '../../components';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useCallback, useState } from 'react';
import Moment from 'moment';
import { RootNavigation } from '../../navigators';
import {
  loadSelectedDate,
  onShare,
  saveSelectedDate,
} from '../../utils/app-helper';
import { load, SELECTED_PLACE } from '../../utils/storage';
import { useStores } from '../../models';
import { DialogPlaceDetail } from '../../components/dialog/dialog-place-detail';

export const DetailScreen = observer(function DetailScreen() {
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [markedDate, setMarkedDate] = useState({});
  const [date, setDate] = useState(null);
  const [added, setAdded] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);

  const { placeStore, favoriteStore } = useStores();
  const { place } = placeStore;
  const [favorite, setFavorite] = useState<boolean>(place.is_favorite);

  // const place = {
  //   id: 1,
  //   place_rating_count: 10,
  //   place_rating_avg: 4.9,
  //   name: 'Reveal atlanta',
  //   place_type_name: 'Venue',
  //   large_image_path:
  //     'https://fastly.picsum.photos/id/1/200/300.jpg?hmac=jH5bDkLr6Tgy3oAg5khKCHeunZMHq0ehBZr6vGifPLY',
  //   open_at: '9:00 am',
  //   close_at: '9:00 pm',
  //   detail: {
  //     short_detail: 'sdjskdksjdksjk',
  //   },
  // };

  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      setLoading(true);

      const fetchData = async () => {
        try {
          const temp_place = await load(SELECTED_PLACE);

          if (temp_place) {
            await placeStore.getPlace(temp_place.id);
          }

          let selectedDate = await loadSelectedDate();

          if (!selectedDate) selectedDate = Moment().format('YYYY-MM-DD');

          markDate(selectedDate);
        } catch (e) {
          console.warn(e);
        } finally {
          setLoading(false);
        }
      };

      fetchData().then(async () => {});

      return () => {};
    }, [])
  );

  const markDate = (date) => {
    let current_date = {};
    current_date[date] = { selected: true };
    setMarkedDate(current_date);
    setDate(date);
  };

  const onSelect = async () => {
    setLoading(true);

    try {
      let valid = Moment();

      if (Moment(date) < valid)
        await saveSelectedDate(valid.format('YYYY-MM-DD'));
      else await saveSelectedDate(date);
    } catch (e) {
      __DEV__ ? console.log(e) : null;
    } finally {
      RootNavigation.navigate('tables');
      setLoading(false);
    }
  };
  return (
    <>
      <ScreenBack
        unsafe={true}
        preset={'fixed'}
        style={AppStyles.screen_container}
        backgroundColor={AppColors.BG}
      >
        <SafeAreaView />
        <View style={styles.headerStyle}>
          <IconButton
            iconColor={AppColors.WHITE}
            size={30}
            icon="chevron-left"
            onPress={() => navigation.goBack()}
          />
          <Text
            style={[
              AppStyles.title_center_small,
              { color: '#E1D3BE', fontWeight: '500' },
            ]}
          >
            {place.name}
          </Text>
          <View style={styles.headerRightStyle}>
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
            <TouchableOpacity
              onPress={async () => {
                await onShare(place);
              }}
            >
              <Avatar.Icon
                color={AppColors.LOGO_COLOR}
                style={[AppStyles.venue_list_action, { marginRight: 10 }]}
                size={30}
                icon="share-variant"
              />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <ImageBackground
            style={[styles.headerImageStyle]}
            source={{ uri: place.image || place.image_path }}
          >
            <View style={styles.reviewContainerStyle}>
              <Avatar.Icon
                color={AppColors.BLACK}
                style={{ backgroundColor: AppColors.PRIMARY }}
                size={24}
                icon="star"
              />
              <Text style={{ color: AppColors.BLACK, marginLeft: 10 }}>
                {place.place_rating_avg}
              </Text>
            </View>
          </ImageBackground>
          <View style={styles.mainViewStyle}>
            <Text style={styles.venueOpenHoursStyle}>
              {'Hours of operations : ' +
                place.open_at +
                ' to ' +
                place.close_at}
            </Text>
            <View style={styles.venueWithCheckButtonContainerStyle}>
              <View>
                <Text
                  style={[
                    AppStyles.venue_open_hours,
                    AppStyles.mt15,
                    { marginBottom: 0 },
                  ]}
                >
                  Venue
                </Text>
                <Text style={[AppStyles.title]}>{place.name}</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 10,
                  }}
                >
                  <IconButton
                    icon={'map-marker-outline'}
                    iconColor="#E1D3BE"
                    size={20}
                    style={{ margin: 0 }}
                  />
                  <Text style={styles.venueOpenHoursStyle}>
                    {place.address}
                  </Text>
                </View>
              </View>
            </View>
            <OptionsHorizontalListView />
            <Text>Details</Text>
            <Text
              numberOfLines={3}
              style={{ fontSize: 12, marginTop: 10, color: '#E1D3BE' }}
            >
              {place.detail ? place.detail.short_detail : null}
            </Text>
            <TouchableOpacity onPress={() => setShowDetail(true)}>
              <Text style={styles.showMoreTextStyle}>Show More</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 15,
                alignItems: 'center',
              }}
              onPress={async () => {
                RootNavigation.navigate('help');
              }}
            >
              <Text
                style={[
                  AppStyles.title_center_small,
                  { color: '#E1D3BE', fontWeight: '500', fontSize: 20 },
                ]}
              >
                GET HELP
              </Text>
              <IconButton
                icon="chevron-right"
                size={25}
                iconColor={AppColors.WHITE}
                style={{ margin: 0 }}
              />
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 20,
              }}
            >
              <Text
                style={{
                  flex: 1,
                  fontWeight: '700',
                  fontSize: 16,
                }}
              >
                Select the date you want to reserve
              </Text>
              <Button
                mode="contained"
                dark={true}
                buttonColor={AppColors.PRIMARY}
                onPress={() => setShowCalendar(true)}
                style={[AppStyles.button, { borderRadius: 10, margin: 0 }]}
                contentStyle={AppStyles.button_content}
                labelStyle={AppStyles.button_label}
              >
                Select Date
              </Button>
            </View>
          </View>
          <View style={styles.bottomBGCoverViewStyle} />
        </ScrollView>
      </ScreenBack>
      <DialogCalendar
        visible={showCalendar}
        onDismiss={() => {
          setShowCalendar(false);
        }}
        markedDate={markedDate}
        onDayPress={(date) => {
          markDate(date.dateString);
        }}
        onSelect={async () => {
          await onSelect();
          setShowCalendar(false);
        }}
      />

      <Snackbar
        wrapperStyle={AppStyles.snackbar_wrapper}
        style={AppStyles.snackbar_content}
        visible={added}
        onDismiss={() => setAdded(false)}
        action={{
          label: 'OK',
          onPress: () => {},
        }}
        duration={Snackbar.DURATION_MEDIUM}
      >
        <Text style={{ color: AppColors.BLACK, fontFamily: 'Roboto-Regular' }}>
          Coming soon..
        </Text>
      </Snackbar>

      {/* <DialogLoadingIndicator visible={loading} /> */}

      <DialogPlaceDetail
        visible={showDetail}
        place={place}
        onDismiss={() => {
          setShowDetail(false);
        }}
      />
    </>
  );
});

const OptionsHorizontalListView = () => {
  return (
    <View style={styles.optionsHorizontalListViewStyle}>
      <TouchableOpacity
        onPress={() => {
          RootNavigation.navigate('book_bottles');
          // RootNavigation.navigate("bottle_menu")
        }}
        style={AppStyles.image_container}
      >
        <Avatar.Icon
          style={AppStyles.venue_detail_link}
          color={AppColors.STAR}
          size={48}
          icon="bottle-wine-outline"
        />
        <Paragraph style={[AppStyles.title_center_small, { fontSize: 10 }]}>
          Bottle Menu
        </Paragraph>
      </TouchableOpacity>
      <View style={styles.optionsHorizontalItemSeparatorStyle} />
      <TouchableOpacity
        onPress={() => {
          RootNavigation.navigate('food_menu');
        }}
        style={AppStyles.image_container}
      >
        <Avatar.Icon
          style={AppStyles.venue_detail_link}
          color={AppColors.STAR}
          size={48}
          icon="bowl-mix-outline"
        />
        <Paragraph style={[AppStyles.title_center_small, { fontSize: 10 }]}>
          Food Menu
        </Paragraph>
      </TouchableOpacity>
      <View style={styles.optionsHorizontalItemSeparatorStyle} />
      <TouchableOpacity
        onPress={() => {
          RootNavigation.navigate('floor_plan');
        }}
        style={AppStyles.image_container}
      >
        <Avatar.Icon
          style={AppStyles.venue_detail_link}
          color={AppColors.STAR}
          size={48}
          icon="floor-plan"
        />
        <Paragraph style={[AppStyles.title_center_small, { fontSize: 10 }]}>
          Floor Plan
        </Paragraph>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  headerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRightStyle: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  headerImageStyle: {
    resizeMode: 'cover',
    height: 287,
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  mainViewStyle: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    top: -30,
    backgroundColor: AppColors.LIGHTGRAY,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  bottomBGCoverViewStyle: {
    height: 30,
    backgroundColor: AppColors.LIGHTGRAY,

    position: 'absolute',

    width: '100%',
    zIndex: 100,
    bottom: 0,
  },
  venueOpenHoursStyle: {
    color: '#E1D3BE',
    fontSize: moderateScale(10),
  },
  venueWithCheckButtonContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentButtonStyle: {
    alignSelf: 'center',
    width: '80%',
    paddingVertical: 10,
    marginTop: 15,
    borderRadius: 10,
    shadowColor: AppColors.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
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

  paymentDetailsContainerStyle: {
    backgroundColor: '#282A2D',
    borderWidth: 1,
    borderColor: '#3A3A3F',
    padding: 15,
    marginVertical: 10,
  },
  dottedDividerStyle: {
    width: '100%',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: AppColors.DIVIDER_GRAY,
    marginBottom: 10,
  },
  modalButtonContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: AppColors.BG,
    marginBottom: 10,
    alignItems: 'center',
    padding: 10,
    paddingVertical: 7,
    paddingLeft: 15,
    borderRadius: 5,
  },
  showMoreTextStyle: {
    color: AppColors.PRIMARY,
    fontSize: 12,
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
  reviewContainerStyle: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 50,
    backgroundColor: AppColors.PRIMARY,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingRight: 20,
    borderStartEndRadius: 10,
    borderEndEndRadius: 10,
  },
});
