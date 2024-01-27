import { Instance, SnapshotOut, types } from 'mobx-state-tree';
import { TableDetailModel } from '../table-detail-model/table-detail-model';

const BookingModel = types.model('Booking').props({
  id: types.maybe(types.number),
  code: types.maybe(types.string),
  book_date: types.maybe(types.string),
  confirmation_code: types.maybe(types.string),
  amount: types.maybeNull(types.string),
  tax_amount: types.maybeNull(types.string),
  total_amount: types.maybeNull(types.string),
  gratuity_amount: types.maybeNull(types.string),
  spent_amount: types.maybeNull(types.string),
  spent_tax: types.maybeNull(types.string),
  spent_gratuity: types.maybeNull(types.string),
  spent_total_amount: types.maybeNull(types.string),
  paid_amount: types.maybeNull(types.string),
  guests_count: types.maybe(types.number),
  booking_status: types.maybeNull(types.number),
  place_id: types.maybe(types.number),
  table_id: types.maybeNull(types.number),
  table_rate_id: types.maybeNull(types.number),
  is_past: types.maybeNull(types.boolean),

  paid: types.maybeNull(types.boolean),
});

export const TableModel = types.model('Table').props({
  id: types.maybe(types.number),
  name: types.maybeNull(types.string),
  table_number: types.maybeNull(types.number),
  table_code: types.maybeNull(types.string),
  minimum_spend: types.maybeNull(types.string),
  guests_count: types.maybeNull(types.number),
  table_type_id: types.maybeNull(types.number),
  table_type_name: types.maybeNull(types.string),
  detail: types.maybeNull(TableDetailModel),
  place_id: types.maybeNull(types.number),
  booking: types.maybeNull(BookingModel),
  is_booked : types.maybeNull(types.number),
  is_checkedIn : types.maybeNull(types.number)
});

type TableType = Instance<typeof TableModel>;

export interface Table extends TableType {}

type TableSnapshotType = SnapshotOut<typeof TableModel>;

export interface TableSnapshot extends TableSnapshotType {}

export const createTableDefaultModel = () => types.optional(TableModel, {});

export type table_details_types = {
  id: number;
  code: string;
  amount: string;
  tax_amount: string;
  total_amount: string;
  gratuity_amount: null | number;
  spent_amount: string;
  spent_tax: string;
  spent_gratuity: string;
  spent_total_amount: string;
  paid_amount: string;
  guests_count: number;
  book_date: string;
  special_comment: null | string;
  booking_status: number;
  payment_method: null | string;
  confirmation_code: string;
  canceled_at: null;
  approved_at: string;
  closed_at: null;
  user_id: number;
  table_id: number;
  table_rate_id: number;
  place_id: number;
  tenant_id: number;
  closed_by_user_id: null | number;
  published: number;
  deleted: number;
};
