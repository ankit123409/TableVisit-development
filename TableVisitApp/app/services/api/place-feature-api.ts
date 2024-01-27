import {ApiResponse} from "apisauce"
import {Api} from "./api"
import {GetPlaceFeaturesResult} from "./api.types"
import {getGeneralApiProblem} from "./api-problem"

export class PlaceFeatureApi {
    private api: Api

    constructor(api: Api) {
        this.api = api
    }

    async getPlaceFeatures(): Promise<GetPlaceFeaturesResult> {
        try {
            // make the api call
            const response: ApiResponse<any> = await this.api.apisauce.get(
                "api/place-features",
                null,
            )

            // the typical ways to die when calling an api
            if (!response.ok) {
                const problem = getGeneralApiProblem(response)
                if (problem) return problem
            }

            const results = response.data.results

            return {kind: "ok", results}
        } catch (e) {
            __DEV__ && console.tron.log(e.message)
            return {kind: "bad-data"}
        }
    }
}
