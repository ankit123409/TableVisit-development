import  apiCall  from "../../services/Api2/ApiServiceNew"
import {  API_ADD_GUEST, API_BOOKING_GUESTLIST, BASE_URL_ } from "../../services/Api2/ApiConstants"

export const guestListApi = {



    AddGuest(params: any, onDone: (res: any) => void, onError: (error: any, errorCode?: number) => void) {
        apiCall({ baseUrl: BASE_URL_, endPoint: API_ADD_GUEST, params, method:"post" },
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
    getGuestList(params: any, onDone: (res: any) => void, onError: (error: any, errorCode?: number) => void) {
        apiCall({ baseUrl: BASE_URL_, endPoint: `user/booking/${params.booking_id}/list/guest`, params, method:"get" },
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
    DeleteGuestList(params: any, onDone: (res: any) => void, onError: (error: any, errorCode?: number) => void) {
        apiCall({ baseUrl: BASE_URL_, endPoint: `user/booking/${params.booking_id}/delete/guest/${params.guest_id}`, params, method:"delete" },
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
    EditGuestList(params: any, onDone: (res: any) => void, onError: (error: any, errorCode?: number) => void) {
        apiCall({ baseUrl: BASE_URL_, endPoint: `user/booking/${params.booking_id}/update/guest/${params?.guest_id}`, params, method:"put" },
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
  