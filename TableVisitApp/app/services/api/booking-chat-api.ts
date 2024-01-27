import { Api } from './api';
import { GetApiResult, GetBookingChatsResult } from './api.types';
import { AUTH_TOKEN, loadString } from '../../utils/storage';
import { ApiResponse } from 'apisauce';
import { getGeneralApiProblem } from './api-problem';

export class BookingChatApi {
  private api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  async getBookingChats(): Promise<GetBookingChatsResult> {
    try {
      const token = await loadString(AUTH_TOKEN);

      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(
        'http://18.235.61.119' + '/api/booking/chats',
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

      const chats = response.data.data;

      return { kind: 'ok', chats };
    } catch (e) {
      __DEV__ && console.tron.log(e.message);
      return { kind: 'bad-data' };
    }
  }

  async saveBookingChat(data: any): Promise<GetApiResult> {
    try {
      const token = await loadString(AUTH_TOKEN);

      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.post(
        'http://18.235.61.119' + '/api/booking/chat/save',
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

      const result = response.data;

      return { kind: 'ok', result };
    } catch (e) {
      __DEV__ && console.tron.log(e.message);
      return { kind: 'bad-data' };
    }
  }
  async getInboxData(): Promise<GetApiResult> {
    try {
      const token = await loadString(AUTH_TOKEN);
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.post(
        'http://18.235.61.119' + '/api/getInboxDetail',
        null,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("data...", response.data)
      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response);
        if (problem) return problem;
      }
      const result = response.data;
      return { kind: 'ok', result };
    } catch (e) {
      __DEV__ && console.tron.log(e.message);
      return { kind: 'bad-data' };
    }
  }
}
