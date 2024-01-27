import {Instance, SnapshotOut, types} from "mobx-state-tree"
import {withEnvironment} from "../extensions/with-environment"
import {CountryApi} from "../../services/api";
import {CountryModel, CountrySnapshot} from "../country-model/country-model";

export const CountryStoreModel = types
    .model("CountryStore")
    .props({
        countries: types.optional(types.array(CountryModel), []),
        countries_search: types.optional(types.array(CountryModel), []),
    })
    .extend(withEnvironment)
    .actions((self) => ({
        saveCountries: (modelSnapshots: CountrySnapshot[]) => {
            self.countries.replace(modelSnapshots)
        },
        saveCountriesSearch: (modelSnapshots: CountrySnapshot[]) => {
            self.countries_search.replace(modelSnapshots)
        },
    }))
    .actions((self) => ({
        getCountries: async () => {
            const api = new CountryApi(self.environment.api)
            const result = await api.getCountries()
            if (result.kind === "ok") {
                self.saveCountries(result.countries)
            } else {
                __DEV__ && console.tron.log(result.kind)
            }
        },
        getCountriesSearch: async (word) => {
            const api = new CountryApi(self.environment.api)
            const result = await api.getCountriesSearch(word)
            if (result.kind === "ok") {
                self.saveCountriesSearch(result.countries_search)
            } else {
                __DEV__ && console.tron.log(result.kind)
            }
        },
    }))

type CountryStoreType = Instance<typeof CountryStoreModel>

export interface CountryStore extends CountryStoreType {
}

type CountryStoreSnapshotType = SnapshotOut<typeof CountryStoreModel>

export interface CountryStoreSnapshot extends CountryStoreSnapshotType {
}

export const createCountryStoreDefaultModel = () => types.optional(CountryStoreModel, {})
