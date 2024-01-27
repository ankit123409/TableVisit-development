import {Instance, SnapshotOut, types} from "mobx-state-tree"
import {withEnvironment} from "../extensions/with-environment"
import {TableSpendApi} from "../../services/api";
import {TableSpendModel, TableSpendSnapshot} from "../table-spend-model/table-spend-model";

export const TableSpendStoreModel = types
    .model("TableSpendStore")
    .props({
        table_spends: types.optional(types.array(TableSpendModel), []),
        close_request : types.optional(types.number, 0)
    })
    .extend(withEnvironment)
    .actions((self) => ({
        saveTableSpends: (modelSnapshots: TableSpendSnapshot[]) => {
            self.table_spends.replace(modelSnapshots)
        },
        saveTableClosed: (modelSnapshots: number) => {
            self.close_request = modelSnapshots
        },
    }))
    .actions((self) => ({
        getTableSpends: async (data: any) => {
            const api = new TableSpendApi(self.environment.api)
            const result = await api.getTableSpends(data)
            if (result.kind === "ok") {
                
                const arrayTableSpends = Object.values(result.table_spends);

                delete arrayTableSpends[arrayTableSpends.length - 1];
                const filteredArray = arrayTableSpends.filter(item => item !== undefined);
                    console.log("filet..", filteredArray)
                self.saveTableSpends(filteredArray)
                self.saveTableClosed(result.table_spends?.close_request || 0)
            } else {
                __DEV__ && console.log(result.kind)
            }
        },
        add: async (obj: any) => {
            const api = new TableSpendApi(self.environment.api)
            const result = await api.add(obj)

            if (result.kind === "ok") {

            } else {
                __DEV__ && console.log(result.kind)
            }
        },
        remove: async (id: number) => {
            const api = new TableSpendApi(self.environment.api)
            const result = await api.remove(id)

            if (result.kind === "ok") {

            } else {
                __DEV__ && console.log(result.kind)
            }
        },
        closeTable: async (data : any) => {
            const api = new TableSpendApi(self.environment.api)
            const result = await api.closeTable(data)
            console.log("Resulr.", result)
            if (result.kind === "ok") {

            } else {
                __DEV__ && console.log(result.kind)
            }
        },
    }))

type TableSpendStoreType = Instance<typeof TableSpendStoreModel>

export interface TableSpendStore extends TableSpendStoreType {
}

type TableSpendStoreSnapshotType = SnapshotOut<typeof TableSpendStoreModel>

export interface TableSpendStoreSnapshot extends TableSpendStoreSnapshotType {
}

export const createTableSpendStoreDefaultModel = () => types.optional(TableSpendStoreModel, {})
