/**
 * This is the navigator you will modify to display the logged-in screens of your app.
 * You can use RootNavigator to also display an auth flow or other user flows.
 *
 * You'll likely spend most of your time in this file.
 */
import React, { createContext, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Appbar, BottomNavigation } from "react-native-paper";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import {
  BookingsScreen,
  ChatScreen,
  HomeScreen,
  SearchScreen,
  MyFavoritesScreen,
  AddCardDetailsScreen,
  SearchAllowLocationScreen,
  MapScreen,
  PaymentMethodsScreen,
  FeaturedVenuesScreen,
  MoodFiltersScreen,
  DetailScreen,
  FoodMenuScreen,
  FloorPlanScreen,
  BottleMenuScreen,
  TablesScreen,
  ConfirmScreen,
  HelpScreen,
  PrivacyScreen,
  TermsScreen,
  FeedbackScreen,
  NotificationsScreen,
  IdentityVerificationScreen,
  VerifyingIdentityScreen,
  IdTypeScreen,
  ManageLocationScreen,
  ActiveReservationScreen,
  BookBottlesScreen,
  BookingPaymentScreen,
} from "../screens";
import { AppColors, AppStyles } from "../theme";
import { ProfileScreen } from "../screens";
import { InboxMessagesScreen } from "../screens";
import { PayWithScreen } from "../screens";
import { RootNavigation } from "./navigation-utilities";
import { bookingPaymentAnimation, verticalAnimation } from "../animations";
import { InviteScreen } from "../screens/invite/invite-screen";
import { RateReviewScreen } from "../screens/rate-review/rate-review-screen";
import { HeaderBackAction, HeaderCloseAction, Text } from "../components";
import { HeaderBackAndCloseAction } from "../components/navigation/header-back-and-close-action";
import { GuestListScreen } from "../screens/guest-list/guest-list-screen";
import { Verification } from "../screens/verification/verification";

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export type PrimaryParamList = {
  bottomNav: undefined;
  forgot_password: undefined;
  profile: undefined;
  my_favorites: undefined;
  inbox_messages: undefined;
  pay_with: undefined;
  add_card_details: undefined;
  featured_venues: undefined;
  search_allow_location: undefined;
  map: undefined;
  mood_filters: undefined;
  payment_methods: undefined;
  detail: undefined;
  bottle_menu: undefined;
  food_menu: undefined;
  floor_plan: undefined;
  tables: undefined;
  invite: undefined;
  help: undefined;
  feedback: undefined;
  notifications: undefined;
  privacy: undefined;
  terms: undefined;
  confirm: undefined;
  manage_location: undefined;
  id_type: undefined;
  identity_verification: undefined;
  verifying_identity: undefined;
  active_reservation: undefined;
  rate_review: undefined;
  chat: undefined;
  guest_list: undefined;
  book_bottles;
  booking_payment: undefined;
  verification: undefined;
};

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createStackNavigator<PrimaryParamList>();

type RoutesState = Array<{
  key: string;
  title: string;
  icon: string;
  color?: string;
  badge?: boolean;
  getAccessibilityLabel?: string;
  getTestID?: string;
}>;

export const BottomNavigationStackContext = createContext(null);

const BottomNavigationStack = ({ route }) => {
  const [index, setIndex] = useState(0);

  const [routes] = useState<RoutesState>([
    { key: "home", title: "Home", icon: "home-outline" },
    { key: "search", title: "Search", icon: "magnify" },
    { key: "bookings", title: "Bookings", icon: "checkbook" },
    { key: "inbox", title: "Inbox", icon: "comment-multiple-outline" },
  ]);

  return (
    <BottomNavigationStackContext.Provider value={route}>
      <BottomNavigation
        barStyle={AppStyles.bottom_navigation_bar}
        activeColor={AppColors.LOGO_COLOR}
        inactiveColor={AppColors.WHITE}
        shifting={false}
        navigationState={{ index, routes }}
        // onIndexChange={setIndex}
        onIndexChange={(index) => {
          setIndex(index);
          route.params = { index: index };
        }}
        renderTouchable={() => {
          return <Text>hhe</Text>;
        }}
        renderScene={BottomNavigation.SceneMap({
          home: HomeScreen,
          search: SearchScreen,
          bookings: BookingsScreen,
          inbox: InboxMessagesScreen,
        })}
      />
    </BottomNavigationStackContext.Provider>
  );
};

