import {Instance, SnapshotOut, types} from "mobx-state-tree"
import {withEnvironment} from "../extensions/with-environment"
import {UserSettingModel, UserSettingSnapshot} from "../user-setting-model/user-setting-model";
import {UserSettingApi} from "../../services/api";

export const UserSettingStoreModel = types
    .model("UserSettingStore")
    .props({
        user_settings: types.optional(types.array(UserSettingModel), []),
    })
    .extend(withEnvironment)
    .actions((self) => ({
        saveUserSettings: (modelSnapshots: UserSettingSnapshot[]) => {
            self.user_settings.replace(modelSnapshots)
        },
    }))
    .actions((self) => ({
        getUserSettings: async () => {
            const api = new UserSettingApi(self.environment.api)
            const result = await api.getUserSettings()

            if (result.kind === "ok") {
                self.saveUserSettings(result.user_settings)
            } else {
                __DEV__ && console.log(result.kind)
            }

            return result;
        },
        saveUserSetting: async (data: any) => {
            const api = new UserSettingApi(self.environment.api)
            const result = await api.saveUserSetting(data)

            if (result.kind === "ok") {

            } else {
                __DEV__ && console.tron.log(result.kind)
            }

            return result;
        },
    }))

type UserSettingStoreType = Instance<typeof UserSettingStoreModel>

export interface UserSettingStore extends UserSettingStoreType {
}

type UserSettingStoreSnapshotType = SnapshotOut<typeof UserSettingStoreModel>

export interface UserSettingStoreSnapshot extends UserSettingStoreSnapshotType {
}

export const createUserSettingStoreDefaultModel = () => types.optional(UserSettingStoreModel, {})
