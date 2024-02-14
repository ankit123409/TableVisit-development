import  apiCall  from "../../services/Api2/ApiServiceNew"
import {  API_VENUE_DETAILS, BASE_URL_ } from "../../services/Api2/ApiConstants"

export const detailApi = {



    getVenueDetiles(params: any, onDone: (res: any) => void, onError: (error: any, errorCode?: number) => void) {
        apiCall({ baseUrl: BASE_URL_, endPoint: API_VENUE_DETAILS,params , method:"get" },
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
  