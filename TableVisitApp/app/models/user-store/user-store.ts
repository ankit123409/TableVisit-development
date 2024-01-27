import { Instance, SnapshotOut, types } from 'mobx-state-tree';
import { withEnvironment } from '../extensions/with-environment';
import { UserModel, UserSnapshot } from '../user-model/user-model';
import { UserApi } from '../../services/api';

export const UserStoreModel = types
  .model('UserStore')
  .props({
    users: types.optional(types.array(UserModel), []),
    user: types.optional(types.maybe(UserModel), {}),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    saveUsers: (modelSnapshots: UserSnapshot[]) => {
      self.users.replace(modelSnapshots);
    },
    save: (modelSnapshot: UserSnapshot) => {
      self.user = modelSnapshot;
    },
  }))
  .actions((self) => ({
    getUser: async (id: number) => {
      const api = new UserApi(self.environment.api);
      const result = await api.getUser(id);

      if (result.kind === 'ok') {
        self.save(result.user);
      } else {
        __DEV__ && console.tron.log(result.kind);
      }
    },
    update: async (user) => {
      const api = new UserApi(self.environment.api);
      const result = await api.update(user);

      if (result.kind === 'ok') {
        return result.result;
      } else {
        __DEV__ && console.tron.log(result.kind);
        return null;
      }
    },
    uploadAvatar: async (file: string) => {
      const api = new UserApi(self.environment.api);
      console.log('file...', file);
      const result = await api.uploadAvatar(file);

      if (result.kind === 'ok') {
        return result.result;
      } else {
        __DEV__ && console.tron.log(result.kind);
        return null;
      }
    },
    deleteAccount: async () => {
      const api = new UserApi(self.environment.api);
      const result = await api.deleteAccount();
      console.log('res', result);
      if (result.kind === 'ok') {
        return { kind: 'ok', result };
      } else {
        __DEV__ && console.tron.log(result.kind);
        return null;
      }
    },
    logout: async () => {
      const api = new UserApi(self.environment.api);
      const result = await api.logout();
      console.log('res', result);
      if (result.kind === 'ok') {
        return { kind: 'ok', result };
      } else {
        __DEV__ && console.tron.log(result.kind);
        return null;
      }
    },
  }));

type UserStoreType = Instance<typeof UserStoreModel>;

export interface UserStore extends UserStoreType {}

type UserStoreSnapshotType = SnapshotOut<typeof UserStoreModel>;

export interface UserStoreSnapshot extends UserStoreSnapshotType {}

export const createUserStoreDefaultModel = () =>
  types.optional(UserStoreModel, {});
