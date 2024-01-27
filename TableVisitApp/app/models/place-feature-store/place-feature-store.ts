import {Instance, SnapshotOut, types} from "mobx-state-tree"
import {withEnvironment} from "../extensions/with-environment"
import {PlaceFeatureModel, PlaceFeatureSnapshot} from "../place-feature-model/place-feature-model";
import {PlaceFeatureApi} from "../../services/api/place-feature-api";

export const PlaceFeatureStoreModel = types
    .model("PlaceFeatureStore")
    .props({
        states: types.optional(types.array(PlaceFeatureModel), []),
    })
    .extend(withEnvironment)
    .actions((self) => ({
        savePlaceFeatures: (modelSnapshots: PlaceFeatureSnapshot[]) => {
            self.states.replace(modelSnapshots)
        },
    }))
    .actions((self) => ({
        getPlaceFeatures: async () => {
            const api = new PlaceFeatureApi(self.environment.api)
            const result = await api.getPlaceFeatures()

            if (result.kind === "ok") {
                self.savePlaceFeatures(result.results)
            } else {
                __DEV__ && console.tron.log(result.kind)
            }
        },
    }))

type PlaceFeatureStoreType = Instance<typeof PlaceFeatureStoreModel>

export interface PlaceFeatureStore extends PlaceFeatureStoreType {
}

type PlaceFeatureStoreSnapshotType = SnapshotOut<typeof PlaceFeatureStoreModel>

export interface PlaceFeatureStoreSnapshot extends PlaceFeatureStoreSnapshotType {
}

export const createPlaceFeatureStoreDefaultModel = () => types.optional(PlaceFeatureStoreModel, {})
