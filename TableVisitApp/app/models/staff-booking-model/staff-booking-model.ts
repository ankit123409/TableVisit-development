import { Instance, SnapshotOut, types } from 'mobx-state-tree';
import { TableModel } from '../table-model/table-model';

export const StaffBookingModel = types.model('StaffBooking').props({
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

  // Custom
  table: types.maybeNull(TableModel),
  customer_name: types.maybeNull(types.string),
  customer_last_name: types.maybeNull(types.string),
  customer_avatar: types.maybeNull(types.string),

  amount_to_pay: types.maybeNull(types.string),
  closed_at: types.maybeNull(types.string),
  paid: types.maybeNull(types.boolean),
});

type StaffBookingType = Instance<typeof StaffBookingModel>;

export interface StaffBooking extends StaffBookingType {}

type StaffBookingSnapshotType = SnapshotOut<typeof StaffBookingModel>;

export interface StaffBookingSnapshot extends StaffBookingSnapshotType {}

export const createStaffBookingDefaultModel = () =>
  types.optional(StaffBookingModel, {});

export interface StaffBookingRequestListType {
  pending: {
    id: number;
    request_type: number;
    place_id: number;
    table_id: number;
    customer_id: number;
    staff_id: number | null;
    request_status: string;
    booking_id: number;
    song_name: null;
    artist_name: null;
    tip: null;
    tenant_id: number;
    closed_by_user: null;
    is_closed: number;
    date: string;
    created_at: string;
    updated_at: string;
    table: {
      id: number;
      name: string;
      additional_info: null;
      table_number: number;
      table_code: null;
      minimum_spend: string;
      guests_count: number;
      display_order: number;
      table_status: null;
      next_booking: null;
      show: number;
      table_type_id: number;
      place_id: number;
      tenant_id: number;
      published: number;
      deleted: number;
    };
    customer: {
      id: number;
      name: string;
      last_name: string;
      email: string;
      email_verified_at: string;
      dob: string;
      gender: number;
      mobile_number: null;
      avatar: string;
      apple_id: number | null;
      device_key: null;
      auth_mode: number;
      auth_data: null;
      payment_data: null;
      timezone: null;
      timezone_offset: null;
      user_type_id: number;
      place_id: null;
      tenant_id: number;
      published: number;
      deleted: number;
      otp: number;
      otp_verify_status: number;
    };
    booking: {
      id: number;
      code: string;
      amount: string;
      tax_amount: string;
      total_amount: string;
      gratuity_amount: null;
      spent_amount: string;
      spent_tax: string;
      spent_gratuity: string;
      spent_total_amount: string;
      paid_amount: string;
      guests_count: number;
      book_date: string;
      special_comment: string | null;
      booking_status: number;
      payment_method: string | null;
      confirmation_code: string;
      canceled_at: string | null;
      approved_at: string;
      closed_at: string;
      user_id: number;
      table_id: number;
      table_rate_id: number;
      place_id: number;
      tenant_id: number;
      closed_by_user_id: number;
      published: number;
      deleted: number;
    };
  }[];
  accepted: {
    id: number;
    request_type: number;
    place_id: number;
    table_id: number;
    customer_id: number;
    staff_id: number;
    request_status: string;
    booking_id: number;
    song_name: null;
    artist_name: null;
    tip: null;
    tenant_id: number;
    closed_by_user: null;
    is_closed: number;
    date: string;
    created_at: string;
    updated_at: string;
    place: {
      id: number;
      name: string;
      image_path: string;
      floor_plan_path: string;
      food_menu_path: string;
      address: string;
      location_lat: null;
      location_lng: null;
      display_order: number;
      open_at: number;
      close_at: number;
      closed_until: null;
      city_id: number;
      state_id: number;
      open: number;
      accept_reservations: number;
      tenant_id: number;
      show: number;
      published: number;
      deleted: number;
    };
    table: {
      id: number;
      name: string;
      additional_info: null;
      table_number: number;
      table_code: null;
      minimum_spend: string;
      guests_count: number;
      display_order: number;
      table_status: null;
      next_booking: null;
      show: number;
      table_type_id: number;
      place_id: number;
      tenant_id: number;
      published: number;
      deleted: number;
    };
    customer: {
      id: number;
      name: string;
      last_name: string;
      email: string;
      email_verified_at: null;
      dob: null;
      gender: number;
      mobile_number: null;
      avatar: string;
      apple_id: null;
      device_key: string;
      auth_modenumber;
      auth_data: null;
      payment_data: null;
      timezone: null;
      timezone_offset: null;
      user_type_id: number;
      place_id: null;
      tenant_id: null;
      published: number;
      deleted: number;
      otp: number;
      otp_verify_status: number;
    };
    booking: {
      id: number;
      code: string;
      amount: string;
      tax_amount: string;
      total_amount: string;
      gratuity_amount: string;
      spent_amount: string;
      spent_tax: string;
      spent_gratuity: string;
      spent_total_amount: string;
      paid_amount: string;
      guests_count: number;
      book_date: string;
      special_comment: null;
      booking_status: number;
      payment_method: null;
      confirmation_code: string;
      canceled_at: null;
      approved_at: string;
      closed_at: null;
      user_id: number;
      table_id: number;
      table_rate_id: number;
      place_id: number;
      tenant_id: number;
      closed_by_user_id: null;
      published: number;
      deleted: number;
    };
  }[];
}
