import { Instance, SnapshotOut, types } from "mobx-state-tree"

export const MediaFileModel = types.model("MediaFile").props({
  id: types.maybe(types.number),
  name: types.maybe(types.string),
  status: types.maybe(types.string),
  image: types.maybe(types.string),
})

type MediaFileType = Instance<typeof MediaFileModel>
export interface MediaFile extends MediaFileType {}
type MediaFileSnapshotType = SnapshotOut<typeof MediaFileModel>
export interface MediaFileSnapshot extends MediaFileSnapshotType {}
export const createMediaFileDefaultModel = () => types.optional(MediaFileModel, {})
