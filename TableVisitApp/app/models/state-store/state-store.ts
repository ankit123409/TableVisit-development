import {Instance, SnapshotOut, types} from "mobx-state-tree"
import {withEnvironment} from "../extensions/with-environment"
import {StateModel, StateSnapshot} from "../state-model/state-model";
import {StateApi} from "../../services/api";

export const StateStoreModel = types
    .model("StateStore")
    .props({
        states: types.optional(types.array(StateModel), []),
    })
    .extend(withEnvironment)
    .actions((self) => ({
        saveStates: (modelSnapshots: StateSnapshot[]) => {
            self.states.replace(modelSnapshots)
        },
    }))
    .actions((self) => ({
        getStates: async () => {
            const api = new StateApi(self.environment.api)
            const result = await api.getStates()

            if (result.kind === "ok") {
                self.saveStates(result.states)
            } else {
                __DEV__ && console.tron.log(result.kind)
            }
        },
    }))

type StateStoreType = Instance<typeof StateStoreModel>

export interface StateStore extends StateStoreType {
}

type StateStoreSnapshotType = SnapshotOut<typeof StateStoreModel>

export interface StateStoreSnapshot extends StateStoreSnapshotType {
}

export const createStateStoreDefaultModel = () => types.optional(StateStoreModel, {})