/*const HeaderWithoutBackAction = ({navigation, scene}) => (
    <Appbar.Header style={{backgroundColor: AppColors.BARRAS}}>
        {((navigation as any).openDrawer) ?
            <Appbar.Action
                icon="sort-variant"
                onPress={() =>
                    ((navigation as any) as DrawerNavigationProp<{}>).openDrawer()
                }
            /> : null}
        <Appbar.Content titleStyle={AppStyles.page_title} title={scene?.descriptor?.options?.title}/>
    </Appbar.Header>
)*/

const HeaderFeaturedVenues = ({ navigation, scene, previous }) => (
  <Appbar.Header style={{ backgroundColor: AppColors.BG }}>
    {previous ? (
      <Appbar.BackAction size={20} onPress={() => navigation.goBack()} />
    ) : null}
    <Appbar.Content
      titleStyle={AppStyles.page_title_small}
      title={scene?.descriptor?.options?.title}
    />
    <Appbar.Action
      icon="tune"
      onPress={() => {
        RootNavigation.navigate("mood_filters");
      }}
    />
  </Appbar.Header>
);

const HeaderHomeScreen = ({ navigation, scene }) => (
  <Appbar.Header style={{ backgroundColor: AppColors.BG }}>
    {(navigation as any).openDrawer ? (
      <Appbar.Action
        icon="sort-variant"
        onPress={() =>
          (navigation as any as DrawerNavigationProp<{}>).openDrawer()
        }
      />
    ) : null}
    <Appbar.Content
      titleStyle={AppStyles.page_title_small}
      title={scene?.descriptor?.options?.title}
    />
    <Appbar.Action
      icon="heart-outline"
      onPress={() => {
        RootNavigation.navigate("my_favorites");
      }}
    />
  </Appbar.Header>
);

