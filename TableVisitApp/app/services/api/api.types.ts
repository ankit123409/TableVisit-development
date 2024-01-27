import { GeneralApiProblem } from './api-problem';
import {
  ApiResponse,
  Auth,
  City,
  Country,
  Health,
  Place,
  PlaceFeature,
  PlaceMusic,
  ServiceRate,
  User,
  UserProfile,
  Booking,
  State,
  Table,
  Policy,
  TableRate,
  Stripe,
  Rating,
  KeyValue,
  TableSpend,
  StaffBooking,
  BookingChat,
  UserSetting,
  BookingGuest,
} from '../../models';
import { Notifications } from '../../models/notifications-model/notifications-model';

/*export interface User {
  id: number
  name: string
}

export type GetUsersResult = { kind: "ok"; users: User[] } | GeneralApiProblem
export type GetUserResult = { kind: "ok"; user: User } | GeneralApiProblem

export type GetCharactersResult = { kind: "ok"; characters: Character[] } | GeneralApiProblem
export type GetCharacterResult = { kind: "ok"; character: Character } | GeneralApiProblem*/

// Auth
export type GetAuthResult = { kind: 'ok'; data: Auth } | GeneralApiProblem;
export type GetSignUpResult =
  | { kind: 'ok'; result: ApiResponse }
  | GeneralApiProblem;
export type GetLoggedUserResult =
  | { kind: 'ok'; user: User }
  | GeneralApiProblem;

// ApiResult
export type GetApiResult =
  | { kind: 'ok'; result: ApiResponse }
  | GeneralApiProblem;

// Health
export type GetHealthResult =
  | { kind: 'ok'; result: Health }
  | GeneralApiProblem;

// User
export type GetUserResult = { kind: 'ok'; user: User } | GeneralApiProblem;

// User Profile
export type GetUserProfileResult =
  | { kind: 'ok'; profile: UserProfile }
  | GeneralApiProblem;

// Locations
export type GetStatesResult =
  | { kind: 'ok'; states: State[] }
  | GeneralApiProblem;
export type GetCitiesTopResult =
  | { kind: 'ok'; cities_top: City[] }
  | GeneralApiProblem;
export type GetCitiesSearchResult =
  | { kind: 'ok'; cities_search: City[] }
  | GeneralApiProblem;
export type GetCountriesResult =
  | { kind: 'ok'; countries: Country[] }
  | GeneralApiProblem;
export type GetCountriesSearchResult =
  | { kind: 'ok'; countries_search: Country[] }
  | GeneralApiProblem;

// Places
export type GetPlacesByCityResult =
  | { kind: 'ok'; near_by_city: Place[] }
  | GeneralApiProblem;
export type GetFeaturedByCityResult =
  | { kind: 'ok'; featured_by_city: Place[] }
  | GeneralApiProblem;
export type GetPlaceResult = { kind: 'ok'; place: Place } | GeneralApiProblem;
export type GetFeaturedPlacesResult =
  | { kind: 'ok'; featured_places: Place[] }
  | GeneralApiProblem;
export type GetNearPlacesResult =
  | { kind: 'ok'; near_places: Place[] }
  | GeneralApiProblem;
export type GetSearchPlacesResult =
  | { kind: 'ok'; search_places: Place[] }
  | GeneralApiProblem;

export type GetPlaceMusicResult =
  | { kind: 'ok'; results: PlaceMusic[] }
  | GeneralApiProblem;
export type GetPlaceFeaturesResult =
  | { kind: 'ok'; results: PlaceFeature[] }
  | GeneralApiProblem;

// Services
export type GetRatesResult =
  | { kind: 'ok'; rates: ServiceRate[] }
  | GeneralApiProblem;

// Tables
export type GetTablesResult =
  | { kind: 'ok'; tables: Table[] }
  | GeneralApiProblem;
export type GetTableResult = { kind: 'ok'; table: Table } | GeneralApiProblem;
export type GetTableRateResult =
  | { kind: 'ok'; rate: TableRate }
  | GeneralApiProblem;
export type GetTableRatesResult =
  | { kind: 'ok'; rates: TableRate[] }
  | GeneralApiProblem;

// Favorites
export type GetFavoritesResult =
  | { kind: 'ok'; favorites: Place[] }
  | GeneralApiProblem;

// Policies
export type GetPoliciesResult =
  | { kind: 'ok'; policies: Policy[] }
  | GeneralApiProblem;
export type GetPolicyResult =
  | { kind: 'ok'; policy: Policy }
  | GeneralApiProblem;

// Payments
export type GetStripeResult =
  | { kind: 'ok'; stripe: Stripe }
  | GeneralApiProblem;

// Bookings
export type GetBookingResult =
  | { kind: 'ok'; booking: Booking }
  | GeneralApiProblem;
export type GetBookingsResult =
  | { kind: 'ok'; bookings: Booking[] }
  | GeneralApiProblem;

// Staff
export type GetStaffBookingsInboxResult =
  | { kind: 'ok'; inbox_bookings: StaffBooking[] }
  | GeneralApiProblem;
export type GetStaffBookingsAssignedResult =
  | { kind: 'ok'; assigned_bookings: StaffBooking[] }
  | GeneralApiProblem;
export type GetStaffBookingResult =
  | { kind: 'ok'; booking: StaffBooking }
  | GeneralApiProblem;

// Ratings
export type GetRatingsResult =
  | { kind: 'ok'; ratings: Rating[] }
  | GeneralApiProblem;

// KeyValue
export type GetKeyValueResult =
  | { kind: 'ok'; result: KeyValue }
  | GeneralApiProblem;

// Table Spends
export type GetTableSpendsResult =
  | { kind: 'ok'; table_spends: TableSpend[] }
  | GeneralApiProblem;

// Table Spends Staff
export type GetStaffTableSpendsResult =
  | { kind: 'ok'; table_spends: TableSpend[] }
  | GeneralApiProblem;

// Booking Chats
export type GetBookingChatsResult =
  | { kind: 'ok'; chats: BookingChat[] }
  | GeneralApiProblem;

// User Settings
export type GetUserSettingsResult =
  | { kind: 'ok'; user_settings: UserSetting[] }
  | GeneralApiProblem;

// Booking Guests
export type GetBookingGuestsResult =
  | { kind: 'ok'; booking_guests: BookingGuest[] }
  | GeneralApiProblem;

export type GetNotificationsResult =
  | { kind: 'ok'; data: Notifications[] }
  | GeneralApiProblem;
