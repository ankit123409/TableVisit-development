import { Instance, SnapshotOut, types } from 'mobx-state-tree';
import { withEnvironment } from '../extensions/with-environment';
import { StaffBookingApi } from '../../services/api';
import {
  StaffBookingModel,
  StaffBookingSnapshot,
} from '../staff-booking-model/staff-booking-model';
import {
  NotificationsModel,
  NotificationsSnapshot,
} from '../notifications-model/notifications-model';

export const StaffBookingStoreModel = types
  .model('StaffBookingStore')
  .props({
    inbox_bookings: types.optional(types.array(StaffBookingModel), []),
    assigned_bookings: types.optional(types.array(StaffBookingModel), []),
    booking: types.optional(types.maybeNull(StaffBookingModel), {}),
    bookingRequest: types.optional(types.array(StaffBookingModel), []),
    notifications: types.optional(types.array(NotificationsModel), []),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    saveStaffBookingsInbox: (modelSnapshots: StaffBookingSnapshot[]) => {
      self.inbox_bookings.replace(modelSnapshots);
    },
    saveStaffBookingsAssigned: (modelSnapshots: StaffBookingSnapshot[]) => {
      self.assigned_bookings.replace(modelSnapshots);
    },
    saveStaffBooking: (modelSnapshot: StaffBookingSnapshot) => {
      self.booking = modelSnapshot;
    },
    saveNotifications: (modelSnapshot: StaffBookingSnapshot) => {
      self.booking = modelSnapshot;
    },
    getNotifications: (modelSnapshot: NotificationsSnapshot[]) => {
      self.notifications.replace(modelSnapshot);
    },
  }))
  .actions((self) => ({
    getStaffBookingsInbox: async (search: string) => {
      const api = new StaffBookingApi(self.environment.api);
      const result = await api.getStaffBookingsInbox(search);

      if (result.kind === 'ok') {
        self.saveStaffBookingsInbox(result.inbox_bookings);
      } else {
        __DEV__ && console.log(result);
      }

      return result;
    },
    getStaffBookingsAssigned: async (search: string) => {
      const api = new StaffBookingApi(self.environment.api);
      const result = await api.getStaffBookingsAssigned(search);
      // console.log("resuilt",result.assigned_bookings);
      if (result.kind === 'ok') {
        self.saveStaffBookingsAssigned(result.assigned_bookings);
      } else {
        __DEV__ && console.log(result.kind);
      }

      return result;
    },
    getStaffBooking: async (id: number) => {
      const api = new StaffBookingApi(self.environment.api);
      const result = await api.getStaffBooking(id);

      if (result.kind === 'ok') {
        self.saveStaffBooking(result.booking);
      } else {
        __DEV__ && console.log(result.kind);
      }

      return result.kind;
    },
    assignBooking: async (data: any) => {
      const api = new StaffBookingApi(self.environment.api);
      const result = await api.assignBooking(data);

      if (result.kind === 'ok') {
        return result.result;
      } else {
        __DEV__ && console.log(result);
      }

      return null;
    },
    bookingRequestList: async (data: any) => {
      const api = new StaffBookingApi(self.environment.api);
      const result = await api.bookingRequestList(data);

      if (result.kind === 'ok') {
        // self.getbookingRequest(result.result);
        return result.result;
      } else {
        __DEV__ && console.log(result);
      }

      return null;
    },
    closeBooking: async (data: any) => {
      const api = new StaffBookingApi(self.environment.api);
      const result = await api.closeBooking(data);

      if (result.kind === 'ok') {
        return result.result;
      } else {
        __DEV__ && console.log(result);
      }

      return null;
    },
    cancelBooking: async (data: any) => {
      const api = new StaffBookingApi(self.environment.api);
      const result = await api.cancelBooking(data);

      if (result.kind === 'ok') {
      } else {
        __DEV__ && console.log(result.kind);
      }

      return result;
    },

    getNotifications: async () => {
      const api = new StaffBookingApi(self.environment.api);
      const result = await api.getNotifications();

      if (result.kind === 'ok') {
        self.getNotifications(result.data);
      } else {
        __DEV__ && console.log(result.kind);
      }

      return result;
    },
  }));

type StaffBookingStoreType = Instance<typeof StaffBookingStoreModel>;

export interface StaffBookingStore extends StaffBookingStoreType {}

type StaffBookingStoreSnapshotType = SnapshotOut<typeof StaffBookingStoreModel>;

export interface StaffBookingStoreSnapshot
  extends StaffBookingStoreSnapshotType {}

export const createStaffBookingStoreDefaultModel = () =>
  types.optional(StaffBookingStoreModel, {});