export function MainNavigator() {
  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        header: ({ navigation, scene, previous }) =>
          HeaderBackAction({ navigation, scene, previous }),
      }}
    >
      <Stack.Screen
        options={{
          title: null,
          header: ({ navigation, scene }) =>
            HeaderHomeScreen({ navigation, scene }),
        }}
        name="bottomNav"
        component={BottomNavigationStack}
      />

      <Stack.Screen
        options={{ title: "Profile" }}
        name="profile"
        component={ProfileScreen}
      />
      <Stack.Screen
        options={{ title: "My Favorites" }}
        name="my_favorites"
        component={MyFavoritesScreen}
      />
      <Stack.Screen
        options={{ title: "Inbox Messages" }}
        name="inbox_messages"
        component={InboxMessagesScreen}
      />
      <Stack.Screen
        options={{ title: "Pay With" }}
        name="pay_with"
        component={PayWithScreen}
      />
      <Stack.Screen
        options={{ title: "Add Card Details" }}
        name="add_card_details"
        component={AddCardDetailsScreen}
      />
      <Stack.Screen
        options={{ title: "Payment Methods" }}
        name="payment_methods"
        component={PaymentMethodsScreen}
      />
      <Stack.Screen
        options={{
          title: "Featured Venues",
          header: ({ navigation, scene, previous }) => {
            console.log("schene....", scene);
            return HeaderFeaturedVenues({ navigation, scene, previous });
          },
        }}
        name="featured_venues"
        component={FeaturedVenuesScreen}
      />

      <Stack.Screen
        options={{ title: "Search Location", headerShown: false }}
        name="search_allow_location"
        component={SearchAllowLocationScreen}
      />

      <Stack.Screen
        options={verticalAnimation}
        name="map"
        component={MapScreen}
      />
      <Stack.Screen
        options={verticalAnimation}
        name="mood_filters"
        component={MoodFiltersScreen}
      />

      <Stack.Screen
        options={{ ...verticalAnimation, headerShown: false }}
        name="detail"
        component={DetailScreen}
      />
      <Stack.Screen
        options={verticalAnimation}
        name="food_menu"
        component={FoodMenuScreen}
      />
      <Stack.Screen
        options={verticalAnimation}
        name="floor_plan"
        component={FloorPlanScreen}
      />
      <Stack.Screen
        options={verticalAnimation}
        name="verification"
        component={Verification}
      />

      <Stack.Screen
        options={{
          title: "Bottle Menu",
          header: ({ navigation, scene, previous }) =>
            HeaderBackAndCloseAction({ navigation, scene, previous }),
        }}
        name="bottle_menu"
        component={BottleMenuScreen}
      />
      <Stack.Screen
        options={{
          title: "Table selection",
          header: ({ navigation, scene, previous }) =>
            HeaderBackAndCloseAction({ navigation, scene, previous }),
        }}
        name="tables"
        component={TablesScreen}
      />

      <Stack.Screen
        options={{
          title: "Confirm & Pay",
          header: ({ navigation, scene, previous }) =>
            HeaderBackAndCloseAction({ navigation, scene, previous }),
        }}
        name="confirm"
        component={ConfirmScreen}
      />

      <Stack.Screen
        options={{ title: "Get help" }}
        name="help"
        component={HelpScreen}
      />
      <Stack.Screen
        options={{ title: "Privacy Policy" }}
        name="privacy"
        component={PrivacyScreen}
      />
      <Stack.Screen
        options={{ title: "Terms of Use" }}
        name="terms"
        component={TermsScreen}
      />
      <Stack.Screen
        options={{ title: "Give us feedback" }}
        name="feedback"
        component={FeedbackScreen}
      />
      <Stack.Screen
        options={{ title: "Notifications" }}
        name="notifications"
        component={NotificationsScreen}
      />
      <Stack.Screen
        options={{ title: "Invite your friends" }}
        name="invite"
        component={InviteScreen}
      />
      <Stack.Screen
        options={{ title: "Manage location" }}
        name="manage_location"
        component={ManageLocationScreen}
      />

      <Stack.Screen
        options={{ title: "Identity verification" }}
        name="identity_verification"
        component={IdentityVerificationScreen}
      />
      <Stack.Screen
        options={{ title: "Identity verification" }}
        name="id_type"
        component={IdTypeScreen}
      />
      <Stack.Screen
        options={{ title: "Identity verification" }}
        name="verifying_identity"
        component={VerifyingIdentityScreen}
      />

      <Stack.Screen
        options={verticalAnimation}
        name="active_reservation"
        component={ActiveReservationScreen}
      />
      <Stack.Screen
        options={{ title: "Rate review" }}
        name="rate_review"
        component={RateReviewScreen}
      />

      <Stack.Screen
        options={{
          title: "",
          header: ({ navigation, scene, previous }) =>
            HeaderBackAndCloseAction({ navigation, scene, previous }),
        }}
        name="chat"
        component={ChatScreen}
      />

      <Stack.Screen
        options={{ title: "Guest list" }}
        name="guest_list"
        component={GuestListScreen}
      />

      <Stack.Screen
        options={{
          title: "Bottle Menu",
          header: ({ scene }) => HeaderCloseAction({ scene }),
        }}
        name="book_bottles"
        component={BookBottlesScreen}
      />

      <Stack.Screen
        options={bookingPaymentAnimation}
        name="booking_payment"
        component={BookingPaymentScreen}
      />
    </Stack.Navigator>
  );
}

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["bottomNav"];
export const canExit = (routeName: string) => exitRoutes.includes(routeName);