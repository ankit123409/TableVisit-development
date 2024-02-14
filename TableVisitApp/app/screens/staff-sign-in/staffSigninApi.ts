import  apiCall  from "../../services/Api2/ApiServiceNew"
import {   API_STAFF_LOGIN, BASE_URL_ } from "../../services/Api2/ApiConstants"

export const staffSignInApi = {



    staffLogin(params: any, onDone: (res: any) => void, onError: (error: any, errorCode?: number) => void) {
        apiCall({ baseUrl: BASE_URL_, endPoint: API_STAFF_LOGIN, params, method: "post" },
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
  