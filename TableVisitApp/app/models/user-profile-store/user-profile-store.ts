import {Instance, SnapshotOut, types} from "mobx-state-tree"
import {withEnvironment} from "../extensions/with-environment"
import {UserProfileApi} from "../../services/api";
import {UserProfileModel, UserProfileSnapshot} from "../user-profile-model/user-profile-model";

export const UserProfileStoreModel = types
    .model("UserProfileStore")
    .props({
        profile: types.optional(types.maybe(UserProfileModel), {}),
    })
    .extend(withEnvironment)
    .actions((self) => ({
        save: (modelSnapshot: UserProfileSnapshot) => {
            self.profile = modelSnapshot
        },
    }))
    .actions((self) => ({
        getUserProfile: async () => {
            const api = new UserProfileApi(self.environment.api)
            const result = await api.getUserProfile()

            if (result.kind === "ok") {
                self.save(result.profile)
            } else {
                __DEV__ && console.log(result.kind)
            }

            return result.kind;
        },
        uploadGovernmentId: async (file: string) => {
            const api = new UserProfileApi(self.environment.api)
            const result = await api.uploadGovernmentId(file)

            if (result.kind === "ok") {
                return result.result;
            } else {
                __DEV__ && console.tron.log(result.kind)
                return null;
            }
        },
        saveGovernmentId: async (government_data: any) => {
            const api = new UserProfileApi(self.environment.api)
            const result = await api.saveGovernmentId(government_data)

            if (result.kind === "ok") {
                return result.result;
            } else {
                __DEV__ && console.log(result.kind)
            }

            return result.kind;
        },
    }))

type UserProfileStoreType = Instance<typeof UserProfileStoreModel>

export interface UserProfileStore extends UserProfileStoreType {
}

type UserProfileStoreSnapshotType = SnapshotOut<typeof UserProfileStoreModel>

export interface UserProfileStoreSnapshot extends UserProfileStoreSnapshotType {
}

export const createUserProfileStoreDefaultModel = () => types.optional(UserProfileStoreModel, {})
