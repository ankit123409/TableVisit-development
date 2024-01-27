import {Instance, SnapshotOut, types} from "mobx-state-tree"

export const AuthModel = types.model("Auth").props({
    access_token: types.maybe(types.string),
    token_type: types.maybe(types.string),
})

type AuthType = Instance<typeof AuthModel>

export interface Auth extends AuthType {
}

type AuthSnapshotType = SnapshotOut<typeof AuthModel>

export interface AuthSnapshot extends AuthSnapshotType {
}

export const createAuthDefaultModel = () => types.optional(AuthModel, {})
