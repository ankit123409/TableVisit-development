import {Instance, SnapshotOut, types} from "mobx-state-tree"

export const ApiResponseModel = types.model("ApiResponse").props({
    code: types.maybe(types.number),
    message: types.maybe(types.string),
    data: types.maybeNull(types.string),
})

type ApiResponseType = Instance<typeof ApiResponseModel>

export interface ApiResponse extends ApiResponseType {
}

type ApiResponseSnapshotType = SnapshotOut<typeof ApiResponseModel>

export interface ApiResponseSnapshot extends ApiResponseSnapshotType {
}

export const createApiResponseDefaultModel = () => types.optional(ApiResponseModel, {})
