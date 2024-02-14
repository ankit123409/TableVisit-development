import  apiCall  from "../../services/Api2/ApiServiceNew"
import { API_GET_TABLELIST, API_LOGIN, BASE_URL_ } from "../../services/Api2/ApiConstants"

export const tableApi = {



    getTablesWithDate(params: any, onDone: (res: any) => void, onError: (error: any, errorCode?: number) => void) {
        apiCall({ baseUrl: BASE_URL_, endPoint: API_GET_TABLELIST, params, method: "get" },
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
  