import {Instance, SnapshotOut, types} from "mobx-state-tree"
import {withEnvironment} from "../extensions/with-environment"
import {CityModel, CitySnapshot} from "../city-model/city-model";
import {CityApi} from "../../services/api";

export const CityStoreModel = types
    .model("CityStore")
    .props({
        cities_top: types.optional(types.array(CityModel), []),
        cities_search: types.optional(types.array(CityModel), []),
    })
    .extend(withEnvironment)
    .actions((self) => ({
        saveCitiesTop: (modelSnapshots: CitySnapshot[]) => {
            self.cities_top.replace(modelSnapshots)
        },
        saveCitiesSearch: (modelSnapshots: CitySnapshot[]) => {
            self.cities_search.replace(modelSnapshots)
        },
    }))
    .actions((self) => ({
        getCitiesTop: async () => {
            const api = new CityApi(self.environment.api)
            const result = await api.getCitiesTop()
            if (result.kind === "ok") {
                self.saveCitiesTop(result.cities_top)
            } else {
                __DEV__ && console.tron.log(result.kind)
            }
        },
        getCitiesSearch: async (word) => {
            const api = new CityApi(self.environment.api)
            const result = await api.getCitiesSearch(word)
            console.log("result",result)
            if (result.kind === "ok") {
                self.saveCitiesSearch(result.cities_search)
            } else {
                __DEV__ && console.tron.log(result.kind)
            }
        },
    }))

type CityStoreType = Instance<typeof CityStoreModel>

export interface CityStore extends CityStoreType {
}

type CityStoreSnapshotType = SnapshotOut<typeof CityStoreModel>

export interface CityStoreSnapshot extends CityStoreSnapshotType {
}

export const createCityStoreDefaultModel = () => types.optional(CityStoreModel, {})
