import {Api} from './api';
import {GetApiResult, GetUserProfileResult} from './api.types';
import {AUTH_TOKEN, loadString} from '../../utils/storage';
import * as FileSystem from 'expo-file-system';
import {FileSystemUploadType} from 'expo-file-system';
import {ApiResponse} from 'apisauce';
import {getGeneralApiProblem} from './api-problem';

export class UserProfileApi {
  private api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  async getUserProfile(): Promise<GetUserProfileResult> {
    try {
      const token = await loadString(AUTH_TOKEN);

      const response: ApiResponse<any> = await this.api.apisauce.get(
        'http://18.235.61.119' + '/api/user/profile/load',
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

      const profile = response.data.data;

      return {kind: 'ok', profile};
    } catch (e) {
      __DEV__ && console.tron.log(e.message);
      return {kind: 'bad-data'};
    }
  }

  async uploadGovernmentId(file: string): Promise<GetApiResult> {
    const token = await loadString(AUTH_TOKEN);

    let url = 'http://18.235.61.119' + '/api/user/profile/upload_government_id';
    let result = null;

    await FileSystem.uploadAsync(url, file, {
      httpMethod: 'POST',
      uploadType: FileSystemUploadType.MULTIPART,
      fieldName: 'government_id',
      headers: {
        Authorization: token,
      },
    })
      .then(info => {
        result = {code: info.status, message: info.body};
      })
      .catch(e => {
        __DEV__ && console.tron.log(e.message);
        return {kind: 'bad-data'};
      });

    return {kind: 'ok', result};
  }

  async saveGovernmentId(government_data: any): Promise<GetApiResult> {
    try {
      const token = await loadString(AUTH_TOKEN);

      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.post(
        'http://18.235.61.119' + '/api/user/profile/save_government_id',
        JSON.stringify(government_data),
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
      __DEV__ && console.tron.log(e.message);
      return {kind: 'bad-data'};
    }
  }
}
