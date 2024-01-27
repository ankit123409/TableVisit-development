import {ApiResponse} from 'apisauce';
import {Api} from './api';
import {GetPoliciesResult, GetPolicyResult} from './api.types';
import {getGeneralApiProblem} from './api-problem';
import {AUTH_TOKEN, loadString} from '../../utils/storage';

export class PolicyApi {
  private api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  async getPolicies(place_id): Promise<GetPoliciesResult> {
    try {
      const token = await loadString(AUTH_TOKEN);

      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(
        'http://18.235.61.119' + '/api/place_policies/' + place_id,
        null,
        {
          headers: {
            Authorization: token,
          },
        },
      );

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response);
        if (problem) return problem;
      }

      const policies = response.data.data;

      return {kind: 'ok', policies};
    } catch (e) {
      __DEV__ && console.tron.log(e.message);
      return {kind: 'bad-data'};
    }
  }

  async getPolicy(place_id, policy_type): Promise<GetPolicyResult> {
    try {
      const token = await loadString(AUTH_TOKEN);

      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(
        'http://18.235.61.119' +
          '/api/place_policy/' +
          place_id +
          '/' +
          policy_type,
        null,
        {
          headers: {
            Authorization: token,
          },
        },
      );

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response);
        if (problem) return problem;
      }

      const policy = response.data.data;

      return {kind: 'ok', policy};
    } catch (e) {
      __DEV__ && console.tron.log(e.message);
      return {kind: 'bad-data'};
    }
  }
}
