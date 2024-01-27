import {ApiResponse} from 'apisauce';
import {Api} from './api';
import {GetKeyValueResult} from './api.types';
import {getGeneralApiProblem} from './api-problem';
import {AUTH_TOKEN, loadString} from '../../utils/storage';

export class TwilioApi {
  private api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  async token(): Promise<GetKeyValueResult> {
    try {
      const token = await loadString(AUTH_TOKEN);

      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.post(
        'http://18.235.61.119' + '/api/chat/token',
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

      const result = response.data.data;

      return {kind: 'ok', result};
    } catch (e) {
      __DEV__ && console.tron.log(e.message);
      return {kind: 'bad-data'};
    }
  }
}
