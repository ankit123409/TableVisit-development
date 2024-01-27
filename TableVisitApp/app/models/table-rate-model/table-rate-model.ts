import {Instance, SnapshotOut, types} from "mobx-state-tree"

export const TableRateModel = types.model("TableRate").props({
    id: types.maybe(types.number),
    rate: types.maybeNull(types.string),
    tax: types.maybeNull(types.string),
    total_rate: types.maybeNull(types.string),
    table_id: types.maybeNull(types.number),
    place_id: types.maybeNull(types.number),
    tenant_id: types.maybeNull(types.number),
    valid_from: types.maybeNull(types.string),
    valid_to: types.maybeNull(types.string),

    gratuity: types.maybeNull(types.string),
})

type TableRateType = Instance<typeof TableRateModel>

export interface TableRate extends TableRateType {
}

type TableRateSnapshotType = SnapshotOut<typeof TableRateModel>

export interface TableRateSnapshot extends TableRateSnapshotType {
}

export const createTableRateDefaultModel = () => types.optional(TableRateModel, {})
