import { Instance, SnapshotOut, types } from 'mobx-state-tree';

export const TableSpendModel = types.model('TableSpend').props({
  id: types.maybe(types.number),
  amount: types.maybeNull(types.string),
  tax_amount: types.maybeNull(types.string),
  quantity: types.maybeNull(types.number),
  total_tax_amount: types.maybeNull(types.string),
  total_amount: types.maybeNull(types.string),
  user_id: types.maybeNull(types.number),
  booking_id: types.maybeNull(types.number),
  service_id: types.maybeNull(types.number),
  table_id: types.maybeNull(types.number),
  place_id: types.maybeNull(types.number),
  service_name: types.maybeNull(types.string),
  published: types.maybeNull(types.number),
  deleted: types.maybeNull(types.number),
  service_type: types.maybeNull(types.string),
});


type TableSpendType = Instance<typeof TableSpendModel>;

export interface TableSpend extends TableSpendType {}

type TableSpendSnapshotType = SnapshotOut<typeof TableSpendModel>;

export interface TableSpendSnapshot extends TableSpendSnapshotType {}

export const createTableSpendDefaultModel = () =>
  types.optional(TableSpendModel, {});
