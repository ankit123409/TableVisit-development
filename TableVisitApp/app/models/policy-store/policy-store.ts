import {Instance, SnapshotOut, types} from "mobx-state-tree"
import {withEnvironment} from "../extensions/with-environment"
import {PolicyModel, PolicySnapshot} from "../policy-model/policy-model";
import {PolicyApi} from "../../services/api";

export const PolicyStoreModel = types
    .model("PolicyStore")
    .props({
        policies: types.optional(types.array(PolicyModel), []),
        policy: types.optional(types.maybeNull(PolicyModel), {}),
    })
    .extend(withEnvironment)
    .actions((self) => ({
        savePolicies: (modelSnapshots: PolicySnapshot[]) => {
            self.policies.replace(modelSnapshots)
        },
        savePolicy: (modelSnapshot: PolicySnapshot) => {
            self.policy = modelSnapshot
        },
    }))
    .actions((self) => ({
        getPolicies: async (place_id: number) => {
            const api = new PolicyApi(self.environment.api)
            const result = await api.getPolicies(place_id)

            if (result.kind === "ok") {
                self.savePolicies(result.policies)
            } else {
                __DEV__ && console.tron.log(result.kind)
            }
        },
        getPolicy: async (place_id: number, policy_type: number) => {
            const api = new PolicyApi(self.environment.api)
            const result = await api.getPolicy(place_id, policy_type)

            if (result.kind === "ok") {
                self.savePolicy(result.policy)
            } else {
                __DEV__ && console.tron.log(result.kind)
            }
        },
    }))

type PolicyStoreType = Instance<typeof PolicyStoreModel>

export interface PolicyStore extends PolicyStoreType {
}

type PolicyStoreSnapshotType = SnapshotOut<typeof PolicyStoreModel>

export interface PolicyStoreSnapshot extends PolicyStoreSnapshotType {
}

export const createPolicyStoreDefaultModel = () => types.optional(PolicyStoreModel, {})
