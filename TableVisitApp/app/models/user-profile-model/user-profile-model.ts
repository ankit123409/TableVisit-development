import {Instance, SnapshotOut, types} from "mobx-state-tree"

export const UserProfileModel = types.model("UserProfile").props({
    id: types.maybe(types.number),
    phone_number: types.maybeNull(types.string),
    government_id: types.maybeNull(types.string),
    government_id_type: types.maybeNull(types.number),
    issued_country_id: types.maybeNull(types.number),
    government_id_path: types.maybeNull(types.string),
    approve_user_id: types.maybeNull(types.number),
    approve_date: types.maybeNull(types.string),
    user_id: types.maybeNull(types.number),
})


type UserProfileType = Instance<typeof UserProfileModel>

export interface UserProfile extends UserProfileType {
}

type UserProfileSnapshotType = SnapshotOut<typeof UserProfileModel>

export interface UserProfileSnapshot extends UserProfileSnapshotType {
}

export const createUserProfileDefaultModel = () => types.optional(UserProfileModel, {})
