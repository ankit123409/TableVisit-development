import {Instance, SnapshotOut, types} from "mobx-state-tree"

export const PolicyModel = types.model("Policy").props({
    id: types.maybe(types.number),
    detail: types.maybeNull(types.string),
    policy_type: types.maybeNull(types.number),
    place_id: types.maybeNull(types.number),
})

type PolicyType = Instance<typeof PolicyModel>

export interface Policy extends PolicyType {
}

type PolicySnapshotType = SnapshotOut<typeof PolicyModel>

export interface PolicySnapshot extends PolicySnapshotType {
}

export const createPolicyDefaultModel = () => types.optional(PolicyModel, {})
