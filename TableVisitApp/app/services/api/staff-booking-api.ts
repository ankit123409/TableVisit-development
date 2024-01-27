import { Api } from './api';
import {
  GetApiResult,
  GetNotificationsResult,
  GetStaffBookingResult,
  GetStaffBookingsAssignedResult,
  GetStaffBookingsInboxResult,
} from './api.types';
import { AUTH_TOKEN, loadString } from '../../utils/storage';
import { ApiResponse } from 'apisauce';
import { getGeneralApiProblem } from './api-problem';

export class StaffBookingApi {
  private api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  async getStaffBookingsInbox(
    search: string
  ): Promise<GetStaffBookingsInboxResult> {
    try {
      const token = await loadString(AUTH_TOKEN);

      const response: ApiResponse<any> = await this.api.apisauce.post(
        'http://18.235.61.119' + '/api/staff/bookings/inbox',
        {
          search: search,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log('called', response);
      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response);
        if (problem) return problem;
      }

      const inbox_bookings = response.data.data;

      return { kind: 'ok', inbox_bookings };
    } catch (e) {
      __DEV__ && console.tron.log(e.message);
      return { kind: 'bad-data' };
    }
  }

  async getStaffBookingsAssigned(
    search: string
  ): Promise<GetStaffBookingsAssignedResult> {
    try {
      const token = await loadString(AUTH_TOKEN);

      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.post(
        'http://18.235.61.119' + '/api/staff/bookings/assigned',
        {
          search: search,
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
      // console.log("assignmed",response.data.data)
      const assigned_bookings = response.data.data;
      return { kind: 'ok', assigned_bookings };
    } catch (e) {
      __DEV__ && console.tron.log(e.message);
      return { kind: 'bad-data' };
    }
  }

  async getStaffBooking(id: number): Promise<GetStaffBookingResult> {
    try {
      const token = await loadString(AUTH_TOKEN);

      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(
        'http://18.235.61.119' + '/api/staff/booking/' + id,
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

      const booking = response.data.data;

      return { kind: 'ok', booking };
    } catch (e) {
      __DEV__ && console.tron.log(e.message);
      return { kind: 'bad-data' };
    }
  }

  async assignBooking(data: any): Promise<GetApiResult> {
    try {
      const token = await loadString(AUTH_TOKEN);

      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.post(
        'http://18.235.61.119' + '/api/staff/booking/assign',
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
  async bookingRequestList(data: any): Promise<GetApiResult> {
    try {
      const token = await loadString(AUTH_TOKEN);

      const response: ApiResponse<any> = await this.api.apisauce.post(
        'http://18.235.61.119' + '/api/staff/request-list',
        JSON.stringify(data),
        {
          headers: {
            Authorization: token,
          },
        }
      );

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

  async closeBooking(data: any): Promise<GetApiResult> {
    try {
      const token = await loadString(AUTH_TOKEN);

      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.post(
        'http://18.235.61.119' + '/api/staff/booking/close',
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

  async cancelBooking(data: any): Promise<GetApiResult> {
    try {
      const token = await loadString(AUTH_TOKEN);

      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.post(
        'http://18.235.61.119' + '/api/staff/booking/cancel',
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

  async getNotifications(): Promise<GetNotificationsResult> {
    try {
      const token = await loadString(AUTH_TOKEN);

      const response: ApiResponse<any> = await this.api.apisauce.get(
        'http://18.235.61.119' + '/api/notifications',
        null,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (!response.ok) {
        const problem = getGeneralApiProblem(response);
        if (problem) return problem;
      }
      const res = response.data.data;

      return { kind: 'ok', data: res };
    } catch (e) {
      __DEV__ && console.tron.log(e.message);
      return { kind: 'bad-data' };
    }
  }
}
