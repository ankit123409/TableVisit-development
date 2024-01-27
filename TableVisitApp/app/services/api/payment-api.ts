import {ApiResponse} from 'apisauce';
import {Api} from './api';
import {GetApiResult, GetStripeResult} from './api.types';
import {getGeneralApiProblem} from './api-problem';
import {AUTH_TOKEN, loadString} from '../../utils/storage';

export class PaymentApi {
  private api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  async getStripe(amount: number): Promise<GetStripeResult> {
    try {
      const token = await loadString(AUTH_TOKEN);

      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.post(
        'http://18.235.61.119' + '/api/payments/stripe',
        {
          amount: amount,
        },
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

      const stripe = response.data.data;

      return {kind: 'ok', stripe};
    } catch (e) {
      __DEV__ && console.tron.log(e.message);
      return {kind: 'bad-data'};
    }
  }

  async add(data: any): Promise<GetApiResult> {
    try {
      const token = await loadString(AUTH_TOKEN);

      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.post(
        'http://18.235.61.119' + '/api/payments/add',
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

      const result = response.data.data;

      return {kind: 'ok', result};
    } catch (e) {
      __DEV__ && console.tron.log(e.message);
      return {kind: 'bad-data'};
    }
  }
}
