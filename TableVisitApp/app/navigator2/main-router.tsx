import React, { createContext, useEffect, useMemo, useState } from "react";
import {
  NavigationContainer,
  NavigationContainerRef,
} from "@react-navigation/native";

import { RootParamList } from "../navigators";
import { AppColors, AppStyles } from "../theme";
import { Alert, BackHandler, TouchableOpacity, View } from "react-native";
import { LoadingScreen } from "../screens/loading/loading-screen2";
import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Verification } from "../screens/verification/verification";
import {
  ChatScreen,
  MyFavoritesScreen,
  AddCardDetailsScreen,
  PaymentMethodsScreen,
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
  ProfileScreen,
  InboxMessagesScreen,
  PayWithScreen,
  GuestListScreen,
  SearchAllowLocationScreen,
  ForgotPasswordScreen,
  SignUpScreen,
  StaffSignInScreen,
  SignInScreen,
  FeaturedVenuesScreen,
  MapScreen,
  MoodFiltersScreen,
  FloorPlanScreen,
  FoodMenuScreen,
  DetailScreen,
  TablesScreen,
  ConfirmScreen,
  BookingStaffScreen,
  BookingStaffDetailsScreen,
  BookingStaffInbox,
  BookingStaffNotifications,
  BottleMenuScreen,
} from "../screens";
import AppDrawerStack from "./drawerNavigator";
import { InviteScreen } from "../screens/invite/invite-screen";
import { bookingPaymentAnimation, verticalAnimation } from "../animations";
import { RateReviewScreen } from "../screens/rate-review/rate-review-screen";
import { SignOutScreen } from "../screens/sign-out/sign-out-screen";
import { StaffNavigator } from "./staff-navigator";
// import Pusher from "pusher-js/react-native";
import {
  load,
  save,
  SELECTED_BOOKING,
  SELECTED_CHAT_DATA,
  USER_DATA,
  USER_LOCATION,
} from "../utils/storage";
import { UserTypeEnum } from "../utils/app-enums";
import {
  Button,
  Dialog,
  IconButton,
  Paragraph,
  Portal,
} from "react-native-paper";
import Icon from "react-native-paper/src/components/Icon";
import { HeaderBackAndCloseAction, Text } from "../components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ReservationPolicy } from "../screens/reservation-policy";
import { RequestSong } from "../screens/request-song";
import { DjStaffScreen } from "../screens/dj-staff/DjStaff_Screen";
import resetpassword from "../screens/reset-password/resetpassword";
import ResetPassword from "../screens/reset-password/reset-password";

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
  book_bottles: undefined;
  booking_payment: undefined;
  verification: undefined;
  AppDrawerStack: undefined;
  sign_out: undefined;
  booking_staff: undefined;
  booking_staff_details: undefined;
  booking_staff_inbox: undefined;
  booking_staff_notifications: undefined;
  reservation_policy: undefined;
  request_song: undefined;
};

const DashboardStack = createNativeStackNavigator<PrimaryParamList>();
export const ApplicationContext = createContext(null);

const Stack = createNativeStackNavigator<RootParamList>();

