import {Instance, SnapshotOut, types} from "mobx-state-tree"
import {withEnvironment} from "../extensions/with-environment"
import {PlaceMusicModel, PlaceMusicSnapshot} from "../place-music-model/place-music-model";
import {PlaceMusicApi} from "../../services/api/place-music-api";

export const PlaceMusicStoreModel = types
    .model("PlaceMusicStore")
    .props({
        states: types.optional(types.array(PlaceMusicModel), []),
    })
    .extend(withEnvironment)
    .actions((self) => ({
        savePlaceMusic: (modelSnapshots: PlaceMusicSnapshot[]) => {
            self.states.replace(modelSnapshots)
        },
    }))
    .actions((self) => ({
        getPlaceMusic: async () => {
            const api = new PlaceMusicApi(self.environment.api)
            const result = await api.getPlaceMusic()

            if (result.kind === "ok") {
                self.savePlaceMusic(result.results)
            } else {
                __DEV__ && console.tron.log(result.kind)
            }
        },
    }))

type PlaceMusicStoreType = Instance<typeof PlaceMusicStoreModel>

export interface PlaceMusicStore extends PlaceMusicStoreType {
}

type PlaceMusicStoreSnapshotType = SnapshotOut<typeof PlaceMusicStoreModel>

export interface PlaceMusicStoreSnapshot extends PlaceMusicStoreSnapshotType {
}

export const createPlaceMusicStoreDefaultModel = () => types.optional(PlaceMusicStoreModel, {})
