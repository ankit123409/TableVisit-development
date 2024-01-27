import {Instance, SnapshotOut, types} from "mobx-state-tree"

export const StateModel = types.model("State").props({
    id: types.maybe(types.number),
    name: types.maybe(types.string),
    iso_code: types.maybe(types.string),
    display_order: types.maybe(types.number),
    country_id: types.maybe(types.number),
})


type StateType = Instance<typeof StateModel>

export interface State extends StateType {
}

type StateSnapshotType = SnapshotOut<typeof StateModel>

export interface StateSnapshot extends StateSnapshotType {
}

export const createStateDefaultModel = () => types.optional(StateModel, {})
