import { Instance, SnapshotOut, types } from 'mobx-state-tree';

export const ServiceRateFoodModel = types.model('ServiceRate').props({
  id: types.maybe(types.number),
  name: types.maybeNull(types.string),
  display_order: types.maybe(types.number),
  place_id: types.maybe(types.number),
  show: types.maybe(types.number),
  published: types.maybe(types.number),
  food_service_type_id: types.maybeNull(types.number),
  tenant_id: types.maybeNull(types.number),
  rate: types.maybeNull(types.string),
  tax: types.maybeNull(types.string),
  total_rate: types.maybeNull(types.string),
  valid_from: types.maybeNull(types.string),
  valid_to: types.maybeNull(types.string),
  service_name : types.maybeNull(types.string),
});

type ServiceRateType = Instance<typeof ServiceRateFoodModel>;

export interface ServiceRate extends ServiceRateType {}

type ServiceRateFoodSnapshotType = SnapshotOut<typeof ServiceRateFoodModel>;

export interface ServiceRateFoodSnapshot extends ServiceRateFoodSnapshotType {}

export const createServiceRateDefaultModel = () =>
  types.optional(ServiceRateFoodModel, {});
