import { ApiResponse } from 'apisauce';
import { Api } from './api';
import { GetApiResult, GetUserResult } from './api.types';
import { getGeneralApiProblem } from './api-problem';
import { AUTH_TOKEN, loadString } from '../../utils/storage';
export class UserApi {
  private api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  async getUser(id: number): Promise<GetUserResult> {
    try {
      const token = await loadString(AUTH_TOKEN);

      const response: ApiResponse<any> = await this.api.apisauce.get(
        'http://18.235.61.119' + '/api/user/find/' + id,
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

      const user = response.data.data;

      return { kind: 'ok', user };
    } catch (e) {
      __DEV__ && console.tron.log(e.message);
      return { kind: 'bad-data' };
    }
  }

  async update(user: any): Promise<GetApiResult> {
    try {
      const token = await loadString(AUTH_TOKEN);

      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.post(
        'http://18.235.61.119' + '/api/user/profile/update',
        JSON.stringify(user),
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log('respon=>', response);
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

  async uploadAvatar(file: string): Promise<GetApiResult> {
    const token = await loadString(AUTH_TOKEN);

    // let url = 'http://18.235.61.119' + '/api/user/profile/upload_avatar';
    // let result = null;

    console.log('file...', file?.assets?.[0]?.fileSize / 1000 / 1000);
    const formData = new FormData();
    formData.append('avatar', {
      uri: file?.assets?.[0]?.uri,
      type: 'image/jpeg', // Modify the type as needed
      name: file?.assets?.[0]?.fileName,
    });

    const response: ApiResponse<any> = await this.api.apisauce.post(
      'http://18.235.61.119' + '/api/user/profile/upload_avatar',
      formData, // Send the FormData
      {
        headers: {
          Authorization: token,
          'Content-Type': 'multipart/form-data', // Set the content type for FormData
        },
      }
    );

    // await FileSystem.uploadAsync(url, file, {
    //   httpMethod: 'POST',
    //   uploadType: FileSystemUploadType.MULTIPART,
    //   fieldName: 'avatar',
    //   headers: {
    //     Authorization: token,
    //   },
    // })
    //   .then((info) => {
    //     console.log('info..', info);
    //     result = { code: info.status, message: info.body };
    //   })
    //   .catch((e) => {
    //     console.log('e......', e);
    //     __DEV__ && console.tron.log(e.message);
    //     return { kind: 'bad-data' };
    //   });

    return { kind: 'ok', result: response.data };
  }

  async deleteAccount(): Promise<GetApiResult> {
    try {
      const token = await loadString(AUTH_TOKEN);
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.delete(
        'http://18.235.61.119' + '/api/user/profile/delete_account',
        null,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      // the typical ways to die when calling an api
      if (!response.ok) {
        console.log('if');
        const problem = getGeneralApiProblem(response);
        if (problem) return problem;
      }

      const result = response?.message;

      return { kind: 'ok', result };
    } catch (e) {
      __DEV__ && console.tron.log(e.message);
      return { kind: 'bad-data' };
    }
  }

  async logout(): Promise<GetApiResult> {
    try {
      const token = await loadString(AUTH_TOKEN);
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(
        'http://18.235.61.119' + '/api/logout',
        null,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      // the typical ways to die when calling an api
      if (!response.ok) {
        console.log('if');
        const problem = getGeneralApiProblem(response);
        if (problem) return problem;
      }

      const result = response?.message;

      return { kind: 'ok', result };
    } catch (e) {
      __DEV__ && console.tron.log(e.message);
      return { kind: 'bad-data' };
    }
  }
}
