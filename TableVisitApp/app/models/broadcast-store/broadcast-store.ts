import {Instance, SnapshotOut, types} from "mobx-state-tree"
import {withEnvironment} from "../extensions/with-environment"
import {BroadcastApi} from "../../services/api";

export const BroadcastStoreModel = types
    .model("BroadcastStore")
    .props({})
    .extend(withEnvironment)
    .actions((self) => ({}))
    .actions((self) => ({
        paymentRequest: async (booking_id: number) => {
            const api = new BroadcastApi(self.environment.api)
            const result = await api.paymentRequest(booking_id)
            if (result.kind === "ok") {

            } else {
                __DEV__ && console.log(result.kind)
            }

            return result.kind;
        },
        messageSent: async (data: any) => {
            console.log(data);
            const api = new BroadcastApi(self.environment.api)
            const result = await api.messageSent(data)
            if (result.kind === "ok") {

            } else {
                __DEV__ && console.log(result.kind)
            }

            return result.kind;
        },
        sendMessage: async (data: any) => {
            console.log("sendMessage",data);
            const api = new BroadcastApi(self.environment.api)
            const result = await api.chatSend(data)
            console.log("result",result)
            if (result.kind === "ok") {

            } else {
                __DEV__ && console.log(result.kind)
            }

            return result;
        },
        getMessage: async (data: any) => {       
            console.log("getChatSend===>",data);     
            const api = new BroadcastApi(self.environment.api)
            const result = await api.getChatSend(data)
            if (result.kind === "ok") {

            } else {
                __DEV__ && console.log(result.kind)
            }

            return result;
        },
    }))

type BroadcastStoreType = Instance<typeof BroadcastStoreModel>

export interface BroadcastStore extends BroadcastStoreType {
}

type BroadcastStoreSnapshotType = SnapshotOut<typeof BroadcastStoreModel>

export interface BroadcastStoreSnapshot extends BroadcastStoreSnapshotType {
}

export const createBroadcastStoreDefaultModel = () => types.optional(BroadcastStoreModel, {})
