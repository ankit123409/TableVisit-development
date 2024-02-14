import  apiCall  from "../../services/Api2/ApiServiceNew"
import {   API_RESEND_OTP, API_VERIFY_OTP, BASE_URL_ } from "../../services/Api2/ApiConstants"

export const VerifyOtpApi = {



    VerifyOtp(params: any, onDone: (res: any) => void, onError: (error: any, errorCode?: number) => void) {
        apiCall({ baseUrl: BASE_URL_, endPoint: API_VERIFY_OTP, params, method: "post" },
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
    resendOtp(params: any, onDone: (res: any) => void, onError: (error: any, errorCode?: number) => void) {
        apiCall({ baseUrl: BASE_URL_, endPoint: `resend/otp/?user_id=${1}`, method: "get" },
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
  