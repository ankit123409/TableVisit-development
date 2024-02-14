/**
 * The root navigator is used to switch between major navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow (which is contained in your MainNavigator) which the user
 * will use once logged in.
 */
import React, {createContext, useEffect, useMemo, useState} from 'react';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {MainNavigator} from './main-navigator';
import {StatusBar} from 'expo-status-bar';
import DrawerItems from '../components/drawer-items/drawer-items';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {LoadingScreen} from '../screens/loading/loading-screen';
import {
  ForgotPasswordScreen,
  SearchAllowLocationScreen,
  SignInScreen,
  SignUpScreen,
} from '../screens';
import {AppColors, AppStyles} from '../theme';
import {Appbar, Button, Dialog, Paragraph, Portal} from 'react-native-paper';
import {SignOutScreen} from '../screens/sign-out/sign-out-screen';
import {StaffNavigator} from './staff-navigator';
import {StaffSignInScreen} from '../screens';
// import Pusher from 'pusher-js/react-native';
import {View, BackHandler, Alert} from 'react-native';
import {RootNavigation} from './navigation-utilities';
import {
  load,
  save,
  SELECTED_BOOKING,
  SELECTED_CHAT_DATA,
  USER_DATA,
  USER_LOCATION,
} from '../utils/storage';
import {UserTypeEnum} from '../utils/app-enums';
import {Verification} from '../screens/verification/verification';
import resetpassword from '../screens/reset-password/resetpassword';
import ResetPassword from '../screens/reset-password/reset-password';
/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * We recommend using MobX-State-Tree store(s) to handle state rather than navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export type RootParamList = {
  loading: undefined;
  init: undefined;
  auth: undefined;
  sign_in: undefined;
  sign_up: undefined;
  sign_out: undefined;
  forgot_password: undefined;
  search_allow_location: undefined;
  main_stack: undefined;
  staff_sign_in: undefined;
  staff_stack: undefined;
  verification: undefined;
};

const Drawer = createDrawerNavigator<{rootStack: undefined}>();

const Stack = createStackNavigator<RootParamList>();

export const ApplicationContext = createContext(null);

const ApplicationProvider = ({children}) => {
  const [city, setCity] = useState<any>({});
  const [currentUser, setCurrentUser] = useState<any>({});
  const [paymentDialog, setPaymentDialog] = useState<boolean>(false);
  const [booking, setBooking] = useState<any>({});
  const [chatData, setChatData] = useState<any>({});

  const [messageDialog, setMessageDialog] = useState<boolean>(false);

  // Enable pusher logging - don't include this in production
  // Pusher.logToConsole = __DEV__;

  // const pusher = new Pusher('e0960641a7317a6f4616', {
  //   cluster: 'us2',
  // });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await load(USER_DATA);

        if (user.user_type_id === UserTypeEnum.Customer)
          applicationContext.subscribePayment('payment.channel.' + user.id);
        else applicationContext.subscribeMessage('message.channel.' + user.id);

        const city = await load(USER_LOCATION);

        if (city) applicationContext.changeCity(city);
      } catch (e) {}
    };

    fetchData().then();
  }, []);

  console.log('called', city);
  const applicationContext = useMemo(
    () => ({
      signIn: async user => {},
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

      //   channel.bind('event', async function (data) {
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

      //   channel.bind('event', async function (data) {
      //     setChatData(data.data);
      //     await save(SELECTED_CHAT_DATA, data.data);
      //     setMessageDialog(true);
      //   });
      // },
    }),
    [city.id, currentUser],
  );
  return (
    <ApplicationContext.Provider value={applicationContext}>
      {children}
      <Portal>
        <Dialog
          style={{borderRadius: 5, backgroundColor: AppColors.BG}}
          dismissable={false}
          visible={paymentDialog}
          onDismiss={() => setPaymentDialog(false)}>
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
              style={[AppStyles.button, {borderRadius: 5}]}
              contentStyle={AppStyles.button_content}
              labelStyle={AppStyles.button_label}
              onPress={() => {
                setPaymentDialog(false);
                RootNavigation.navigate('active_reservation');
              }}>
              Go to Booking
            </Button>
          </Dialog.Actions>
        </Dialog>

        <Dialog
          style={{borderRadius: 5, backgroundColor: AppColors.BG}}
          dismissable={false}
          visible={messageDialog}
          onDismiss={() => setMessageDialog(false)}>
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
              style={[AppStyles.button, {borderRadius: 5}]}
              contentStyle={AppStyles.button_content}
              labelStyle={AppStyles.button_label}
              onPress={() => {
                setMessageDialog(false);
                RootNavigation.navigate('chat');
              }}>
              Go to Messages
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ApplicationContext.Provider>
  );
};

const RootStack = () => {
  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        header: ({navigation, scene, previous}) => (
          <Appbar.Header style={{backgroundColor: AppColors.BG}}>
            {previous ? (
              <Appbar.BackAction onPress={() => navigation.goBack()} />
            ) : null}
            <Appbar.Content
              titleStyle={AppStyles.page_title}
              title={scene.descriptor.options.title}
            />
          </Appbar.Header>
        ),
      }}
      initialRouteName={'main_stack'}>
      <Stack.Screen
        name="main_stack"
        component={MainNavigator}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="sign_out"
        component={SignOutScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const InitNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={() => <DrawerItems />}
      screenOptions={{swipeEnabled: false}}>
      <Drawer.Screen name="rootStack" component={RootStack} />
    </Drawer.Navigator>
  );
};

const AuthStackNavigator = () => {
  useEffect(() => {
    const subscribeBackHandler = () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
      BackHandler.addEventListener('hardwareBackPress', backAction);
    };
    subscribeBackHandler();
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, []);

  const backAction = () => {
    Alert.alert('Exit!', 'Do you want to exit the application?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'YES', onPress: () => BackHandler.exitApp()},
    ]);
    return true;
  };
  return (
    <Stack.Navigator headerMode="screen" initialRouteName="sign_in">
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
            backgroundColor: '#1b1b22',
          },
          headerTintColor: 'white',
          title: 'Sign up with your Email',
          gestureEnabled: false,
        }}
      />

      <Stack.Screen
        name="forgot_password"
        component={ForgotPasswordScreen}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#1b1b22',
          },
          headerTintColor: 'white',
          title: 'Forgot your password?',
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="reset-password"
        component={ResetPassword}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#1b1b22',
          },
          headerTintColor: 'white',
          title: 'Reset your password?',
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

const MainStackNavigator = () => {
  return (
    <ApplicationProvider>
      <Stack.Navigator headerMode="screen" initialRouteName="loading">
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
          }}
        />
      </Stack.Navigator>
    </ApplicationProvider>
  );
};

export const RootNavigator = React.forwardRef<
  NavigationContainerRef,
  Partial<React.ComponentProps<typeof NavigationContainer>>
>((props, ref) => {
  return (
    <NavigationContainer {...props} ref={ref}>
      <MainStackNavigator />
      <StatusBar style="dark" />
    </NavigationContainer>
  );
});

RootNavigator.displayName = 'RootNavigator';
