import { Instance, SnapshotOut, types } from 'mobx-state-tree';
import { UserProfileModel } from '../user-profile-model/user-profile-model';

export const UserModel = types.model('User').props({
  id: types.maybe(types.number),
  name: types.maybeNull(types.string),
  last_name: types.maybeNull(types.string),
  email: types.maybe(types.string),
  dob: types.maybeNull(types.string),
  gender: types.maybeNull(types.number),
  mobile_number: types.maybeNull(types.string),
  avatar: types.maybeNull(types.string),
  auth_mode: types.maybeNull(types.number),
  auth_data: types.maybeNull(types.string),
  payment_data: types.maybeNull(types.string),
  timezone: types.maybeNull(types.string),
  timezone_offset: types.maybeNull(types.number),
  user_type_id: types.maybe(types.number),
  place_id: types.maybeNull(types.number),
  tenant_id: types.maybeNull(types.number),

  // Custom
  profile: types.maybeNull(UserProfileModel),
});

type UserType = Instance<typeof UserModel>;

export interface User extends UserType {}

type UserSnapshotType = SnapshotOut<typeof UserModel>;

export interface UserSnapshot extends UserSnapshotType {}

export const createUserDefaultModel = () => types.optional(UserModel, {});
