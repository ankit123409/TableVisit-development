import {Instance, SnapshotOut, types} from "mobx-state-tree"

export const PlaceDetailModel = types.model("PlaceDetail").props({
    id: types.maybe(types.number),
    detail: types.maybeNull(types.string),
    short_detail: types.maybeNull(types.string),
    place_id: types.maybe(types.number),
    language_id: types.maybe(types.number),
})

type PlaceDetailType = Instance<typeof PlaceDetailModel>

export interface PlaceDetail extends PlaceDetailType {
}

type PlaceDetailSnapshotType = SnapshotOut<typeof PlaceDetailModel>

export interface PlaceDetailSnapshot extends PlaceDetailSnapshotType {
}

export const createPlaceDetailDefaultModel = () => types.optional(PlaceDetailModel, {})
