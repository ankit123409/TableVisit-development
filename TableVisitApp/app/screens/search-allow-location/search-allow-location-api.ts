import  apiCall  from "../../services/Api2/ApiServiceNew"
import { API_CITY_SEARCH, BASE_URL_ } from "../../services/Api2/ApiConstants"

export const searchAllowLocationApi = {



    getCitiesSearch(params: any, onDone: (res: any) => void, onError: (error: any, errorCode?: number) => void) {
        apiCall({ baseUrl: BASE_URL_, endPoint: API_CITY_SEARCH, params, method:"get" },
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
  