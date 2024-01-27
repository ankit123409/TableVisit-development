import {Instance, SnapshotOut, types} from "mobx-state-tree"

export const TableDetailModel = types.model("TableDetail").props({
    id: types.maybe(types.number),
    detail: types.maybeNull(types.string),
    introduction: types.maybeNull(types.string),
    short_detail: types.maybeNull(types.string),
    table_id: types.maybe(types.number),
    language_id: types.maybe(types.number),
})

type TableDetailType = Instance<typeof TableDetailModel>

export interface TableDetail extends TableDetailType {
}

type TableDetailSnapshotType = SnapshotOut<typeof TableDetailModel>

export interface TableDetailSnapshot extends TableDetailSnapshotType {
}

export const createTableDetailDefaultModel = () => types.optional(TableDetailModel, {})
