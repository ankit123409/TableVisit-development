import { Instance, SnapshotOut, types } from "mobx-state-tree"

export const PlaceMusicModel = types.model("PlaceMusic").props({
  id: types.maybe(types.number),
  name: types.maybe(types.string),
  display_order: types.maybe(types.number),
})

type PlaceMusicType = Instance<typeof PlaceMusicModel>
export interface PlaceMusic extends PlaceMusicType {}
type PlaceMusicSnapshotType = SnapshotOut<typeof PlaceMusicModel>
export interface PlaceMusicSnapshot extends PlaceMusicSnapshotType {}
export const createPlaceMusicDefaultModel = () => types.optional(PlaceMusicModel, {})
