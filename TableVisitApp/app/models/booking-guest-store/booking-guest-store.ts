import {Instance, SnapshotOut, types} from "mobx-state-tree"
import {withEnvironment} from "../extensions/with-environment"
import {BookingGuestApi} from "../../services/api";
import {BookingGuestModel, BookingGuestSnapshot} from "../booking-guest-model/booking-guest-model";

export const BookingGuestStoreModel = types
    .model("BookingGuestStore")
    .props({
        booking_guests: types.optional(types.array(BookingGuestModel), []),
    })
    .extend(withEnvironment)
    .actions((self) => ({
        saveBookingGuests: (modelSnapshots: BookingGuestSnapshot[]) => {
            self.booking_guests.replace(modelSnapshots)
        },
    }))
    .actions((self) => ({
        getBookingGuests: async (booking_id: number) => {
            const api = new BookingGuestApi(self.environment.api)
            const result = await api.getBookingGuests(booking_id)
            if (result.kind === "ok") {
                self.saveBookingGuests(result.booking_guests)
            } else {
                __DEV__ && console.log(result.kind)
            }

            return result;
        },
        save: async (data: any) => {
            const api = new BookingGuestApi(self.environment.api)
            const result = await api.save(data)

            if (result.kind === "ok") {

            } else {
                __DEV__ && console.log(result.kind)
            }

            return result;
        },
        remove: async (id: number) => {
            const api = new BookingGuestApi(self.environment.api)
            const result = await api.remove(id)

            if (result.kind === "ok") {

            } else {
                __DEV__ && console.log(result.kind)
            }

            return result;
        },
    }))

type BookingGuestStoreType = Instance<typeof BookingGuestStoreModel>

export interface BookingGuestStore extends BookingGuestStoreType {
}

type BookingGuestStoreSnapshotType = SnapshotOut<typeof BookingGuestStoreModel>

export interface BookingGuestStoreSnapshot extends BookingGuestStoreSnapshotType {
}

export const createBookingGuestStoreDefaultModel = () => types.optional(BookingGuestStoreModel, {})
