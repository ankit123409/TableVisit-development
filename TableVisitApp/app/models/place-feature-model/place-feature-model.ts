import {Instance, SnapshotOut, types} from "mobx-state-tree"

export const PlaceFeatureModel = types.model("PlaceFeature").props({
    id: types.maybe(types.number),
    name: types.maybe(types.string),
    display_order: types.maybe(types.number),
})

type PlaceFeatureType = Instance<typeof PlaceFeatureModel>

export interface PlaceFeature extends PlaceFeatureType {
}

type PlaceFeatureSnapshotType = SnapshotOut<typeof PlaceFeatureModel>

export interface PlaceFeatureSnapshot extends PlaceFeatureSnapshotType {
}

export const createPlaceFeatureDefaultModel = () => types.optional(PlaceFeatureModel, {})
