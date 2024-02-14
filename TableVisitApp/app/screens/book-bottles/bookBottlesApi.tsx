import  apiCall  from "../../services/Api2/ApiServiceNew"
import {  API_BOTTLE_MENU, BASE_URL_ } from "../../services/Api2/ApiConstants"

export const bookBottlesApi = {



    getBottleMenu(params: any, onDone: (res: any) => void, onError: (error: any, errorCode?: number) => void) {
        apiCall({ baseUrl: BASE_URL_, endPoint: API_BOTTLE_MENU,params , method:"get" },
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
  