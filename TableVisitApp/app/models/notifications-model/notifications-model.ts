import { Instance, SnapshotOut, types } from 'mobx-state-tree';

const TableModel = types.model('Table').props({
  id: types.maybe(types.number),
  name: types.maybeNull(types.string),
  table_number: types.maybeNull(types.number),
  table_code: types.maybeNull(types.string),
  minimum_spend: types.maybeNull(types.string),
  guests_count: types.maybeNull(types.number),
  table_type_id: types.maybeNull(types.number),
  table_type_name: types.maybeNull(types.string),
  place_id: types.maybeNull(types.number),
});

const UserModal = types.model('User').props({
  id: types.maybe(types.number),
  name: types.maybeNull(types.string),
  last_name: types.maybeNull(types.string),
  email: types.maybeNull(types.string),
  email_verified_at: types.maybeNull(types.string),
  dob: types.maybeNull(types.string),
  gender: types.maybeNull(types.number),
  mobile_number: types.maybeNull(types.string),
  avatar: types.maybeNull(types.string),
  apple_id: types.maybeNull(types.string),
});

const BookingModel = types.model('Booking').props({
  user: UserModal,
});

export const NotificationsModel = types.model('Notifications').props({
  id: types.maybe(types.number),
  date: types.maybe(types.string),
  notification_text: types.maybe(types.string),
  notification_type: types.maybe(types.number),
  external_name: types.maybe(types.string),
  external_code: types.maybe(types.string),
  notification_status: types.maybe(types.number),
  booking_id: types.maybe(types.number),
  place_id: types.maybe(types.number),
  table_id: types.maybeNull(types.number),
  published: types.maybe(types.number),
  deleted: types.maybe(types.number),
  table: TableModel,
  booking: BookingModel,
});

type NotificationsType = Instance<typeof NotificationsModel>;

export interface Notifications extends NotificationsType {}

type NotificationsSnapshotType = SnapshotOut<typeof NotificationsModel>;

export interface NotificationsSnapshot extends NotificationsSnapshotType {}

export const createNotificationsDefaultModel = () =>
  types.optional(NotificationsModel, {});
