import {Instance, SnapshotOut, types} from "mobx-state-tree"
import {withEnvironment} from "../extensions/with-environment"
import {TableModel, TableSnapshot} from "../table-model/table-model";
import {TableApi} from "../../services/api";
import {TableRateModel, TableRateSnapshot} from "../table-rate-model/table-rate-model";

export const TableStoreModel = types
    .model("TableStore")
    .props({
        tables: types.optional(types.array(TableModel), []),
        table: types.optional(types.maybeNull(TableModel), {}),
        rates: types.optional(types.array(TableRateModel), []),
        rate: types.optional(types.maybeNull(TableRateModel), {}),
    })
    .extend(withEnvironment)
    .actions((self) => ({
        saveTables: (modelSnapshots: TableSnapshot[]) => {
            self.tables.replace(modelSnapshots)
        },
        saveTable: (modelSnapshot: TableSnapshot) => {
            self.table = modelSnapshot
        },
        saveRates: (modelSnapshots: TableRateSnapshot[]) => {
            self.rates.replace(modelSnapshots)
        },
        saveRate: (modelSnapshot: TableRateSnapshot) => {
            self.rate = modelSnapshot
        },
    }))
    .actions((self) => ({
        getTables: async (place_id) => {
            const api = new TableApi(self.environment.api)
            const result = await api.getTables(place_id)

            if (result.kind === "ok") {
                self.saveTables(result.tables)
            } else {
                __DEV__ && console.log(result.kind)
            }

            return result.kind;
        },
        getTablesWithDate: async (place_id, date) => {
            const api = new TableApi(self.environment.api)
            const result = await api.getTablesWithDate(place_id, date)

            if (result.kind === "ok") {
                self.saveTables(result.tables)
            } else {
                __DEV__ && console.log(result.kind)
            }

            return result.kind;
        },
        getTable: async (id) => {
            const api = new TableApi(self.environment.api)
            const result = await api.getTable(id)

            if (result.kind === "ok") {
                self.saveTable(result.table)
            } else {
                __DEV__ && console.log(result.kind)
            }

            return result.kind;
        },
        getRates: async (table_id, date) => {
            const api = new TableApi(self.environment.api)
            const result = await api.getRates(table_id, date)

            if (result.kind === "ok") {
                self.saveRates(result.rates)
            } else {
                __DEV__ && console.log(result.kind)
            }

            return result.kind;
        },
        getRate: async (table_id, date) => {
            const api = new TableApi(self.environment.api)
            const result = await api.getRate(table_id, date)
            if (result.kind === "ok") {                
                self.saveRate(result.rate)
            } else {
                __DEV__ && console.log(result.kind)
            }

            return result.kind;
        },
    }))

type TableStoreType = Instance<typeof TableStoreModel>

export interface TableStore extends TableStoreType {
}

type TableStoreSnapshotType = SnapshotOut<typeof TableStoreModel>

export interface TableStoreSnapshot extends TableStoreSnapshotType {
}

export const createTableStoreDefaultModel = () => types.optional(TableStoreModel, {})
