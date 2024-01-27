import {Instance, SnapshotOut, types} from "mobx-state-tree"

export const ServiceRateModel = types.model("ServiceRate").props({
    id: types.maybe(types.number),
    rate: types.maybeNull(types.string),
    tax: types.maybeNull(types.string),
    total_rate: types.maybeNull(types.string),
    service_name: types.maybeNull(types.string),
    service_type_name: types.maybeNull(types.string),
    service_id: types.maybe(types.number),
    place_id: types.maybe(types.number),
})

type ServiceRateType = Instance<typeof ServiceRateModel>

export interface ServiceRate extends ServiceRateType {
}

type ServiceRateSnapshotType = SnapshotOut<typeof ServiceRateModel>

export interface ServiceRateSnapshot extends ServiceRateSnapshotType {
}

export const createServiceRateDefaultModel = () => types.optional(ServiceRateModel, {})
