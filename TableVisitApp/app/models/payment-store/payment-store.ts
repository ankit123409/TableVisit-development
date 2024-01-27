import {Instance, SnapshotOut, types} from "mobx-state-tree"
import {withEnvironment} from "../extensions/with-environment"
import {StripeModel, StripeSnapshot} from "../stripe-model/stripe-model";
import {PaymentApi} from "../../services/api";

export const PaymentStoreModel = types
    .model("PaymentStore")
    .props({
        stripe: types.optional(types.maybe(StripeModel), {}),
    })
    .extend(withEnvironment)
    .actions((self) => ({
        saveStripe: (modelSnapshot: StripeSnapshot) => {
            self.stripe = modelSnapshot
        },
    }))
    .actions((self) => ({
        getStripe: async (amount: number) => {
            const api = new PaymentApi(self.environment.api)
            const result = await api.getStripe(amount)
            console.log("result===>",result);
            if (result.kind === "ok") {
                self.saveStripe(result.stripe)
            } else {
                __DEV__ && console.tron.log(result.kind)
            }
        },
        add: async (data: any) => {
            const api = new PaymentApi(self.environment.api)
            const result = await api.add(data)

            if (result.kind === "ok") {
                return result.result;
            } else {
                __DEV__ && console.log(result.kind)
            }

            return result.kind;
        },
    }))

type PaymentStoreType = Instance<typeof PaymentStoreModel>

export interface PaymentStore extends PaymentStoreType {
}

type PaymentStoreSnapshotType = SnapshotOut<typeof PaymentStoreModel>

export interface PaymentStoreSnapshot extends PaymentStoreSnapshotType {
}

export const createPaymentStoreDefaultModel = () => types.optional(PaymentStoreModel, {})
