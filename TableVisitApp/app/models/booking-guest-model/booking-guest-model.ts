import {Instance, SnapshotOut, types} from "mobx-state-tree"

export const BookingGuestModel = types.model("BookingGuest").props({
    id: types.maybe(types.number),
    name: types.maybeNull(types.string),
    email: types.maybeNull(types.string),
    phone: types.maybeNull(types.string),
    comment: types.maybeNull(types.string),
    booking_id: types.maybeNull(types.number),
    place_id: types.maybeNull(types.number),
    table_id: types.maybeNull(types.number),
})

type BookingGuestType = Instance<typeof BookingGuestModel>

export interface BookingGuest extends BookingGuestType {
}

type BookingGuestSnapshotType = SnapshotOut<typeof BookingGuestModel>

export interface BookingGuestSnapshot extends BookingGuestSnapshotType {
}

export const createBookingGuestDefaultModel = () => types.optional(BookingGuestModel, {})
