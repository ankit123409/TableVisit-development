import { Api } from './api';
import { GetBookingResult, GetBookingsResult } from './api.types';
import { AUTH_TOKEN, loadString } from '../../utils/storage';
import { ApiResponse } from 'apisauce';
import { getGeneralApiProblem } from './api-problem';

export class BookingApi {
  private api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  async book(obj: any): Promise<GetBookingResult> {
    try {
      const token = await loadString(AUTH_TOKEN);

      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.post(
        'http://18.235.61.119' + '/api/user/booking/book',
        JSON.stringify(obj),
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

      const booking = response.data.data;

      return { kind: 'ok', booking };
    } catch (e) {
      __DEV__ && console.tron.log(e.message);
      return { kind: 'bad-data' };
    }
  }

  async getBookings(): Promise<GetBookingsResult> {
    try {
      const token = await loadString(AUTH_TOKEN);

      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(
        'http://18.235.61.119' + '/api/user/bookings',
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

      const bookings = response.data.data;
      return { kind: 'ok', bookings };
    } catch (e) {
      __DEV__ && console.tron.log(e.message);
      return { kind: 'bad-data' };
    }
  }

  async songRequest(obj: any): Promise<any> {
    try {
      const token = await loadString(AUTH_TOKEN);

      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.post(
        'http://18.235.61.119' + '/api/song-request',
        JSON.stringify(obj),
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

    console.log("res/..", response?.data)

      return { kind: 'ok', data : response?.data };
    } catch (e) {
      __DEV__ && console.tron.log(e.message);
      return { kind: 'bad-data' };
    }
  }
}
