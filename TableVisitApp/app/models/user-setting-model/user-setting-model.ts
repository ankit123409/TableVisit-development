import {Instance, SnapshotOut, types} from "mobx-state-tree"

export const UserSettingModel = types.model("UserSetting").props({
    id: types.maybe(types.number),
    setting_type: types.maybeNull(types.number),
    active: types.maybeNull(types.number),
})

type UserSettingType = Instance<typeof UserSettingModel>

export interface UserSetting extends UserSettingType {
}

type UserSettingSnapshotType = SnapshotOut<typeof UserSettingModel>

export interface UserSettingSnapshot extends UserSettingSnapshotType {
}

export const createUserSettingDefaultModel = () => types.optional(UserSettingModel, {})
