import { observer } from 'mobx-react-lite';
import { FAB, Paragraph } from 'react-native-paper';
import * as React from 'react';
import { AppColors, AppStyles } from '../../theme';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { DialogLoadingIndicator, Screen, ScreenBack } from '../../components';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { load, save, SELECTED_PLACE, USER_LOCATION } from '../../utils/storage';
import { PlaceMapCard } from '../../components/card/place-map-card';
import { useStores } from '../../models';
import { FlatList, StyleSheet, View } from 'react-native';
import { RootNavigation } from '../../navigators';

export const MapScreen = observer(function MapScreen() {
  const navigation = useNavigation();

  const [loading, setLoading] = useState<boolean>(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [map, setMap] = useState(null);
  const [location, setLocation] = useState(null);

  const { placeStore } = useStores();
  const { near_by_city, near_by_cities } = placeStore;

  const [data, setData] = useState([]);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let temp_location = await load(USER_LOCATION);
      if (temp_location) {
        setLocation(temp_location);
        // await placeStore.getNearByCity(4228);
        await placeStore.getNearByCities();

        if (near_by_cities.length > 0) {
          setData(near_by_cities);
          const for_map = near_by_cities.filter(
            (x) => x.location_lat !== null && x.location_lng !== null
          );
          setMarkers(for_map);
        } else {
          setData([]);
          setMarkers([]);
        }
      }
    };

    fetchData().then(async () => {});

    return () => {};
  }, []);

  const latitudeDelta = 0.0922;
  const longitudeDelta = 0.0421;

  console.log("location_lat", markers)
  const onMapReady = async () => {
    setLoading(true);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLoading(false);
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      console.log('status,,', currentLocation, location);
      setCurrentLocation(currentLocation);

      if (location) {
        if (location.latitude && location.longitude)
          map.animateToRegion({
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: latitudeDelta,
            longitudeDelta: longitudeDelta,
          });
        else if (currentLocation)
          map.animateToRegion({
            latitude: currentLocation ? currentLocation.coords.latitude : 0,
            longitude: currentLocation ? currentLocation.coords.longitude : 0,
            latitudeDelta: latitudeDelta,
            longitudeDelta: longitudeDelta,
          });
      }
    } catch (e) {
      console.warn(e);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentLocation = async () => {
    if (currentLocation) {
      __DEV__ ? console.log(currentLocation) : null;
      map.animateToRegion({
        latitude: currentLocation ? currentLocation.coords.latitude : 0,
        longitude: currentLocation ? currentLocation.coords.longitude : 0,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  };

  // console.log('Data...', data);
  return (
    <>
      {/* <Screen style={[AppStyles.container, { backgroundColor: AppColors.BG }]}>
        <View style={styles.container}>
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            region={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
          ></MapView>
        </View>
      </Screen> */}
      <ScreenBack style={[AppStyles.wrapper, { backgroundColor: AppColors.BG }]}>
        <Paragraph style={AppStyles.modal_title}>
          {location ? location.name : 'Discover'}
        </Paragraph>
        <MapView
          ref={(ref) => {
            setMap(ref);
          }}
          onMapReady={() => {
            onMapReady().then();
          }}
          initialRegion={{
            latitude: 40.73061,
            longitude: -73.935242,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          provider={PROVIDER_GOOGLE}
          style={AppStyles.map_google}
        >
          {markers.map((item, index) => {
            return (
              <Marker
                coordinate={{
                  latitude: item.location_lat,
                  longitude: item.location_lng,
                }}
                onPress={async () => {
                  await save(SELECTED_PLACE, item);
                  RootNavigation.navigate('detail');
                }}
                key={index}
                title={item.name}
                description={item.address}
              />
            );
          })}
        </MapView>

        <FAB
          style={AppStyles.fab_top}
          color={AppColors.WHITE}
          icon="close"
          small
          onPress={() => navigation.goBack()}
        />

        <FlatList
          style={{ flex: 1, paddingVertical: 15 }}
          horizontal
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={data}
          renderItem={({ item, index }) => <PlaceMapCard place={item} />}
          keyExtractor={(item) => item.name}
        />

        <FAB
          style={AppStyles.fab_current_location}
          color={AppColors.LOGO_COLOR}
          icon="image-filter-center-focus-weak"
          onPress={getCurrentLocation}
        />

        <FAB
          style={AppStyles.fab_map_filters}
          color={AppColors.WHITE}
          icon="tune"
          label={'Filters'}
          uppercase={false}
          small
          onPress={() => navigation.goBack()}
        />
      </ScreenBack>

      <DialogLoadingIndicator visible={loading} />
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 800,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
