import {ApiResponse} from 'apisauce';
import {Api} from './api';
import {GetCitiesSearchResult, GetCitiesTopResult} from './api.types';
import {getGeneralApiProblem} from './api-problem';
import {AUTH_TOKEN, loadString} from '../../utils/storage';

export class CityApi {
  private api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  async getCitiesTop(): Promise<GetCitiesTopResult> {
    try {
      const token = await loadString(AUTH_TOKEN);

      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(
        'http://18.235.61.119' + '/api/cities/top',
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

      const cities_top = response.data.data;

      return {kind: 'ok', cities_top};
    } catch (e) {
      __DEV__ && console.tron.log(e.message);
      return {kind: 'bad-data'};
    }
  }

  async getCitiesSearch(word): Promise<GetCitiesSearchResult> {
    try {
      const token = await loadString(AUTH_TOKEN);

      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.post(
        'http://18.235.61.119' + '/api/cities/search',
        JSON.stringify({word: word}),
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

      const cities_search = response.data.data;

      return {kind: 'ok', cities_search};
    } catch (e) {
      __DEV__ && console.tron.log(e.message);
      return {kind: 'bad-data'};
    }
  }
}
