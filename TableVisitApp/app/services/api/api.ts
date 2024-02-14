import {ApisauceInstance, create} from 'apisauce';
import {ApiConfig, DEFAULT_API_CONFIG,BASE_URL} from './api-config';

/**
 * Manages all requests to the API.
 */
export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce: ApisauceInstance;

  /**
   * Configurable options.
   */
  config: ApiConfig;

  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config;
  }

  /**
   * Sets up the API.  This will be called during the bootup
   * sequence and will happen before the first React component
   * is mounted.
   *
   * Be as quick as possible in here.
   */
  async setup() {
    // construct the apisauce instance
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: 'application/json',
      },
    });
  }

  /*async getUsers(): Promise<Types.GetUsersResult> {
      // make the api call
      const response: ApiResponse<any> = await this.apisauce.get(`/users`)

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const convertUser = (raw) => {
        return {
          id: raw.id,
          name: raw.name,
        }
      }

      try {
        const rawUsers = response.data
        const resultUsers: Types.User[] = rawUsers.map(convertUser)
        return { kind: "ok", users: resultUsers }
      } catch {
        return { kind: "bad-data" }
      }
    }*/

  /*async getUser(id: string): Promise<Types.GetUserResult> {
      const response: ApiResponse<any> = await this.apisauce.get(`/users/${id}`)

      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      try {
        const resultUser: Types.User = {
          id: response.data.id,
          name: response.data.name,
        }
        return { kind: "ok", user: resultUser }
      } catch {
        return { kind: "bad-data" }
      }
    }*/
}
