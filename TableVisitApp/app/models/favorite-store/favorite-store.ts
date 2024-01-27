import {Instance, SnapshotOut, types} from "mobx-state-tree"
import {withEnvironment} from "../extensions/with-environment"
import {PlaceModel, PlaceSnapshot} from "../place-model/place-model";
import {FavoriteApi} from "../../services/api/favorite-api";

export const FavoriteStoreModel = types
    .model("FavoriteStore")
    .props({
        favorites: types.optional(types.array(PlaceModel), []),
    })
    .extend(withEnvironment)
    .actions((self) => ({
        save: (modelSnapshots: PlaceSnapshot[]) => {
            self.favorites.replace(modelSnapshots)
        },
    }))
    .actions((self) => ({
        getFavorites: async () => {
            const api = new FavoriteApi(self.environment.api)
            const result = await api.getFavorites()

            if (result.kind === "ok") {
                self.save(result.favorites)
            } else {
                __DEV__ && console.tron.log(result.kind)
            }
        },
        add: async (place_id: number) => {
            const api = new FavoriteApi(self.environment.api)
            const result = await api.add(place_id)

            if (result.kind === "ok") {

            } else {
                __DEV__ && console.tron.log(result.kind)
            }
        },
        remove: async (id: number) => {
            const api = new FavoriteApi(self.environment.api)
            const result = await api.remove(id)

            if (result.kind === "ok") {

            } else {
                __DEV__ && console.tron.log(result.kind)
            }
        },
    }))

type FavoriteStoreType = Instance<typeof FavoriteStoreModel>

export interface FavoriteStore extends FavoriteStoreType {
}

type FavoriteStoreSnapshotType = SnapshotOut<typeof FavoriteStoreModel>

export interface FavoriteStoreSnapshot extends FavoriteStoreSnapshotType {
}

export const createFavoriteStoreDefaultModel = () => types.optional(FavoriteStoreModel, {})
