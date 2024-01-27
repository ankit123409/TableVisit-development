import { observer } from 'mobx-react-lite';
import { List, Searchbar, Paragraph, FAB, Snackbar } from 'react-native-paper';
import {
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Text,
  StyleSheet,
} from 'react-native';
import * as React from 'react';
import {
  AppColors,
  AppStyles,
  moderateScale,
  scale,
  verticalScale,
} from '../../theme';
import { RootNavigation } from '../../navigators';
import { useCallback, useState } from 'react';
import {
  DialogLoadingIndicator,
  PlaceItemCard,
  Screen,
  ScreenBack,
} from '../../components';
import { useStores } from '../../models';
import { load, USER_LOCATION } from '../../utils/storage';
import { useFocusEffect } from '@react-navigation/native';

export const HomeScreen = observer(function HomeScreen(props: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const [word] = useState('');
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);

  const { placeStore } = useStores();
  const { featured_by_city, near_by_city ,near_by_cities } = placeStore;

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          let location = await load(USER_LOCATION);

          if (location) {
            // 3606
            const result = await placeStore.getNearByCity(4228);
            await placeStore.getNearByCities();

            if (result === 'unauthorized') {
              RootNavigation.navigate('sign_out');
            }

            await placeStore.getFeaturedByCity(location.id);
          }
        } catch (e) {
          console.warn(e);
        } finally {
        }
      };

      // if (params && params.index === 0)

      fetchData().then();

      return () => {};
    }, [])
  );

  const search = async () => {
    setLoading(true);

    try {
      props.jumpTo('search');
    } catch (e) {
      console.warn(e);
    } finally {
      setLoading(false);
    }
  };

  const emptyComponent = () => {
    return (
      <List.Section>
        <Paragraph style={AppStyles.empty_text_home}>
          We didn't find any results..
        </Paragraph>
      </List.Section>
    );
  };

  return (
    <>
      <ScreenBack
        style={AppStyles.home_screen_container}
        unsafe={true}
        backgroundColor={AppColors.BG}
        preset={'scroll'}
      >
        <List.Section>
          <View style={styles.home_explore}>
            <View style={styles.content_end}>
              <Image
                source={require('../shared/venue-placeholder.png')}
                style={styles.home_explore_pic}
              />
            </View>
            <View style={styles.content_start}>
              <TouchableOpacity
                onPress={() => {
                  setShowSnackbar(true);
                  // RootNavigation.navigate('guest_list');
                }}
              >
                <Paragraph style={styles.home_explore_us}>
                  EXPLORE NOW
                </Paragraph>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.book_view_style]}
                onPress={() => {
                  // setShowSnackbar(true);
                  RootNavigation.navigate('detail', {
                    placeName: 'Revel Atlanta',
                  });
                }}
              >
                <Text style={styles.home_explore_book}>BOOK NOW</Text>
              </TouchableOpacity>
            </View>
          </View>
        </List.Section>

        <List.Section>
          <View style={AppStyles.row}>
            <View style={AppStyles.content_start}>
              <Paragraph style={AppStyles.text_home_featured}>
                Featured Venues
              </Paragraph>
            </View>
            <View style={AppStyles.content_end}>
              <TouchableOpacity
                onPress={() => RootNavigation.navigate('featured_venues')}
              >
                <Paragraph style={AppStyles.text_home_link}>See all</Paragraph>
              </TouchableOpacity>
            </View>
          </View>
        </List.Section>
        <List.Section>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            // data={ArrayData}
            data={near_by_cities.slice()}
            renderItem={({ item, index }) => (
              <PlaceItemCard place={item} index={index} />
            )}
            keyExtractor={(item) => String(item.id)}
            ListEmptyComponent={emptyComponent}
          ></FlatList>
        </List.Section>

        <List.Section>
          <View style={AppStyles.row}>
            <View style={AppStyles.content_start}>
              <Paragraph style={AppStyles.text_home_featured}>
                Venues Near You
              </Paragraph>
            </View>
            <View style={AppStyles.content_end}>
              <TouchableOpacity onPress={() => RootNavigation.navigate('map')}>
                <Paragraph style={AppStyles.text_home_link}>See all</Paragraph>
              </TouchableOpacity>
            </View>
          </View>
        </List.Section>
        <List.Section>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={near_by_cities.slice()}
            renderItem={({ item, index }) => (
              <PlaceItemCard place={item} index={index} />
            )}
            keyExtractor={(item) => String(item.id)}
            ListEmptyComponent={emptyComponent}
          ></FlatList>
        </List.Section>
      </ScreenBack>
      <FAB
        style={[
          AppStyles.fab,
          { backgroundColor: AppColors.LIGHTGRAY, borderRadius: 100 },
        ]}
        color={AppColors.LOGO_COLOR}
        icon="map-outline"
        /*map-search-outline*/
        onPress={() => RootNavigation.navigate('map')}
      />

      <Snackbar
        wrapperStyle={AppStyles.snackbar_wrapper}
        style={AppStyles.snackbar_content}
        visible={showSnackbar}
        onDismiss={() => setShowSnackbar(false)}
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

      <DialogLoadingIndicator visible={loading} />
    </>
  );
});

const styles = StyleSheet.create({
  home_explore: {
    backgroundColor: AppColors.LOGO_COLOR,
    borderRadius: 12,
    padding: 8,
    marginHorizontal: scale(15),
    flexDirection: 'row',
    gap: scale(16),
  },
  home_explore_pic: {
    borderRadius: 12,
    width: scale(121),
    height: verticalScale(75),
  },
  content_end: {},
  content_start: {
    flexDirection: 'column',
    justifyContent: 'center',
    height: 'auto',
    gap: verticalScale(6),
  },
  home_explore_us: {
    fontFamily: 'Roboto-Bold',
    fontSize: moderateScale(18),
  },
  home_explore_book: {
    fontFamily: 'Roboto-Bold',
    backgroundColor: AppColors.WHITE,
    fontSize: moderateScale(11),
  },
  book_view_style: {
    backgroundColor: AppColors.WHITE,
    // width: scale(65),
    padding: scale(5),
    borderRadius: scale(5),
    alignSelf: 'flex-start',
  },
});
