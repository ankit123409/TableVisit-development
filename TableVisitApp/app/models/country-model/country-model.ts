import {Instance, SnapshotOut, types} from "mobx-state-tree"

export const CountryModel = types.model("Country").props({
    id: types.maybe(types.number),
    name: types.maybe(types.string),
    iso_code: types.maybe(types.string),
})

type CountryType = Instance<typeof CountryModel>

export interface Country extends CountryType {
}

type CountrySnapshotType = SnapshotOut<typeof CountryModel>

export interface CountrySnapshot extends CountrySnapshotType {
}

export const createCountryDefaultModel = () => types.optional(CountryModel, {})
