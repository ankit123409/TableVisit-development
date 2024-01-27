import {Instance, SnapshotOut, types} from "mobx-state-tree"

export const CityModel = types.model("City").props({
    id: types.maybe(types.number),
    name: types.maybe(types.string),
    iso_code: types.maybe(types.string),
    county: types.maybe(types.string),
    latitude: types.maybe(types.number),
    longitude: types.maybe(types.number),
    display_order: types.maybe(types.number),
    country_id: types.maybe(types.number),
    state_id: types.maybe(types.number),
})

type CityType = Instance<typeof CityModel>

export interface City extends CityType {
}

type CitySnapshotType = SnapshotOut<typeof CityModel>

export interface CitySnapshot extends CitySnapshotType {
}

export const createCityDefaultModel = () => types.optional(CityModel, {})
