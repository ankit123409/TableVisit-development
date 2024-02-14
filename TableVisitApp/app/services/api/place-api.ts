import { ApiResponse } from 'apisauce';
import { Api } from './api';
import {
  GetFeaturedByCityResult,
  GetFeaturedPlacesResult,
  GetNearPlacesResult,
  GetPlaceResult,
  GetPlacesByCityResult,
  GetSearchPlacesResult,
} from './api.types';
import { getGeneralApiProblem } from './api-problem';
import { AUTH_TOKEN, loadString } from '../../utils/storage';
import { API_URL } from './api-config';

export class PlaceApi {
  private api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  async getNearByCity(city_id): Promise<GetPlacesByCityResult> {
    try {
      const token = await loadString(AUTH_TOKEN);
    
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(
        'http://18.235.61.119' + '/api/places/near_by_city/' + city_id,
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

      const near_by_city = response.data.data;
      console.log("Rekj", near_by_city)
      return { kind: 'ok', near_by_city };
    } catch (e) {
      __DEV__ && console.tron.log(e.message);
      return { kind: 'bad-data' };
    }
  }

  async getNearByCities(): Promise<GetPlacesByCityResult> {
    try {
      const token = await loadString(AUTH_TOKEN);
    
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(
        // 'http://18.235.61.119' + '/api/places/near_by_cities',
        `${API_URL}places/near_by_cities`,

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

      const near_by_city = response.data.data;
      console.log("Rekj", near_by_city)
      return { kind: 'ok', near_by_city };
    } catch (e) {
      __DEV__ && console.tron.log(e.message);
      return { kind: 'bad-data' };
    }
  }

  async getFeaturedByCity(city_id): Promise<GetFeaturedByCityResult> {
    try {
      const token = await loadString(AUTH_TOKEN);

      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(
        'http://18.235.61.119' + '/api/places/featured_by_city/' + city_id,
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

      const featured_by_city = response.data.data;

      return { kind: 'ok', featured_by_city };
    } catch (e) {
      __DEV__ && console.tron.log(e.message);
      return { kind: 'bad-data' };
    }
  }

  async getVenueDetiles(venue_id): Promise<GetFeaturedByCityResult> {
    try {
      const token = await loadString(AUTH_TOKEN);

      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(
        `${API_URL}user/venue/${venue_id}`,
        null
        ,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      console.log("responseDetiles",response.ok)

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response);
        if (problem) return problem;
      }

      const place = response.data.data;

      return { kind: 'ok', place };
    } catch (e) {
      __DEV__ && console.tron.log(e.message);
      return { kind: 'bad-data' };
    }
  }

  async getFeatured(): Promise<GetFeaturedPlacesResult> {
    try {
      const token = await loadString(AUTH_TOKEN);

      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(
        'http://18.235.61.119' + '/api/places/featured',
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

      const featured_places = response.data.data;

      return { kind: 'ok', featured_places };
    } catch (e) {
      __DEV__ && console.tron.log(e.message);
      return { kind: 'bad-data' };
    }
  }

  async getNear(): Promise<GetNearPlacesResult> {
    try {
      const token = await loadString(AUTH_TOKEN);

      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(
        'http://18.235.61.119' + '/api/places/near',
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

      const near_places = response.data.data;

      return { kind: 'ok', near_places };
    } catch (e) {
      __DEV__ && console.tron.log(e.message);
      return { kind: 'bad-data' };
    }
  }

  async getPlace(id): Promise<GetPlaceResult> {
    try {
      const token = await loadString(AUTH_TOKEN);

      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(
        'http://18.235.61.119' + '/api/place/' + id,
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

      const place = response.data.data;
      return { kind: 'ok', place };
    } catch (e) {
      __DEV__ && console.tron.log(e.message);
      return { kind: 'bad-data' };
    }
  }

  async getSearch(
    word: string,
    city_id: number
  ): Promise<GetSearchPlacesResult> {
    try {
      const token = await loadString(AUTH_TOKEN);
      console.log("app..", word)
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.post(
        'http://18.235.61.119' + '/api/places/search',
        JSON.stringify({
          word: word,
          // city_id: city_id,
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

      const search_places = response.data.data;
      return { kind: 'ok', search_places };
    } catch (e) {
      __DEV__ && console.tron.log(e.message);
      return { kind: 'bad-data' };
    }
  }

  async checkIn(payload: any): Promise<any> {
    try {
      const token = await loadString(AUTH_TOKEN);

      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.post(
        'http://18.235.61.119' + '/api/check-in',
        JSON.stringify(payload),
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
      const data = response.data;

      return { kind: 'ok', data };
    } catch (e) {
      __DEV__ && console.tron.log(e.message);
      return { kind: 'bad-data' };
    }
  }
}
