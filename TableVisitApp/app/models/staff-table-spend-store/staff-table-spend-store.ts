import { Instance, SnapshotOut, types } from 'mobx-state-tree';
import { withEnvironment } from '../extensions/with-environment';
import { StaffTableSpendApi } from '../../services/api/staff-table-spend-api';
import { TableSpendModel, TableSpendSnapshot } from '../table-spend-model/staff-table-spend-model';

export const StaffTableSpendStoreModel = types
  .model('StaffTableSpendStore')
  .props({
    bottle_table_spends: types.optional(types.array(TableSpendModel), []),
    food_table_spends: types.optional(types.array(TableSpendModel), []),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    saveStaffTableSpends: (modelSnapshots: TableSpendSnapshot[]) => {
      self.bottle_table_spends.replace(modelSnapshots);
    },
    saveFoodStaffTableSpends: (modelSnapshots: TableSpendSnapshot[]) => {
      self.food_table_spends.replace(modelSnapshots);
    },
  }))
  .actions((self) => ({
    getStaffTableSpends: async (data: any) => {
      const api = new StaffTableSpendApi(self.environment.api);
      const result = await api.getStaffTableSpends(data);

      if (result.kind === 'ok') {
        self.saveStaffTableSpends(result.table_spends?.bottle || []);
        self.saveFoodStaffTableSpends(result.table_spends?.food || []);
      } else {
        __DEV__ && console.log(result.kind);
      }

      return result.kind;
    },
    getTableBookingDetail: async (data: any) => {
      const api = new StaffTableSpendApi(self.environment.api);
      const result = await api.getTableBookingDetail(data);

      if (result.kind === 'ok') {
        return result;
      } else {
        __DEV__ && console.log(result.kind);
      }

      return result.kind;
    },
  }));

type StaffTableSpendStoreType = Instance<typeof StaffTableSpendStoreModel>;

export interface StaffTableSpendStore extends StaffTableSpendStoreType {}

type StaffTableSpendStoreSnapshotType = SnapshotOut<
  typeof StaffTableSpendStoreModel
>;

export interface StaffTableSpendStoreSnapshot
  extends StaffTableSpendStoreSnapshotType {}

export const createStaffTableSpendStoreDefaultModel = () =>
  types.optional(StaffTableSpendStoreModel, {});
