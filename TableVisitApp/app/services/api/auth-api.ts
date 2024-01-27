import { ApiResponse } from 'apisauce';
import { Api } from './api';
import {
  GetAuthResult,
  GetLoggedUserResult,
  GetSignUpResult,
} from './api.types';
import { getGeneralApiProblem } from './api-problem';
import { AUTH_TOKEN, loadString } from '../../utils/storage';

export class AuthApi {
  private api: Api;

  constructor() {
    this.api = new Api();
  }

  async getSignIn(user): Promise<GetAuthResult> {
    try {
      await this.api.setup();
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.post(
        // `http://18.235.61.119/api/sign_in`,
        // `http://18.235.61.119/api/sign_in`,
        `http://172.20.10.2:5050/api/login`,

        JSON.stringify(user)
      );
      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response);
        if (problem) return problem;
      }

      const result = response.data;
    
      if (result.code === 200) {
        const { data } = result;
        return { kind: 'ok', data };
      }

      return { kind: 'error', message: result.message };
    } catch (e) {
      __DEV__ && console.tron.log("e", e.message);
      return { kind: 'error', message: e.message };
    }
  }

  async getStaffSignIn(user): Promise<GetAuthResult> {
    try {
      await this.api.setup();
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.post(
        `http://18.235.61.119/api/staff/sign_in`,
        JSON.stringify(user)
      );
      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response);
        if (problem) return problem;
      }

      const result = response.data;

      if (result.code === 200) {
        const { data } = result;
        return { kind: 'ok', data };
      }

      return { kind: 'error', message: result.message };
    } catch (e) {
      __DEV__ && console.tron.log(e.message);
      return { kind: 'error', message: e.message };
    }
  }

  async getSignUp(user): Promise<GetSignUpResult> {
    try {
      await this.api.setup();
      // alert("http://18.235.61.119");
      // make the api call
      // alert(JSON.stringify(user));
      const response: ApiResponse<any> = await this.api.apisauce.post(
        `http://18.235.61.119/api/sign_up`,
        JSON.stringify(user)
      );
      console.log(response);
      // alert(JSON.stringify(response));
      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response);
        if (problem) return problem;
      }

      const result = response.data;

      return { kind: 'ok', result };
    } catch (e) {
      __DEV__ && console.tron.log(e.message);
      return { kind: 'bad-data' };
    }
  }

  async getAppleSignIn(user): Promise<GetSignUpResult> {
    try {
      await this.api.setup();

      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.post(
        `http://18.235.61.119/api/appleUserID`,
        JSON.stringify(user)
      );

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response);
        if (problem) return problem;
      }

      const result = response.data;

      return { kind: 'ok', result };
    } catch (e) {
      __DEV__ && console.tron.log(e.message);
      return { kind: 'bad-data' };
    }
  }

  async getLoggedUser(): Promise<GetLoggedUserResult> {
    try {
      await this.api.setup();
      const token = await loadString(AUTH_TOKEN);
      console.log('token 12', token);
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(
        `http://18.235.61.119/api/logged_user`,
        null,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response);
        if (problem) return problem;
      }

      const user = response.data.data;

      return { kind: 'ok', user };
    } catch (e) {
      __DEV__ && console.tron.log(e.message);
      return { kind: 'error', message: e.message };
    }
  }

  async verifyOTP(user): Promise<GetAuthResult> {
    try {
      await this.api.setup();

      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.post(
        `http://18.235.61.119/api/verify_otp`,
        JSON.stringify(user)
      );

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response);
        if (problem) return problem;
      }

      const result = response.data;

      if (result.code === 200) {
        const { data } = result;
        return { kind: 'ok', data };
      }

      return { kind: 'error', message: result.message };
    } catch (e) {
      __DEV__ && console.tron.log(e.message);
      return { kind: 'error', message: e.message };
    }
  }
}
