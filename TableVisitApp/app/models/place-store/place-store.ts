import { Instance, SnapshotOut, types } from 'mobx-state-tree';
import { withEnvironment } from '../extensions/with-environment';
import { PlaceModel, PlaceSnapshot } from '../place-model/place-model';
import { PlaceApi } from '../../services/api';

export const PlaceStoreModel = types
  .model('PlaceStore')
  .props({
    place: types.optional(types.maybe(PlaceModel), {}),
    places: types.optional(types.array(PlaceModel), []),
    near_by_city: types.optional(types.array(PlaceModel), []),
    near_by_cities: types.optional(types.array(PlaceModel), []),
    featured_by_city: types.optional(types.array(PlaceModel), []),
    featured_places: types.optional(types.array(PlaceModel), []),
    near_places: types.optional(types.array(PlaceModel), []),
    search_places: types.optional(types.array(PlaceModel), []),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    saveNearByCity: (modelSnapshots: PlaceSnapshot[]) => {
      self.near_by_city.replace(modelSnapshots);
    },
    saveNearByCities: (modelSnapshots: PlaceSnapshot[]) => {
      self.near_by_cities.replace(modelSnapshots);
    },
    saveFeaturedByCity: (modelSnapshots: PlaceSnapshot[]) => {
      self.featured_by_city.replace(modelSnapshots);
    },
    saveFeaturedPlaces: (modelSnapshots: PlaceSnapshot[]) => {
      self.featured_places.replace(modelSnapshots);
    },
    saveNearPlaces: (modelSnapshots: PlaceSnapshot[]) => {
      self.near_places.replace(modelSnapshots);
    },
    savePlace: (modelSnapshot: PlaceSnapshot) => {
      self.place = modelSnapshot;
    },
    saveSearchPlaces: (modelSnapshots: PlaceSnapshot[]) => {
      self.search_places.replace(modelSnapshots);
    },
  }))
  .actions((self) => ({
    getNearByCity: async (city_id) => {
      const api = new PlaceApi(self.environment.api);

      const result = await api.getNearByCity(city_id);

      if (result.kind === 'ok') {
        self.saveNearByCity(result.near_by_city);
      } else {
        __DEV__ && console.log(result.kind);
      }

      return result.kind;
    },
    getNearByCities: async () => {
      const api = new PlaceApi(self.environment.api);

      const result = await api.getNearByCities();

      if (result.kind === 'ok') {
        self.saveNearByCities(result.near_by_city);
      } else {
        __DEV__ && console.log(result.kind);
      }

      return result.kind;
    },
  getFeaturedByCity: async (city_id) => {
      const api = new PlaceApi(self.environment.api);
      console.log('city,,,', city_id);
      const result = await api.getFeaturedByCity(city_id);
      if (result.kind === 'ok') {
        self.saveFeaturedByCity(result.featured_by_city);
      } else {
        __DEV__ && console.log(result.kind);
      }

      return result.kind;
    },
    getFeaturedPlaces: async () => {
      const api = new PlaceApi(self.environment.api);
      const result = await api.getFeatured();

      if (result.kind === 'ok') {
        self.saveFeaturedPlaces(result.featured_places);
      } else {
        __DEV__ && console.log(result.kind);
      }

      return result.kind;
    },
    getNearPlaces: async () => {
      const api = new PlaceApi(self.environment.api);
      const result = await api.getNear();

      if (result.kind === 'ok') {
        self.saveNearPlaces(result.near_places);
      } else {
        __DEV__ && console.log(result.kind);
      }

      return result.kind;
    },
    getPlace: async (id) => {
      const api = new PlaceApi(self.environment.api);
      const result = await api.getPlace(id);

      if (result.kind === 'ok') {
        self.savePlace(result.place);
      } else {
        __DEV__ && console.log(result.kind);
      }

      return result.kind;
    },
    getSearchPlaces: async (word: string, city_id: number) => {
      const api = new PlaceApi(self.environment.api);
      const result = await api.getSearch(word, city_id);

      if (result.kind === 'ok') {
        self.saveSearchPlaces(result.search_places);
      } else {
        __DEV__ && console.log(result.kind);
      }

      return result.kind;
    },
    postCheckIn: async (data: any) => {
      const api = new PlaceApi(self.environment.api);
      const result = await api.checkIn(data);

      if (result.kind === 'ok') {
      } else {
        __DEV__ && console.log(result.kind);
      }

      return result;
    },
  }));

type PlaceStoreType = Instance<typeof PlaceStoreModel>;

export interface PlaceStore extends PlaceStoreType {}

type PlaceStoreSnapshotType = SnapshotOut<typeof PlaceStoreModel>;

export interface PlaceStoreSnapshot extends PlaceStoreSnapshotType {}

export const createPlaceStoreDefaultModel = () =>
  types.optional(PlaceStoreModel, {});
