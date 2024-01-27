import { Instance, SnapshotOut, types } from "mobx-state-tree"

export const LanguageModel = types.model("Language").props({
  id: types.maybe(types.number),
  name: types.maybe(types.string),
  status: types.maybe(types.string),
  image: types.maybe(types.string),
})

type LanguageType = Instance<typeof LanguageModel>
export interface Language extends LanguageType {}
type LanguageSnapshotType = SnapshotOut<typeof LanguageModel>
export interface LanguageSnapshot extends LanguageSnapshotType {}
export const createLanguageDefaultModel = () => types.optional(LanguageModel, {})
