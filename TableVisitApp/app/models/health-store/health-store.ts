import {Instance, SnapshotOut, types} from "mobx-state-tree"
import {withEnvironment} from "../extensions/with-environment"
import {HealthModel, HealthSnapshot} from "../health-model/health-model";
import {HealthApi} from "../../services/api";

export const HealthStoreModel = types
    .model("HealthStore")
    .props({
        health: types.optional(types.maybe(HealthModel), {}),
    })
    .extend(withEnvironment)
    .actions((self) => ({
        save: (modelSnapshot: HealthSnapshot) => {
            self.health = modelSnapshot
        },
    }))
    .actions((self) => ({
        save: async () => {
            const api = new HealthApi(self.environment.api)
            const result = await api.health()

            if (result.kind === "ok") {
                self.save(result.result)
            } else {
                __DEV__ && console.tron.log(result.kind)
            }
        },
    }))

type HealthStoreType = Instance<typeof HealthStoreModel>

export interface HealthStore extends HealthStoreType {
}

type HealthStoreSnapshotType = SnapshotOut<typeof HealthStoreModel>

export interface HealthStoreSnapshot extends HealthStoreSnapshotType {
}

export const createHealthStoreDefaultModel = () => types.optional(HealthStoreModel, {})
