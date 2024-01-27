import {Instance, SnapshotOut, types} from "mobx-state-tree"
import {withEnvironment} from "../extensions/with-environment"
import {TwilioApi} from "../../services/api/twilio-api";
import {KeyValueModel, KeyValueSnapshot} from "../key-value-model/key-value-model";

export const ChatStoreModel = types
    .model("ChatStore")
    .props({
        token: types.optional(types.maybe(KeyValueModel), {}),
    })
    .extend(withEnvironment)
    .actions((self) => ({
        saveToken: (modelSnapshot: KeyValueSnapshot) => {
            self.token = modelSnapshot
        },
    }))
    .actions((self) => ({
        getToken: async () => {
            const api = new TwilioApi(self.environment.api)
            const result = await api.token()

            if (result.kind === "ok") {
                self.saveToken(result.result)
            } else {
                __DEV__ && console.log(result.kind)
            }

            return result.kind;
        },
        sendMessage:async () => {
            const api = new TwilioApi(self.environment.api)
            const result = await api.token()

            if (result.kind === "ok") {
                self.saveToken(result.result)
            } else {
                __DEV__ && console.log(result.kind)
            }

            return result.kind;
        }
    }))

type ChatStoreType = Instance<typeof ChatStoreModel>

export interface ChatStore extends ChatStoreType {
}

type ChatStoreSnapshotType = SnapshotOut<typeof ChatStoreModel>

export interface ChatStoreSnapshot extends ChatStoreSnapshotType {
}

export const createChatStoreDefaultModel = () => types.optional(ChatStoreModel, {})
