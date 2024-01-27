import {ApiResponse} from 'apisauce';
import {Api} from './api';
import {GetApiResult, GetFavoritesResult} from './api.types';
import {getGeneralApiProblem} from './api-problem';
import {AUTH_TOKEN, loadString} from '../../utils/storage';

export class FavoriteApi {
  private api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  async getFavorites(): Promise<GetFavoritesResult> {
    try {
      const token = await loadString(AUTH_TOKEN);

      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(
        'http://18.235.61.119' + '/api/user/favorites',
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

      const favorites = response.data.data;

      return {kind: 'ok', favorites};
    } catch (e) {
      __DEV__ && console.tron.log(e.message);
      return {kind: 'bad-data'};
    }
  }

  async add(place_id: number): Promise<GetApiResult> {
    try {
      const token = await loadString(AUTH_TOKEN);

      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(
        'http://18.235.61.119' + '/api/user/favorite/add/' + place_id,
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

      const result = response.data;

      return {kind: 'ok', result};
    } catch (e) {
      __DEV__ && console.tron.log(e.message);
      return {kind: 'bad-data'};
    }
  }

  async remove(id: number): Promise<GetApiResult> {
    try {
      const token = await loadString(AUTH_TOKEN);

      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(
        'http://18.235.61.119' + '/api/user/favorite/remove/' + id,
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

      const result = response.data;

      return {kind: 'ok', result};
    } catch (e) {
      __DEV__ && console.tron.log(e.message);
      return {kind: 'bad-data'};
    }
  }
}
