import { ApiResponse } from 'apisauce';
import { Api } from './api';
import { GetStaffTableSpendsResult } from './api.types';
import { getGeneralApiProblem } from './api-problem';
import { AUTH_TOKEN, loadString } from '../../utils/storage';

export class StaffTableSpendApi {
  private api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  async getStaffTableSpends(data: any): Promise<GetStaffTableSpendsResult> {
    try {
      const token = await loadString(AUTH_TOKEN);

      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.post(
        'http://18.235.61.119' + '/api/staff/table-spends',
        JSON.stringify(data),
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

      const table_spends = response.data.data;
      // console.log("table spends", table_spends)
      return { kind: 'ok', table_spends };
    } catch (e) {
      __DEV__ && console.tron.log(e.message);
      return { kind: 'bad-data' };
    }
  }

  async getTableBookingDetail(data: any): Promise<GetStaffTableSpendsResult> {
    try {
      const token = await loadString(AUTH_TOKEN);

      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.post(
        'http://18.235.61.119' + '/api/table-booking-detail',
        JSON.stringify(data),
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
      const table_spends = response.data.data;
      return { kind: 'ok', table_spends };
    } catch (e) {
      __DEV__ && console.tron.log(e.message);
      return { kind: 'bad-data' };
    }
  }
}
