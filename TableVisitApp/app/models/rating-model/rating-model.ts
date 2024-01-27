import {Instance, SnapshotOut, types} from "mobx-state-tree"

export const RatingModel = types.model("Rating").props({
    id: types.maybe(types.number),
    place_id: types.maybeNull(types.number),
    user_id: types.maybeNull(types.number),
})

type RatingType = Instance<typeof RatingModel>

export interface Rating extends RatingType {
}

type RatingSnapshotType = SnapshotOut<typeof RatingModel>

export interface RatingSnapshot extends RatingSnapshotType {
}

export const createRatingDefaultModel = () => types.optional(RatingModel, {})
