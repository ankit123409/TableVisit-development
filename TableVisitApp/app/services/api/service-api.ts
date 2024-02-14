import { ApiResponse } from 'apisauce';
import { Api } from './api';
import { GetRatesResult } from './api.types';
import { getGeneralApiProblem } from './api-problem';
import { AUTH_TOKEN, loadString } from '../../utils/storage';
import { API_URL } from './api-config';

export class ServiceApi {
  private api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  async getRates(place_id): Promise<GetRatesResult> {
    try {
      const token = await loadString(AUTH_TOKEN);
      console.log('place_id', place_id);
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(
        'http://18.235.61.119' + '/api/services/rates/' + place_id,
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

      const rates = response.data.data;
      return { kind: 'ok', rates };
    } catch (e) {
      __DEV__ && console.tron.log(e.message);
      return { kind: 'bad-data' };
    }
  }
  async getFoodMenu(venue_id): Promise<GetRatesResult> {
    try {
      const token = await loadString(AUTH_TOKEN);
      console.log('place_id', venue_id);
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(
        `${API_URL}user/venue/food-menu/${venue_id}`,

        // 'http://18.235.61.119' + '/api/services/rates/' + place_id,
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

      const rates = response.data.data;
      return { kind: 'ok', rates };
    } catch (e) {
      __DEV__ && console.tron.log(e.message);
      return { kind: 'bad-data' };
    }
  }
  async getBottleMenu(venue_id): Promise<GetRatesResult> {
    try {
      const token = await loadString(AUTH_TOKEN);
      console.log('place_id', venue_id);
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(
        `${API_URL}user/venue/bottles-menu/${venue_id}`,

        // 'http://18.235.61.119' + '/api/services/rates/' + place_id,
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

      const rates = response.data.data;
      return { kind: 'ok', rates };
    } catch (e) {
      __DEV__ && console.tron.log(e.message);
      return { kind: 'bad-data' };
    }
  }
}
