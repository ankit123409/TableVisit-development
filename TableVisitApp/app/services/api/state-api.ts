import { ApiResponse } from 'apisauce';
import { Api } from './api';
import { GetStatesResult } from './api.types';
import { getGeneralApiProblem } from './api-problem';
import { AUTH_TOKEN, loadString } from '../../utils/storage';

export class StateApi {
  private api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  async getStates(): Promise<GetStatesResult> {
    try {
      const token = await loadString(AUTH_TOKEN);
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(
        'http://18.235.61.119' + '/api/states',
        null,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      console.log('response,,', response.ok, response.status, response.problem);
      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response);
        if (problem) return problem;
      }

      const states = response.data.data;

      return { kind: 'ok', states };
    } catch (e) {
      __DEV__ && console.tron.log(e.message);
      return { kind: 'bad-data' };
    }
  }
}
