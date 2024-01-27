import {ApiResponse} from 'apisauce';
import {Api} from './api';
import {GetHealthResult} from './api.types';
import {getGeneralApiProblem} from './api-problem';

export class HealthApi {
  private api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  async health(): Promise<GetHealthResult> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(
        'http://18.235.61.119' + 'api/health',
        null,
      );

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response);
        if (problem) return problem;
      }

      const result = response.data;

      return {kind: 'ok', result};
    } catch (e) {
      __DEV__ && console.tron.log(e.message);
      return {kind: 'bad-data'};
    }
  }
}
