import {Instance, SnapshotOut, types} from "mobx-state-tree"

export const HealthModel = types.model("Health").props({
    code: types.maybe(types.number),
    data: types.maybe(types.string),
    timestamp: types.maybe(types.number),
})

type HealthType = Instance<typeof HealthModel>

export interface Health extends HealthType {
}

type HealthSnapshotType = SnapshotOut<typeof HealthModel>

export interface HealthSnapshot extends HealthSnapshotType {
}

export const createHealthDefaultModel = () => types.optional(HealthModel, {})
