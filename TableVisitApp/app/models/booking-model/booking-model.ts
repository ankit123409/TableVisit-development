import {Instance, SnapshotOut, types} from "mobx-state-tree"
import {PlaceModel} from "../place-model/place-model";
import {TableModel} from "../table-model/table-model";

export const BookingModel = types.model("Booking").props({
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
    open_at: types.maybeNull(types.string),
    close_at: types.maybeNull(types.string),
    // Custom
    place: types.maybeNull(PlaceModel),
    table: types.maybeNull(TableModel),

    amount_to_pay: types.maybeNull(types.string),
    paid: types.maybeNull(types.boolean),
})

type BookingType = Instance<typeof BookingModel>

export interface Booking extends BookingType {
}

type BookingSnapshotType = SnapshotOut<typeof BookingModel>

export interface BookingSnapshot extends BookingSnapshotType {
}

export const createBookingDefaultModel = () => types.optional(BookingModel, {})
