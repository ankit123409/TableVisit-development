import { appConfig } from './Config'
import { ENV_LIVE } from './Config'


export const BASE_URL_= 'http://192.168.2.100:5050/api/' 
// export const BASE_URL_= 'https://dev-api.tablevisit.com/api/' 
export const API_LOGIN = 'login';
export const API_REGISTER = 'register';
export const API_CITY_SEARCH = 'user/venues';
export const API_VENUE_DETAILS = 'user/venue'; 
export const API_BOTTLE_MENU = 'user/venue/bottles-menu'; 
export const API_FOOD_MENU = 'user/venue/food-menu'; 
export const API_GET_TABLELIST = 'user/venue-tables/list'; 
export const API_GET_TABLEDETAILS="user/venue-tables"
export const API_GET_CLIENT_SECRET="user/booking/get-client-secret"
export const API_GET_BOOKING="user/booking/list"
export const API_POST_BOOKING="user/booking/create"
export const API_GET_BOOKING_DETAILS="user/booking"
export const API_FORGOT_PASSWORD="forgot-password"
export const API_RESET_PASSWORD ="reset-password"
export const API_VERIFY_OTP ="verify-otp"
export const API_RESEND_OTP="resend/otp"

export const API_ADD_GUEST ="user/booking/add/guest"
export const API_USER_UPDATE_BOOKING ="user/booking/update"
export const API_BOOKING_GUESTLIST ="user/booking/list/guest"
export const API_GET_PROFILE ="profile"
export const API_UPDATE_PROFILE ="profile/update"
export const API_DELETE_PROFILE ="delete"
export const API_CLOSE_TABLE ="user/booking/close-table"
export const API_DELETE_PRE_BOOKING ="user/delete/pre-booking"
export const API_STAFF_LOGIN ="staff/login"
export const API_GET_VENUE_BOOKING ="staff/venue/booking/list"
export const API_GET_ACCEPTED_LIST ="staff/venue/accepted-bookings/list"
export const API_POST_ACCEPTED ="staff/venue/accept/booking"































































