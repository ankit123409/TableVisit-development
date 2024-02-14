import { ApiResponse } from 'apisauce';
import { Api } from './api';
import {
  GetAuthResult,
  GetLoggedUserResult,
  GetSignUpResult,
} from './api.types';
import { getGeneralApiProblem } from './api-problem';
import { AUTH_TOKEN, loadString } from '../../utils/storage';
import { API_URL, BASE_URL, DEFAULT_API_CONFIG } from './api-config';
import { LOGIN } from './api-constant';

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
        // `${BASE_URL}/${LOGIN}`
        `${API_URL}login`
        ,
        JSON.stringify(user)
      );
      console.log("result----->",response)

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response);
        if (problem) return problem;
      }

      const result = response.data.data;
      console.log("result----->",result)
    
      if (response.status == 200) {
        return { kind: 'ok', data:response.data.data };
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
  
      const response: ApiResponse<any> = await this.api.apisauce.post(
        `${API_URL}register`,
        JSON.stringify(user) 
      );
      console.log("response",response)
      // alert(JSON.stringify(response));
      // the typical ways to die when calling an api
      // if (!response.ok) {
      //   const problem = getGeneralApiProblem(response);
      //   if (problem) return problem;
      // }

      const result = response.data;
      const isRegister =response.ok;

      return { kind: 'ok', result,isRegister:isRegister };
    } catch (e) {
      __DEV__ && console.tron.log(e.message);
      return { kind: 'bad-data' };
    }
  }

  async getOtp(): Promise<GetSignUpResult> {
    try {
      await this.api.setup();
     
      const response: ApiResponse<any> = await this.api.apisauce.get(
        // `http://18.235.61.119/api/sign_up`,
        `http://192.168.2.101:5050/api/resend/otp?user_id=${1}`
      );
      console.log("response",response)
 
      const result = response.data;
      const isRegister =response.ok;

      return { kind: 'ok', result,isRegister:isRegister };
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
    console.log("user",user)
    try {
      await this.api.setup();

      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.post(
        `${API_URL}verify-otp`,
        JSON.stringify(user)
      );
console.log("response",response.data)
      // the typical ways to die when calling an api
      // if (!response.ok) {
      //   const problem = getGeneralApiProblem(response);
      //   if (problem) return problem;
      // }


      const result = response.data;
      if(result){
        return { kind: 'ok', data:response.data ,isverify:response.ok };


      }
      // result{}

      // if (result.status === 200) {
      //   const { data } = result;
      //   return { kind: 'ok', data };
      // }

      return { kind: 'error', message: result.message };
    } catch (e) {
      __DEV__ && console.tron.log(e.message);
      return { kind: 'error', message: e.message };
    }
  }
}
