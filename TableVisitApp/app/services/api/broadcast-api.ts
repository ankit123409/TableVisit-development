import { ApiResponse } from 'apisauce';
import { Api } from './api';
import { GetApiResult } from './api.types';
import { getGeneralApiProblem } from './api-problem';
import { AUTH_TOKEN, loadString } from '../../utils/storage';

export class BroadcastApi {
  private api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  async paymentRequest(booking_id: number): Promise<GetApiResult> {
    try {
      const token = await loadString(AUTH_TOKEN);

      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.post(
        'http://18.235.61.119' + '/api/broadcast/payment/request',
        JSON.stringify({
          booking_id: booking_id,
        }),
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

      const result = response.data.data;

      return { kind: 'ok', result };
    } catch (e) {
      __DEV__ && console.log(e.message);
      return { kind: 'bad-data' };
    }
  }

  async messageSent(data: any): Promise<GetApiResult> {
    try {
      const token = await loadString(AUTH_TOKEN);
      console.log('data', 'http://18.235.61.119' + '/api/chatDetails');
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.post(
        'http://18.235.61.119' + '/api/broadcast/message/sent',
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

      const result = response.data.data;

      return { kind: 'ok', result };
    } catch (e) {
      __DEV__ && console.log(e.message);
      return { kind: 'bad-data' };
    }
  }

  async chatSend(data: any): Promise<GetApiResult> {
    // console.log("data",this.api + "/api/chatDetails");
    try {
      const token = await loadString(AUTH_TOKEN);

      // delete data.name;
      delete data.code;
      delete data.title;
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.post(
        'http://18.235.61.119' + '/api/chatDetails',
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

      const result = response.data.data;
      console.log('resuklt', result);
      return { kind: 'ok', result };
    } catch (e) {
      __DEV__ && console.log(e.message);
      return { kind: 'bad-data' };
    }
  }
  async getChatSend(data: any): Promise<GetApiResult> {
    try {
      const token = await loadString(AUTH_TOKEN);
      // make the api call
      // console.log("getChatSend",data);
      delete data.code;
      delete data.title;
      delete data.name;
      // delete data.table_id;
      const response: ApiResponse<any> = await this.api.apisauce.post(
        'http://18.235.61.119' + '/api/getChatDetails',
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

      const result = response.data.data;
      // console.log("resuklt",result)
      return { kind: 'ok', result };
    } catch (e) {
      __DEV__ && console.log(e.message);
      return { kind: 'bad-data' };
    }
  }
}
