import { Instance, SnapshotOut, types } from 'mobx-state-tree';
import { withEnvironment } from '../extensions/with-environment';
import {
  ServiceRateModel,
  ServiceRateSnapshot,
} from '../service-rate-model/service-rate-model';
import { ServiceApi } from '../../services/api';
import {
  ServiceRateFoodModel,
  ServiceRateFoodSnapshot,
} from '../service-rate-food-model/service-rate-food-model';

export const ServiceStoreModel = types
  .model('ServiceStore')
  .props({
    rates: types.optional(types.array(ServiceRateModel), []),
    foodRates: types.optional(types.array(ServiceRateFoodModel), []),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    saveRates: (modelSnapshots: ServiceRateSnapshot[]) => {
      self.rates.replace(modelSnapshots);
    },
    saveFoodRates: (modelSnapshots: ServiceRateFoodSnapshot[]) => {
      self.foodRates.replace(modelSnapshots);
    },
  }))
  .actions((self) => ({
    getRates: async (place_id) => {
      const api = new ServiceApi(self.environment.api);
      const result = await api.getRates(place_id);
      if (result.kind === 'ok') {
        self.saveRates(result.rates?.drinks);
        self.saveFoodRates(result.rates?.foods);
      } else {
        __DEV__ && console.tron.log(result.kind);
      }
    },
    getFoodMenu: async (place_id: any) => {
      const api = new ServiceApi(self.environment.api);
      const result = await api.getFoodMenu(place_id);
      if (result.kind === 'ok') {
        return result
       
      } else {
        __DEV__ && console.tron.log(result.kind);
      }
    },
    getBottleMenu: async (place_id: any) => {
      const api = new ServiceApi(self.environment.api);
      const result = await api.getBottleMenu(place_id);
      if (result.kind === 'ok') {
        return result
       
      } else {
        __DEV__ && console.tron.log(result.kind);
      }
    },



  }));

type ServiceStoreType = Instance<typeof ServiceStoreModel>;

export interface ServiceStore extends ServiceStoreType {}

type ServiceStoreSnapshotType = SnapshotOut<typeof ServiceStoreModel>;

export interface ServiceStoreSnapshot extends ServiceStoreSnapshotType {}

export const createServiceStoreDefaultModel = () =>
  types.optional(ServiceStoreModel, {});