const ApplicationProvider = ({ children }) => {
  const [city, setCity] = useState<any>({});
  const [currentUser, setCurrentUser] = useState<any>({});
  const [paymentDialog, setPaymentDialog] = useState<boolean>(false);
  const [booking, setBooking] = useState<any>({});
  const [chatData, setChatData] = useState<any>({});

  const [messageDialog, setMessageDialog] = useState<boolean>(false);

  // Enable pusher logging - don't include this in production
  // Pusher.logToConsole = __DEV__;

  // const pusher = new Pusher("e0960641a7317a6f4616", {
  //   cluster: "us2",
  // });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await load(USER_DATA);

        if (user.user_type_id === UserTypeEnum.Customer)
          applicationContext.subscribePayment("payment.channel." + user.id);
        else applicationContext.subscribeMessage("message.channel." + user.id);

        const city = await load(USER_LOCATION);

        if (city) applicationContext.changeCity(city);
      } catch (e) {}
    };

    fetchData().then();
  }, []);

  const applicationContext = useMemo(
    () => ({
      signIn: async (user) => {},
      loadCity: () => {
        return city;
      },
      changeCity: (city: any) => {
        setCity(city);
      },
      loadCurrentUser: () => {
        return currentUser;
      },
      changeCurrentUser: (current: any) => {
        setCurrentUser(current);
      },
      // subscribePayment: (channel_name: string) => {
      //   const channel = pusher.subscribe(channel_name);

      //   channel.bind("event", async function (data) {
      //     const current = JSON.parse(data.data);
      //     setBooking(current);
      //     await save(SELECTED_BOOKING, current);
      //     setPaymentDialog(true);
      //   });
      // },
      // unsubscribe: (channel_name: string) => {
      //   pusher.unsubscribe(channel_name);
      // },
      // subscribeMessage: (channel_name: string) => {
      //   const channel = pusher.subscribe(channel_name);

      //   channel.bind("event", async function (data) {
      //     setChatData(data.data);
      //     await save(SELECTED_CHAT_DATA, data.data);
      //     setMessageDialog(true);
      //   });
      // },
    }),
    [city.id, currentUser]
  );
  return (
    <ApplicationContext.Provider value={applicationContext}>
      {children}
      <Portal>
        <Dialog
          style={{ borderRadius: 5, backgroundColor: AppColors.BG }}
          dismissable={false}
          visible={paymentDialog}
          onDismiss={() => setPaymentDialog(false)}
        >
          {/*@ts-ignore*/}
          <Dialog.Title style={AppStyles.dialog_title}>
            Please pay your outstanding balance
          </Dialog.Title>
          <Dialog.Content>
            <View style={AppStyles.row_wrap}>
              <Paragraph style={[AppStyles.text_16_color]}>
                Confirmation code: #{booking.confirmation_code}
              </Paragraph>
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              style={[AppStyles.button, { borderRadius: 5 }]}
              contentStyle={AppStyles.button_content}
              labelStyle={AppStyles.button_label}
              onPress={() => {
                setPaymentDialog(false);
                // RootNavigation.navigate('active_reservation');
              }}
            >
              Go to Booking
            </Button>
          </Dialog.Actions>
        </Dialog>

        <Dialog
          style={{ borderRadius: 5, backgroundColor: AppColors.BG }}
          dismissable={false}
          visible={messageDialog}
          onDismiss={() => setMessageDialog(false)}
        >
          {/*@ts-ignore*/}
          <Dialog.Title style={AppStyles.dialog_title}>
            You may have new messages
          </Dialog.Title>
          <Dialog.Content>
            <View style={AppStyles.row_wrap}>
              <Paragraph style={[AppStyles.text_16_color]}>
                From: {chatData.title}
              </Paragraph>
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              style={[AppStyles.button, { borderRadius: 5 }]}
              contentStyle={AppStyles.button_content}
              labelStyle={AppStyles.button_label}
              onPress={() => {
                setMessageDialog(false);
                // RootNavigation.navigate('chat');
              }}
            >
              Go to Messages
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ApplicationContext.Provider>
  );
};

export const RootNavigator = React.forwardRef<
  // NavigationContainerRef,
  Partial<React.ComponentProps<typeof NavigationContainer>>
>((props, ref) => {
  const [isPreloading, setIsPreloading] = React.useState(true);

  const onLoadEffect = () => {
    (async () => {
      setTimeout(() => {
        setIsPreloading(false);
      }, 2000);
    })();
  };
  React.useEffect(onLoadEffect, []);

  //   if (isPreloading) {
  //     return (
  //       //   <View style={AppStyles.splash_container}>
  //       //     <View>
  //       //       <Image
  //       //         style={{maxWidth: 200, resizeMode: 'center'}}
  //       //         source={require('../screens/shared/logo.png')}
  //       //       />
  //       //     </View>
  //       //   </View>
  //       <NavigationContainer>
  //         <ApplicationProvider>
  //           <LoadingScreen />
  //         </ApplicationProvider>
  //       </NavigationContainer>
  //     );
  //   } else {
  return (
    <NavigationContainer {...props} ref={ref}>
      <MainStackNavigator />
      <StatusBar style="dark" />
    </NavigationContainer>
  );
  //   }
});

