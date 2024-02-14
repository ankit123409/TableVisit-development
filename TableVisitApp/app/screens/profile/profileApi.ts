import  apiCall  from "../../services/Api2/ApiServiceNew"
import {  API_DELETE_PROFILE, API_GET_PROFILE, API_UPDATE_PROFILE, BASE_URL_ } from "../../services/Api2/ApiConstants"

export const profileApi = {



    getProfile(params: any, onDone: (res: any) => void, onError: (error: any, errorCode?: number) => void) {
        apiCall({ baseUrl: BASE_URL_, endPoint: API_GET_PROFILE, params, method:"get" },
            (res: any) => {
                if (onDone) {
                    onDone(res)
                }
            },
            (error, errorCode?: number) => {
                if (onError) {
                    onError(error, errorCode)
                }
            }
        )
    },
    editProfile(params: any, onDone: (res: any) => void, onError: (error: any, errorCode?: number) => void) {
        apiCall({ baseUrl: BASE_URL_, endPoint: API_UPDATE_PROFILE, params, method:"put" },
            (res: any) => {
                if (onDone) {
                    onDone(res)
                }
            },
            (error, errorCode?: number) => {
                if (onError) {
                    onError(error, errorCode)
                }
            }
        )
    },
    deleteProfile(params: any, onDone: (res: any) => void, onError: (error: any, errorCode?: number) => void) {
        apiCall({ baseUrl: BASE_URL_, endPoint: API_DELETE_PROFILE, params, method:"delete" },
            (res: any) => {
                if (onDone) {
                    onDone(res)
                }
            },
            (error, errorCode?: number) => {
                if (onError) {
                    onError(error, errorCode)
                }
            }
        )
    },
}
  