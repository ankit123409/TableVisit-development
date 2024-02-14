import  apiCall  from "../../services/Api2/ApiServiceNew"
import {   API_CLOSE_TABLE, API_GET_BOOKING_DETAILS, API_USER_UPDATE_BOOKING, BASE_URL_ } from "../../services/Api2/ApiConstants"

export const bookingPaymentApi = {



    closeTable(params: any, onDone: (res: any) => void, onError: (error: any, errorCode?: number) => void) {
        apiCall({ baseUrl: BASE_URL_, endPoint: API_CLOSE_TABLE,params , method:"post" },
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
        )},


        updateBooking(params: any, onDone: (res: any) => void, onError: (error: any, errorCode?: number) => void) {
            apiCall({ baseUrl: BASE_URL_, endPoint: API_USER_UPDATE_BOOKING,params , method:"put" },
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
  