import { Instance, SnapshotOut, types } from 'mobx-state-tree';
import { PlaceDetailModel } from '../place-detail-model/place-detail-model';

export const PlaceModel = types.model('Place').props({
  id: types.maybe(types.number),
  name: types.maybe(types.string),
  image_path: types.maybeNull(types.string),
  large_image_path: types.maybeNull(types.string),
  floor_plan_path: types.maybeNull(types.string),
  food_menu_path: types.maybeNull(types.string),
  image: types.maybeNull(types.string),
  address: types.maybeNull(types.string),

  location_lat: types.maybeNull(types.number),
  location_lng: types.maybeNull(types.number),

  display_order: types.maybe(types.number),
  city_id: types.maybe(types.number),
  state_id: types.maybeNull(types.number),
  open: types.maybeNull(types.integer),
  accept_reservations: types.maybeNull(types.integer),
  closed_until: types.maybeNull(types.string),
  open_at: types.maybeNull(types.string),
  close_at: types.maybeNull(types.string),

  place_type_name: types.maybeNull(types.string),
  place_rating_count: types.maybeNull(types.number),
  place_rating_avg: types.maybeNull(types.number),

  detail: types.maybeNull(PlaceDetailModel),
  floor_plan : types.maybeNull(types.string),
  food_menu : types.maybeNull(types.string),
  rel_id: types.maybeNull(types.integer),
  is_favorite: types.maybeNull(types.boolean),
  is_checkedIn : types.maybeNull(types.number)
  /*place_types: types.maybe(types.array(PlaceTypeModel)),
    place_features: types.maybe(types.array(PlaceFeatureModel)),
    place_music: types.maybe(types.array(PlaceMusicModel)),*/
});

type PlaceType = Instance<typeof PlaceModel>;

export interface Place extends PlaceType {}

type PlaceSnapshotType = SnapshotOut<typeof PlaceModel>;

export interface PlaceSnapshot extends PlaceSnapshotType {}

export const createPlaceDefaultModel = () => types.optional(PlaceModel, {});
