import {Instance, SnapshotOut, types} from "mobx-state-tree"
import {withEnvironment} from "../extensions/with-environment"
import {NotificationApi} from "../../services/api";

export const NotificationStoreModel = types
    .model("NotificationStore")
    .props({})
    .extend(withEnvironment)
    .actions((self) => ({}))
    .actions((self) => ({
        send: async () => {
            const api = new NotificationApi(self.environment.api)
            const result = await api.send()

            if (result.kind === "ok") {

            } else {
                __DEV__ && console.log(result.kind)
            }
        },
    }))

type NotificationStoreType = Instance<typeof NotificationStoreModel>

export interface NotificationStore extends NotificationStoreType {
}

type NotificationStoreSnapshotType = SnapshotOut<typeof NotificationStoreModel>

export interface NotificationStoreSnapshot extends NotificationStoreSnapshotType {
}

export const createNotificationStoreDefaultModel = () => types.optional(NotificationStoreModel, {})
