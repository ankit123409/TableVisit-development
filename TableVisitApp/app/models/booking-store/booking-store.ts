import {Instance, SnapshotOut, types} from "mobx-state-tree"
import {withEnvironment} from "../extensions/with-environment"
import {BookingModel, BookingSnapshot} from "../booking-model/booking-model";
import {BookingApi} from "../../services/api";

export const BookingStoreModel = types
    .model("BookingStore")
    .props({
        bookings: types.optional(types.array(BookingModel), []),
    })
    .extend(withEnvironment)
    .actions((self) => ({
        saveBookings: (modelSnapshots: BookingSnapshot[]) => {
            self.bookings.replace(modelSnapshots)
        },
    }))
    .actions((self) => ({
        getBookings: async () => {
            const api = new BookingApi(self.environment.api)
            const result = await api.getBookings()
            if (result.kind === "ok") {
                self.saveBookings(result.bookings)
            } else {
                __DEV__ && console.log(result.kind)
            }

            return result.kind;
        },
        book: async (obj: any) => {
            const api = new BookingApi(self.environment.api)
            const result = await api.book(obj)

            if (result.kind === "ok") {
                return result.booking;
            } else {
                __DEV__ && console.log(result.kind)
            }

            return null;
        },
        songRequest: async (obj: any) => {
            const api = new BookingApi(self.environment.api)
            const result = await api.songRequest(obj)

            if (result.kind === "ok") {
                return result;
            } else {
                __DEV__ && console.log(result.kind)
            }
            return null;
        },
    }))

type BookingStoreType = Instance<typeof BookingStoreModel>

export interface BookingStore extends BookingStoreType {
}

type BookingStoreSnapshotType = SnapshotOut<typeof BookingStoreModel>

export interface BookingStoreSnapshot extends BookingStoreSnapshotType {
}

export const createBookingStoreDefaultModel = () => types.optional(BookingStoreModel, {})
