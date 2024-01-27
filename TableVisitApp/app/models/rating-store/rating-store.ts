import {Instance, SnapshotOut, types} from "mobx-state-tree"
import {withEnvironment} from "../extensions/with-environment"
import {RatingModel, RatingSnapshot} from "../rating-model/rating-model";
import {RatingApi} from "../../services/api/rating-api";

export const RatingStoreModel = types
    .model("RatingStore")
    .props({
        ratings: types.optional(types.array(RatingModel), []),
    })
    .extend(withEnvironment)
    .actions((self) => ({
        save: (modelSnapshots: RatingSnapshot[]) => {
            self.ratings.replace(modelSnapshots)
        },
    }))
    .actions((self) => ({
        getRatings: async () => {
            const api = new RatingApi(self.environment.api)
            const result = await api.getRatings()

            if (result.kind === "ok") {
                self.save(result.ratings)
            } else {
                __DEV__ && console.tron.log(result.kind)
            }
        },
        add: async (data: any) => {
            const api = new RatingApi(self.environment.api)
            const result = await api.add(data)

            if (result.kind === "ok") {

            } else {
                __DEV__ && console.tron.log(result.kind)
            }
        },
        remove: async (id: number) => {
            const api = new RatingApi(self.environment.api)
            const result = await api.remove(id)

            if (result.kind === "ok") {

            } else {
                __DEV__ && console.tron.log(result.kind)
            }
        },
    }))

type RatingStoreType = Instance<typeof RatingStoreModel>

export interface RatingStore extends RatingStoreType {
}

type RatingStoreSnapshotType = SnapshotOut<typeof RatingStoreModel>

export interface RatingStoreSnapshot extends RatingStoreSnapshotType {
}

export const createRatingStoreDefaultModel = () => types.optional(RatingStoreModel, {})
