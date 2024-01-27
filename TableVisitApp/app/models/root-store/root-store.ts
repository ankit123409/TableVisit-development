import {Instance, SnapshotOut, types} from "mobx-state-tree"
import {CityStoreModel} from "../city-store/city-store";
import {PlaceStoreModel} from "../place-store/place-store";
import {PlaceFeatureStoreModel} from "../place-feature-store/place-feature-store";
import {PlaceMusicStoreModel} from "../place-music-store/place-music-store";
import {StateStoreModel} from "../state-store/state-store";
import {UserStoreModel} from "../user-store/user-store";
import {HealthStoreModel} from "../health-store/health-store";
import {ServiceStoreModel} from "../service-store/service-store";
import {TableStoreModel} from "../table-store/table-store";
import {FavoriteStoreModel} from "../favorite-store/favorite-store";
import {AuthStoreModel} from "../auth-store/auth-store";
import {PolicyStoreModel} from "../policy-store/policy-store";
import {PaymentStoreModel} from "../payment-store/payment-store";
import {BookingStoreModel} from "../booking-store/booking-store";
import {RatingStoreModel} from "../rating-store/rating-store";
import {ChatStoreModel} from "../chat-store/chat-store";
import {TableSpendStoreModel} from "../table-spend-store/table-spend-store";
import {StaffBookingStoreModel} from "../staff-booking-store/staff-booking-store";
import {UserProfileStoreModel} from "../user-profile-store/user-profile-store";
import {CountryStoreModel} from "../country-store/country-store";
import {BookingChatStoreModel} from "../booking-chat-store/booking-chat-store";
import {UserSettingStoreModel} from "../user-setting-store/user-setting-store";
import {StaffTableSpendStoreModel} from "../staff-table-spend-store/staff-table-spend-store";
import {NotificationStoreModel} from "../notification-store/notification-store";
import {BroadcastStoreModel} from "../broadcast-store/broadcast-store";
import {BookingGuestStoreModel} from "../booking-guest-store/booking-guest-store";

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
    authStore: types.optional(AuthStoreModel, {} as any),
    bookingChatStore: types.optional(BookingChatStoreModel, {} as any),
    bookingStore: types.optional(BookingStoreModel, {} as any),
    bookingGuestStore: types.optional(BookingGuestStoreModel, {} as any),
    broadcastStore: types.optional(BroadcastStoreModel, {} as any),
    chatStore: types.optional(ChatStoreModel, {} as any),
    cityStore: types.optional(CityStoreModel, {} as any),
    countryStore: types.optional(CountryStoreModel, {} as any),
    favoriteStore: types.optional(FavoriteStoreModel, {} as any),
    healthStore: types.optional(HealthStoreModel, {} as any),
    paymentStore: types.optional(PaymentStoreModel, {} as any),
    notificationStore: types.optional(NotificationStoreModel, {} as any),
    placeFeatureStore: types.optional(PlaceFeatureStoreModel, {} as any),
    placeMusicStore: types.optional(PlaceMusicStoreModel, {} as any),
    placeStore: types.optional(PlaceStoreModel, {} as any),
    policyStore: types.optional(PolicyStoreModel, {} as any),
    ratingStore: types.optional(RatingStoreModel, {} as any),
    serviceStore: types.optional(ServiceStoreModel, {} as any),
    staffBookingStore: types.optional(StaffBookingStoreModel, {} as any),
    staffTableSpendStore: types.optional(StaffTableSpendStoreModel, {} as any),
    stateStore: types.optional(StateStoreModel, {} as any),
    tableSpendStore: types.optional(TableSpendStoreModel, {} as any),
    tableStore: types.optional(TableStoreModel, {} as any),
    userProfileStore: types.optional(UserProfileStoreModel, {} as any),
    userSettingStore: types.optional(UserSettingStoreModel, {} as any),
    userStore: types.optional(UserStoreModel, {} as any),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {
}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {
}
