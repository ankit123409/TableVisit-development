import {Instance, SnapshotOut, types} from "mobx-state-tree"

export const FavoriteModel = types.model("Favorite").props({
    id: types.maybe(types.number),
    place_id: types.maybeNull(types.number),
    user_id: types.maybeNull(types.number),
})

type FavoriteType = Instance<typeof FavoriteModel>

export interface Favorite extends FavoriteType {
}

type FavoriteSnapshotType = SnapshotOut<typeof FavoriteModel>

export interface FavoriteSnapshot extends FavoriteSnapshotType {
}

export const createFavoriteDefaultModel = () => types.optional(FavoriteModel, {})
