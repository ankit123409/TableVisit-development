import { Instance, SnapshotOut, types } from "mobx-state-tree"

export const CurrencyModel = types.model("Currency").props({
  id: types.maybe(types.number),
  name: types.maybe(types.string),
  status: types.maybe(types.string),
  image: types.maybe(types.string),
})

type CurrencyType = Instance<typeof CurrencyModel>
export interface Currency extends CurrencyType {}
type CurrencySnapshotType = SnapshotOut<typeof CurrencyModel>
export interface CurrencySnapshot extends CurrencySnapshotType {}
export const createCurrencyDefaultModel = () => types.optional(CurrencyModel, {})