const MainStackNavigator = () => {
  return (
    <ApplicationProvider>
      <Stack.Navigator initialRouteName="sign_in">
        <Stack.Screen
          name="loading"
          component={LoadingScreen}
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="auth"
          component={AuthStackNavigator}
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />

        <Stack.Screen
          name="init"
          component={InitNavigator}
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />

        <Stack.Screen
          name="search_allow_location"
          component={SearchAllowLocationScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="staff_stack"
          component={StaffNavigator}
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
      </Stack.Navigator>
    </ApplicationProvider>
  );
};

const AuthStackNavigator = () => {
  useEffect(() => {
    const subscribeBackHandler = () => {
      BackHandler.removeEventListener("hardwareBackPress", backAction);
      BackHandler.addEventListener("hardwareBackPress", backAction);
    };
    subscribeBackHandler();
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backAction);
    };
  }, []);

  const backAction = () => {
    Alert.alert("Exit!", "Do you want to exit the application?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      { text: "YES", onPress: () => BackHandler.exitApp() },
    ]);
    return true;
  };
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="sign_in"
        component={SignInScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="sign_up"
        component={SignUpScreen}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#212428",
          },
          headerTintColor: "white",
          title: "Sign up with your Email",
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="forgot_password"
        component={ForgotPasswordScreen}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#1b1b22",
          },
          headerTintColor: "white",
          title: "Forgot your password?",
          gestureEnabled: false,
        }}
      />
       <Stack.Screen
        name="reset-password"
        component={ResetPassword}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#1b1b22",
          },
          headerTintColor: "white",
          title: "Forgot your password?",
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="staff_sign_in"
        component={StaffSignInScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="verification"
        component={Verification}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const InitNavigator = () => {
  const Insets = useSafeAreaInsets();
  return (
    <DashboardStack.Navigator
      initialRouteName="AppDrawerStack"
      screenOptions={(props) => ({
        headerStyle: {
          flex: 1,
          backgroundColor: AppColors.BG,
          borderBottomWidth: 1,
          elevation: 0,
          shadowOpacity: 0,
          shadowRadius: 0,
          shadowOffset: {
            width: 0,
            height: 0,
          },
        },
        title: "Home",
        headerTitleStyle: {
          fontSize: 16,
          color: AppColors.WHITE,
        },
        header: (props) => {
          return (
            <View
              style={{
                paddingTop: Insets.top,
                backgroundColor: AppColors.BG,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <IconButton
                iconColor={AppColors.WHITE}
                size={30}
                icon="chevron-left"
                onPress={() => props.navigation.goBack()}
              />
              <Text
                style={[
                  AppStyles.title_center_small,
                  { color: "#E1D3BE", fontWeight: "500" },
                ]}
              >
                {props.options.title}
              </Text>
            </View>
          );
        },
        headerLeft: () => (
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Icon
              source={"chevron-left"}
              size={35}
              color={AppColors.LIGHR_WHITE}
            />
          </TouchableOpacity>
        ),
        headerShown: true,
        headerTitleAlign: "center",
      })}
    >
      <DashboardStack.Screen
        options={{ title: "Profile", headerTitleAlign: "left" }}
        name="profile"
        component={ProfileScreen}
      />
      <DashboardStack.Screen
        options={{ title: "My Favorites" }}
        name="my_favorites"
        component={MyFavoritesScreen}
      />
      <DashboardStack.Screen
        options={{ title: "Inbox Messages" }}
        name="inbox_messages"
        component={InboxMessagesScreen}
      />
      <DashboardStack.Screen
        options={{ title: "Pay With" }}
        name="pay_with"
        component={PayWithScreen}
      />
      <DashboardStack.Screen
        options={{ title: "Add Card Details" }}
        name="add_card_details"
        component={AddCardDetailsScreen}
      />
      <DashboardStack.Screen
        options={{ title: "Payment Methods" }}
        name="payment_methods"
        component={PaymentMethodsScreen}
      />
      <DashboardStack.Screen
        options={{
          title: "Featured Venues",
        }}
        name="featured_venues"
        component={FeaturedVenuesScreen}
      />
      <DashboardStack.Screen
        name="AppDrawerStack"
        component={AppDrawerStack}
        options={{ headerShown: false, headerTitleAlign: "center" }}
      />
      {/* <Stack.Screen
        options={{title: 'Search Location', headerShown: false}}
        name="search_allow_location"
        component={SearchAllowLocationScreen}
      /> */}
      <DashboardStack.Screen
        options={verticalAnimation as any}
        name="map"
        component={MapScreen}
      />
      <DashboardStack.Screen
        options={verticalAnimation as any}
        name="mood_filters"
        component={MoodFiltersScreen}
      />
      <DashboardStack.Screen
        // options={verticalAnimation as any}
        options={(props) => ({
          title: props.route.params?.placeName,
          headerShown: false,
        })}
        name="detail"
        component={DetailScreen}
      />
      <DashboardStack.Screen
        options={{
          title: "Food Menu",
        }}
        name="food_menu"
        component={FoodMenuScreen}
      />
      <DashboardStack.Screen
        options={verticalAnimation as any}
        name="floor_plan"
        component={FloorPlanScreen}
      />
      <DashboardStack.Screen
        options={verticalAnimation as any}
        name="verification"
        component={Verification}
      />

      <DashboardStack.Screen
        options={{
          title: "Bottle Menu",
        }}
        name="bottle_menu"
        component={BottleMenuScreen}
      />
      <DashboardStack.Screen
        options={{ title: "Get help" }}
        name="help"
        component={HelpScreen}
      />
      <DashboardStack.Screen
        options={{ title: "Privacy Policy" }}
        name="privacy"
        component={PrivacyScreen}
      />
      <DashboardStack.Screen
        options={{ title: "Terms of Use" }}
        name="terms"
        component={TermsScreen}
      />
      <DashboardStack.Screen
        options={{ title: "Give us feedback" }}
        name="feedback"
        component={FeedbackScreen}
      />
      <DashboardStack.Screen
        options={{ title: "Notifications" }}
        name="notifications"
        component={NotificationsScreen}
      />
      <DashboardStack.Screen
        options={{ title: "Invite your friends" }}
        name="invite"
        component={InviteScreen}
      />
      <DashboardStack.Screen
        options={{ title: "Manage location" }}
        name="manage_location"
        component={ManageLocationScreen}
      />

      <DashboardStack.Screen
        options={{ title: "Identity verification" }}
        name="identity_verification"
        component={IdentityVerificationScreen}
      />
      <DashboardStack.Screen
        options={{ title: "Identity verification" }}
        name="id_type"
        component={IdTypeScreen}
      />
      <DashboardStack.Screen
        options={{ title: "Identity verification" }}
        name="verifying_identity"
        component={VerifyingIdentityScreen}
      />

      <DashboardStack.Screen
        options={verticalAnimation as any}
        name="active_reservation"
        component={ActiveReservationScreen}
      />
      <DashboardStack.Screen
        options={{ title: "Rate review" }}
        name="rate_review"
        component={RateReviewScreen}
      />

      <DashboardStack.Screen
        options={verticalAnimation as any}
        name="chat"
        component={ChatScreen}
      />

      <DashboardStack.Screen
        options={(props) => {
          return {
            title: "Guest list",
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  props.navigation.goBack();
                }}
              >
                <Icon
                  size={25}
                  source={"bell-plus"}
                  color={AppColors.LOGO_COLOR}
                />
              </TouchableOpacity>
            ),
          };
        }}
        name="guest_list"
        component={GuestListScreen}
      />

      <DashboardStack.Screen
        options={{
          title: "Bottle Menu",
        }}
        name="book_bottles"
        component={BookBottlesScreen}
      />
      <DashboardStack.Screen
        options={{
          title: "Table selection",
        }}
        name="tables"
        component={TablesScreen}
      />
      <DashboardStack.Screen
        options={{
          title: "Request Song",
        }}
        name="request_song"
        component={RequestSong}
      />
      <DashboardStack.Screen
        options={{
          title: "Confirm & Pay",
        }}
        name="confirm"
        component={ConfirmScreen}
      />
      <DashboardStack.Screen
        options={{ ...(bookingPaymentAnimation as any), headerShown: false }}
        name="booking_payment"
        component={BookingPaymentScreen}
      />
      <DashboardStack.Screen
        name="sign_out"
        component={SignOutScreen}
        options={{
          headerShown: false,
        }}
      />
      <DashboardStack.Screen
        name="search_allow_location"
        component={SearchAllowLocationScreen}
        options={{
          headerShown: false,
        }}
      />
      <DashboardStack.Screen
        name="booking_staff"
        component={BookingStaffScreen}
        options={{
          title: "Booking",
        }}
      />
      {/* <DashboardStack.Screen
        name="booking_staff"
        component={DjStaffScreen}
        options={{
          title: "Booking",
        }}
      /> */}

      <DashboardStack.Screen
        name="booking_staff_inbox"
        component={BookingStaffInbox}
        options={{
          title: "Inbox",
        }}
      />
      <DashboardStack.Screen
        name="booking_staff_notifications"
        component={BookingStaffNotifications}
        options={{
          title: "Notifications",
        }}
      />
      <DashboardStack.Screen
        name="reservation_policy"
        component={ReservationPolicy}
        options={{
          title: "Reservation Policy",
        }}
      />
    </DashboardStack.Navigator>
  );
};

RootNavigator.displayName = "RootNavigator";