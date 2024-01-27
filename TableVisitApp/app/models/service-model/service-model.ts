import {Instance, SnapshotOut, types} from "mobx-state-tree"

export const ServiceModel = types.model("Service").props({
    id: types.maybe(types.number),
    name: types.maybe(types.string),
})

type ServiceType = Instance<typeof ServiceModel>

export interface Service extends ServiceType {
}

type ServiceSnapshotType = SnapshotOut<typeof ServiceModel>

export interface ServiceSnapshot extends ServiceSnapshotType {
}

export const createServiceDefaultModel = () => types.optional(ServiceModel, {})
