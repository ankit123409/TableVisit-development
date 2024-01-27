import {Instance, SnapshotOut, types} from "mobx-state-tree"

export const PlaceTypeModel = types.model("PlaceType").props({
    id: types.maybe(types.number),
    name: types.maybe(types.string),
    status: types.maybe(types.string),
    image: types.maybe(types.string),
})

type PlaceTypeType = Instance<typeof PlaceTypeModel>

export interface PlaceType extends PlaceTypeType {
}

type PlaceTypeSnapshotType = SnapshotOut<typeof PlaceTypeModel>

export interface PlaceTypeSnapshot extends PlaceTypeSnapshotType {
}

export const createPlaceTypeDefaultModel = () => types.optional(PlaceTypeModel, {})
