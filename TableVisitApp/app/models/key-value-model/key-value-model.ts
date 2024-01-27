import {Instance, SnapshotOut, types} from "mobx-state-tree"

export const KeyValueModel = types.model("KeyValue").props({
    key: types.maybeNull(types.string),
    value: types.maybeNull(types.string),
})

type KeyValueType = Instance<typeof KeyValueModel>

export interface KeyValue extends KeyValueType {
}

type KeyValueSnapshotType = SnapshotOut<typeof KeyValueModel>

export interface KeyValueSnapshot extends KeyValueSnapshotType {
}

export const createKeyValueDefaultModel = () => types.optional(KeyValueModel, {})
