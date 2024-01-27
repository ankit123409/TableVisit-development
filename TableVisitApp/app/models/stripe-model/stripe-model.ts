import {Instance, SnapshotOut, types} from "mobx-state-tree"

export const StripeModel = types.model("Stripe").props({
    paymentIntent: types.maybe(types.string),
    ephemeralKey: types.maybe(types.string),
    customer: types.maybe(types.string),
})

type StripeType = Instance<typeof StripeModel>

export interface Stripe extends StripeType {
}

type StripeSnapshotType = SnapshotOut<typeof StripeModel>

export interface StripeSnapshot extends StripeSnapshotType {
}

export const createStripeDefaultModel = () => types.optional(StripeModel, {})
