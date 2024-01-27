import { ApiResponse } from 'apisauce';
import { Api } from './api';
import {
  GetTableRateResult,
  GetTableRatesResult,
  GetTableResult,
  GetTablesResult,
} from './api.types';
import { getGeneralApiProblem } from './api-problem';
import { AUTH_TOKEN, loadString } from '../../utils/storage';

export class TableApi {
  private api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  async getTables(place_id): Promise<GetTablesResult> {
    try {
      const token = await loadString(AUTH_TOKEN);

      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(
        'http://18.235.61.119' + '/api/tables/' + place_id,
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

      const tables = response.data.data;
      console.log("called,,,", place_id, response.data)
      return { kind: 'ok', tables };
    } catch (e) {
      __DEV__ && console.tron.log(e.message);
      return { kind: 'bad-data' };
    }
  }

  async getTablesWithDate(place_id, date): Promise<GetTablesResult> {
    try {
      const token = await loadString(AUTH_TOKEN);

      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.post(
        'http://18.235.61.119' + '/api/tables/with-date',
        {
          place_id: place_id,
          date: date,
        },
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

      const tables = response.data.data;
      
      return { kind: 'ok', tables };
    } catch (e) {
      __DEV__ && console.tron.log(e.message);
      return { kind: 'bad-data' };
    }
  }

  async getTable(id): Promise<GetTableResult> {
    try {
      const token = await loadString(AUTH_TOKEN);

      // make the api call
      console.log("id", id)
      const response: ApiResponse<any> = await this.api.apisauce.get(
        'http://18.235.61.119' + '/api/table/' + id,
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

      const table = response.data.data;
      return { kind: 'ok', table };
    } catch (e) {
      __DEV__ && console.tron.log(e.message);
      return { kind: 'bad-data' };
    }
  }

  async getRates(table_id, date): Promise<GetTableRatesResult> {
    try {
      const token = await loadString(AUTH_TOKEN);

      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.post(
        'http://18.235.61.119' + '/api/tables/rates',
        {
          table_id: table_id,
          date: date,
        },
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

  async getRate(table_id, date): Promise<GetTableRateResult> {
    try {
      const token = await loadString(AUTH_TOKEN);

      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.post(
        'http://18.235.61.119' + '/api/tables/rate',
        {
          table_id: table_id,
          date: date,
        },
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

      const rate = response.data.data;

      return { kind: 'ok', rate };
    } catch (e) {
      __DEV__ && console.tron.log(e.message);
      return { kind: 'bad-data' };
    }
  }
}
