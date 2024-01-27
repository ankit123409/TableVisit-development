/**
 * Welcome to the main entry point of the app. In this file, we'll
 * be kicking off our app.
 *
 * Most of this file is boilerplate and you shouldn't need to modify
 * it very often. But take some time to look through and understand
 * what is going on here.
 *
 * The app navigation resides in ./app/navigators, so head over there
 * if you're interested in adding screens and navigators.
 */
import './i18n';
import './utils/ignore-warnings';
import React, { useState, useEffect, useRef } from 'react';
import { NavigationContainerRef } from '@react-navigation/native';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import { initFonts } from './theme/fonts'; // expo
import * as storage from './utils/storage';
import {
  useBackButtonHandler,
  canExit,
  setRootNavigation,
  useNavigationPersistence,
  // RootNavigator,
} from './navigators';
import { RootStore, RootStoreProvider, setupRootStore } from './models';
import {
  Provider as PaperProvider,
  DefaultTheme,
  useTheme,
} from 'react-native-paper';
import SplashScreen from 'react-native-splash-screen';

// This puts screens in a native ViewController or Activity. If you want fully native
// stack navigation, use `createNativeStackNavigator` in place of `createStackNavigator`:
// https://github.com/kmagiera/react-native-screens#using-native-stack-navigator
import { enableScreens } from 'react-native-screens';
import { AppColors, AppStyles, scale } from './theme';
import { Image, View } from 'react-native';

import { StripeProvider } from '@stripe/stripe-react-native';
import { RootNavigator } from './navigator2/main-router';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

/*import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Warning: ...']);*/

// AIzaSyBkvjWsUXKPfnEeUMkZx-u3-gSW4K-CrJY

// Add new typescript properties to the theme
PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    console.log('TOKEN:', token);
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);

    // process the notification

    // (required) Called when a remote is received or opened, or local notification is opened
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: function (notification) {
    console.log('ACTION:', notification.action);
    console.log('NOTIFICATION:', notification);

    // process the action
  },

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function (err) {
    console.error(err.message, err);
  },

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  requestPermissions: true,
});
declare global {
  namespace ReactNativePaper {
    interface ThemeFonts {
      superLight: any;
    }

    interface ThemeColors {
      customColor: string;
    }

    interface ThemeAnimation {
      customProperty: number;
    }

    interface Theme {
      userDefinedThemeProperty: string;
    }
  }
}

// __DEV__ ? require('dotenv').config({path: '.env.development'}) : require('dotenv').config()

enableScreens();

export const NAVIGATION_PERSISTENCE_KEY = 'NAVIGATION_STATE';

/**
 * This is the root component of our app.
 */
function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const theme = useTheme();

  const navigationRef = useRef<NavigationContainerRef>();
  const [rootStore, setRootStore] = useState<RootStore | undefined>(undefined);

  const AppDefaultDarkTheme: any = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: AppColors.WHITE,
      customColor: AppColors.PRIMARY,
      background: AppColors.BG,
      placeholder: AppColors.WHITE,
      accent: AppColors.BG,
    },
    fonts: {
      ...theme.fonts,
      regular: AppStyles.main,
      superLight: { ...theme.fonts['light'] },
    },
    userDefinedThemeProperty: '',
    animation: {
      ...theme.animation,
      customProperty: 1,
    },
  };

  setRootNavigation(navigationRef);
  useBackButtonHandler(navigationRef, canExit);
  const { initialNavigationState, onNavigationStateChange } =
    useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY);
  const requestUserPermission = async () => {
    await messaging().registerDeviceForRemoteMessages();

    messaging()
      .hasPermission()
      .then(async (enabled) => {
        const authStatus = await messaging().requestPermission();
        const enabled1 =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled1) {
          console.log('Authorization status:', authStatus);
        }
      })
      .catch((error) => {
        let err = `check permission error${error}`;
        console.log(error);
      });
  };
  const onMessage = (remoteMessage) => {
    console.log('🚀 ~~ onMessage ~ remoteMessage:', remoteMessage);
    PushNotification.localNotification({
      channelId: '1',
      title: remoteMessage.notification.title,
      message: remoteMessage.notification.body, // (required)
    });
  };
  useEffect(() => {
    messaging().requestPermission();

    const unsubscribe = messaging().onMessage(onMessage);
    PushNotification.createChannel({
      channelId: '1', // (required)
      channelName: 'com.app.tablevisit', // (required)
      channelDescription: `A custom channel to categorise your custom notifications. Updated at: ${Date.now()}`, // (optional) default: undefined.
      // importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
    });
    return unsubscribe;
  }, []);
  // Kick off initial async loading actions, like loading fonts and RootStore
  useEffect(() => {
    requestUserPermission();
    messaging()
      .getToken()
      .then(async (token) => {
        console.log('FCM Token -->', token);
        await storage.save('FCM_TOKEN', token);
      });
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        // await SplashScreen.preventAutoHideAsync();

        // Pre-load fonts, make any API calls you need to do here
        await initFonts(); // expo

        try {
        } catch (e) {
          // ignore error
        }

        await setupRootStore().then(setRootStore);

        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        // await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare().then();
  }, []);

  // Before we show the app, we have to wait for our state to be ready.
  // In the meantime, don't render anything. This will be the background
  // color set in native by rootView's background color. You can replace
  // with your own loading component if you wish.
  if (!rootStore)
    return (
      <View style={AppStyles.splash_container}>
        <View>
          <Image
            style={{ width: scale(100), resizeMode: 'contain' }}
            source={require('./screens/shared/logo.png')}
          />
        </View>
      </View>
    );

  if (!appIsReady)
    return (
      <View style={AppStyles.splash_container}>
        <View>
          <Image
            style={{ width: scale(100), resizeMode: 'contain' }}
            source={require('./screens/shared/logo.png')}
          />
        </View>
      </View>
    );

  if (appIsReady) {
    (async () => {
      // await SplashScreen.hideAsync();
      await SplashScreen.hide();
    })();
  }

  return (
    <StripeProvider
      publishableKey="pk_test_51JUvAKHc45h8j8XYLCOde9dBcDtDZbTXaqqHOamAVRjpx2Qn7Et9IzYgUtPHbYzjXjOMHFCVhprJZkRr0HU1JRuX008ToCgWsn"
      // publishableKey="pk_live_51JUvAKHc45h8j8XYRXHSeqxUqEiyFAJ990r34XQe6NuktRTYZeVebZZV83s3hdK463fnbExg5eC5dWIjnUhy0dmo00UtOQKXnT"
    >
      <RootStoreProvider value={rootStore}>
        <PaperProvider theme={AppDefaultDarkTheme}>
          <SafeAreaProvider
            style={AppStyles.content_area}
            initialMetrics={initialWindowMetrics}
          >
            <RootNavigator
              ref={navigationRef}
              initialState={initialNavigationState}
              onStateChange={onNavigationStateChange}
            />
            {/* <RootNavigator
              ref={navigationRef}
              initialState={initialNavigationState}
              onStateChange={onNavigationStateChange}
            /> */}
          </SafeAreaProvider>
        </PaperProvider>
      </RootStoreProvider>
    </StripeProvider>
  );
}

export default App;
