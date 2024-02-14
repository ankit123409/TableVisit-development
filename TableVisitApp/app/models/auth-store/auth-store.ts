import { Instance, SnapshotOut, types } from 'mobx-state-tree';
import { withEnvironment } from '../extensions/with-environment';
import { UserModel, UserSnapshot } from '../user-model/user-model';
import { AuthApi } from '../../services/api';
import { AuthModel, AuthSnapshot } from '../auth-model/auth-model';

export const AuthStoreModel = types
  .model('AuthStore')
  .props({
    user: types.optional(types.maybe(UserModel), {}),
    auth: types.optional(types.maybe(AuthModel), {}),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    saveLoggedUser: (modelSnapshot: UserSnapshot) => {
      self.user = modelSnapshot;
    },
    saveSignIn: (modelSnapshot: AuthSnapshot) => {
      self.auth = modelSnapshot;
    },
  }))
  .actions((self) => ({
    getSignIn: async (user) => {
      const api = new AuthApi();
      const result = await api.getSignIn(user);

      if (result.kind === 'ok') {
        self.saveSignIn(result.data);
      } else {
        __DEV__ && console.log(result.kind);
      }

      return result;
    },
    getSignUp: async (user) => {
      const api = new AuthApi();
      const result = await api.getSignUp(user);

      if (result && result.kind === 'ok') {
        return result;
      } else {
        __DEV__ && console.log(result.kind);
        return null;
      }
    },

    getResendOtp: async () => {
      const api = new AuthApi();
      const result = await api.getOtp();

      if (result && result.kind === 'ok') {
        return result;
      } else {
        __DEV__ && console.log(result.kind);
        return null;
      }
    },
    getAppleSignIn: async (user) => {
      const api = new AuthApi();
      const result = await api.getAppleSignIn(user);

      console.log('result....', result, user);
      if (result && result.kind === 'ok') {
        return result.result;
      } else {
        __DEV__ && console.log(result.kind);
        return null;
      }
    },
    getLoggedUser: async () => {
      const api = new AuthApi();
      const result = await api.getLoggedUser();

      if (result.kind === 'ok') {
        self.saveLoggedUser(result.user);
      } else {
        __DEV__ && console.log(result.kind);
      }

      return result;
    },
  }));

type AuthStoreType = Instance<typeof AuthStoreModel>;

export interface AuthStore extends AuthStoreType {}

type AuthStoreSnapshotType = SnapshotOut<typeof AuthStoreModel>;

export interface AuthStoreSnapshot extends AuthStoreSnapshotType {}

export const createAuthStoreDefaultModel = () =>
  types.optional(AuthStoreModel, {});
