import { Instance, SnapshotOut, types } from 'mobx-state-tree';
import { withEnvironment } from '../extensions/with-environment';
import {
  BookingChatModel,
  BookingChatSnapshot,
} from '../booking-chat-model/booking-chat-model';
import { BookingChatApi } from '../../services/api/booking-chat-api';

export const BookingChatStoreModel = types
  .model('BookingChatStore')
  .props({
    chats: types.optional(types.array(BookingChatModel), []),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    saveBookingChats: (modelSnapshots: BookingChatSnapshot[]) => {
      self.chats.replace(modelSnapshots);
    },
  }))
  .actions((self) => ({
    getBookingChats: async () => {
      const api = new BookingChatApi(self.environment.api);
      const result = await api.getBookingChats();

      if (result.kind === 'ok') {
        self.saveBookingChats(result.chats);
      } else {
        __DEV__ && console.log(result.kind);
      }

      return result;
    },
    saveBookingChat: async (data: any) => {
      const api = new BookingChatApi(self.environment.api);
      const result = await api.saveBookingChat(data);

      if (result.kind === 'ok') {
      } else {
        __DEV__ && console.tron.log(result.kind);
      }

      return result;
    },
    inboxApi: async () => {
      const api = new BookingChatApi(self.environment.api);
      const result = await api.getInboxData();
      if (result.kind === 'ok') {
        self.saveBookingChats(result.result.data);
      } else {
        __DEV__ && console.log(result.kind);
      }

      return result.result.data;
    },
  }));

type BookingChatStoreType = Instance<typeof BookingChatStoreModel>;

export interface BookingChatStore extends BookingChatStoreType {}

type BookingChatStoreSnapshotType = SnapshotOut<typeof BookingChatStoreModel>;

export interface BookingChatStoreSnapshot
  extends BookingChatStoreSnapshotType {}

export const createBookingChatStoreDefaultModel = () =>
  types.optional(BookingChatStoreModel, {});
