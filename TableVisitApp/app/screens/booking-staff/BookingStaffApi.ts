import  apiCall  from "../../services/Api2/ApiServiceNew"
import {  API_BOTTLE_MENU, API_GET_ACCEPTED_LIST, API_GET_VENUE_BOOKING, API_POST_ACCEPTED, BASE_URL_ } from "../../services/Api2/ApiConstants"

export const BookingStaffApi = {



    getAcceptedRequest(params: any, onDone: (res: any) => void, onError: (error: any, errorCode?: number) => void) {
        apiCall({ baseUrl: BASE_URL_, endPoint: API_GET_ACCEPTED_LIST,params , method:"get" },
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
    getRequestList(params: any, onDone: (res: any) => void, onError: (error: any, errorCode?: number) => void) {
        apiCall({ baseUrl: BASE_URL_, endPoint: API_GET_VENUE_BOOKING,params , method:"get" },
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
    AcceptRequest(params: any, onDone: (res: any) => void, onError: (error: any, errorCode?: number) => void) {
        apiCall({ baseUrl: BASE_URL_, endPoint: API_POST_ACCEPTED,params , method:"get" },
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
  