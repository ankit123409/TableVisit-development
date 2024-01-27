import {ApiResponse} from 'apisauce';
import {Api} from './api';
import {GetApiResult, GetBookingGuestsResult} from './api.types';
import {getGeneralApiProblem} from './api-problem';
import {AUTH_TOKEN, loadString} from '../../utils/storage';

export class BookingGuestApi {
  private api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  async getBookingGuests(booking_id: number): Promise<GetBookingGuestsResult> {
    try {
      const token = await loadString(AUTH_TOKEN);

      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(
        'http://18.235.61.119' + '/api/booking/guests/' + booking_id,
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

      const booking_guests = response.data.data;

      return {kind: 'ok', booking_guests};
    } catch (e) {
      __DEV__ && console.log(e.message);
      return {kind: 'bad-data'};
    }
  }

  async save(data: any): Promise<GetApiResult> {
    try {
      const token = await loadString(AUTH_TOKEN);

      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.post(
        'http://18.235.61.119' + '/api/booking/guest/save',
        JSON.stringify(data),
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
      __DEV__ && console.log(e.message);
      return {kind: 'bad-data'};
    }
  }

  async remove(id: number): Promise<GetApiResult> {
    try {
      const token = await loadString(AUTH_TOKEN);

      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(
        'http://18.235.61.119' + '/api/booking/guest/remove/' + id,
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
      __DEV__ && console.log(e.message);
      return {kind: 'bad-data'};
    }
  }
}
