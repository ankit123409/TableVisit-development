import { Instance, SnapshotOut, types } from 'mobx-state-tree';

const FromUserModal = types.model('FromUserModal').props({
  id: types.maybeNull(types.number),
  name: types.maybeNull(types.string),
  last_name: types.maybeNull(types.string),
  email: types.maybeNull(types.string),
  email_verified_at: types.maybeNull(types.string),
  dob: types.maybeNull(types.string),
  gender: types.maybeNull(types.number),
  mobile_number: types.maybeNull(types.string),
  avatar: types.maybeNull(types.string),
  apple_id: types.maybeNull(types.string),
  device_key: types.maybeNull(types.string),
  auth_mode: types.maybeNull(types.number),
  auth_data: types.maybeNull(types.string),
  payment_data: types.maybeNull(types.string),
  timezone: types.maybeNull(types.string),
  timezone_offset: types.maybeNull(types.string),
  user_type_id: types.maybeNull(types.number),
  place_id: types.maybeNull(types.number),
  tenant_id: types.maybeNull(types.number),
  published: types.maybeNull(types.number),
  deleted: types.maybeNull(types.number),
  otp: types.maybeNull(types.number),
  otp_verify_status: types.maybeNull(types.number),
});
const ToUserModal = types.model('ToUserModal').props({
  id: types.maybeNull(types.number),
  name: types.maybeNull(types.string),
  last_name: types.maybeNull(types.string),
  email: types.maybeNull(types.string),
  email_verified_at: types.maybeNull(types.string),
  dob: types.maybeNull(types.string),
  gender: types.maybeNull(types.number),
  mobile_number: types.maybeNull(types.string),
  avatar: types.maybeNull(types.string),
  apple_id: types.maybeNull(types.string),
  device_key: types.maybeNull(types.string),
  auth_mode: types.maybeNull(types.number),
  auth_data: types.maybeNull(types.string),
  payment_data: types.maybeNull(types.string),
  timezone: types.maybeNull(types.string),
  timezone_offset: types.maybeNull(types.string),
  user_type_id: types.maybeNull(types.number),
  place_id: types.maybeNull(types.number),
  tenant_id: types.maybeNull(types.number),
  published: types.maybeNull(types.number),
  deleted: types.maybeNull(types.number),
  otp: types.maybeNull(types.number),
  otp_verify_status: types.maybeNull(types.number),
});
const TableModal = types.model('TableModal').props({
  id: types.maybeNull(types.number),
  name: types.maybeNull(types.string),
  additional_info: types.maybeNull(types.string),
  table_number: types.maybeNull(types.number),
  table_code: types.maybeNull(types.string),
  minimum_spend: types.maybeNull(types.string),
  guests_count: types.maybeNull(types.number),
  display_order: types.maybeNull(types.number),
  table_status: types.maybeNull(types.string),
  next_booking: types.maybeNull(types.string),
  show: types.maybeNull(types.number),
  table_type_id: types.maybeNull(types.number),
  place_id: types.maybeNull(types.number),
  tenant_id: types.maybeNull(types.number),
  published: types.maybeNull(types.number),
  deleted: types.maybeNull(types.number),
});

export const BookingChatModel = types.model('BookingChat').props({
  type: types.maybeNull(types.string),
  booking_id: types.maybeNull(types.number),
  code: types.maybeNull(types.string),
  name: types.maybeNull(types.string),
  image_path: types.maybeNull(types.string),
  message: types.maybeNull(types.string),
  created_at: types.maybeNull(types.string),
  table_id: types.maybeNull(types.number),
  table: TableModal,
  to_user: ToUserModal,
  from_user: types.maybeNull(FromUserModal),
});

type BookingChatType = Instance<typeof BookingChatModel>;

export interface BookingChat extends BookingChatType {}

type BookingChatSnapshotType = SnapshotOut<typeof BookingChatModel>;

export interface BookingChatSnapshot extends BookingChatSnapshotType {}

export const createBookingChatDefaultModel = () =>
  types.optional(BookingChatModel, {});
