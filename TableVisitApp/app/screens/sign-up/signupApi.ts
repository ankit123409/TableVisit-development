import  apiCall  from "../../services/Api2/ApiServiceNew"
import {  API_REGISTER, BASE_URL_ } from "../../services/Api2/ApiConstants"

export const signinApi = {



    Register(params: any, onDone: (res: any) => void, onError: (error: any, errorCode?: number) => void) {
        apiCall({ baseUrl: BASE_URL_, endPoint: API_REGISTER, params, method: "post" },
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
  