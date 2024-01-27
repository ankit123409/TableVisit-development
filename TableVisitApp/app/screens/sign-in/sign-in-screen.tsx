import { observer } from 'mobx-react-lite';
import {
  Image,
  ImageBackground,
  LogBox,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Button,
  List,
  Paragraph,
  Snackbar,
  TextInput,
} from 'react-native-paper';
import { RootNavigation } from '../../navigators';
import React, { useContext, useEffect, useState } from 'react';
import { onSignIn } from '../../utils/auth';
import {
  load,
  save,
  TRUE,
  USER_DATA,
  USER_LOCATION,
} from '../../utils/storage';
import {
  AppColors,
  AppStyles,
  color,
  moderateScale,
  scale,
  verticalScale,
} from '../../theme';
import { DialogLoadingIndicator, Screen, ScreenBack } from '../../components';
// @ts-ignore
import { DEFAULT_USER, DEFAULT_PASSWORD } from '@env';
import { UserTypeEnum } from '../../utils/app-enums';
import { AuthApi } from '../../services/api';
import { useForm, Controller } from 'react-hook-form';
import { emailPattern } from '../../utils/app-helper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import appleAuth, {
  appleAuthAndroid,
  AppleButton,
} from '@invertase/react-native-apple-authentication';
import { useStores } from '../../models';
import { ApplicationContext } from '../../navigator2/main-router';
import jwt_decode from 'jwt-decode';
import Icon from 'react-native-paper/src/components/Icon';

// import messaging from '@react-native-firebase/messaging';

export const SignInScreen = observer(function SignInScreen() {
  LogBox.ignoreLogs(['Setting a timer']);

  const api = new AuthApi();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { authStore } = useStores();
  const [secureEntry, setSecureEntry] = useState(true);

  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const [loading, setLoading] = useState<boolean>(false);

  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);

  const { subscribePayment } = useContext(ApplicationContext);

  const [fcmToken, setFcmToken] = useState('');

  const requestUserPermission = async () => {
    // const authStatus = await messaging().requestPermission();
    // console.log('Authorization status(authStatus):', authStatus);
    // return (
    //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    //     authStatus === messaging.AuthorizationStatus.PROVISIONAL
    // );
  };

  useEffect(() => {
    if (requestUserPermission()) {
      // messaging()
      //     .getToken()
      //     .then((fcmToken) => {
      //         console.log('FCM Token at login -> ', fcmToken);
      //         setFcmToken(fcmToken)
      //     });
    }
  }, []);

  // jaysin.kiaan@feerock.com

  useEffect(() => {
    const fetchData = async () => {
      let FCM_TOKEN = await load('FCM_TOKEN');
      setFcmToken(FCM_TOKEN);
      console.log('FCM_TOKEN >>>', FCM_TOKEN);
    };

    fetchData().then(async () => {});

    return () => {};
  }, []);

  useEffect(() => {
    if (__DEV__) {
      setValue('email', '', { shouldValidate: true });
      setValue('password', '', { shouldValidate: true });
      // setValue('email', 'customer@falkcia.com', { shouldValidate: true });
      // setValue('password', 'Customer@123', { shouldValidate: true });
    }
  }, [TRUE]);

  const signInAction = async (data) => {
    console.log("heloooo",data)
    // await messaging()
    // .getToken()
    // .then((fcmToken) => {
    //     console.log('FCM Token at login -> ', fcmToken);
    //     setFcmToken(fcmToken)
    // });
    await handle({ email: data.email, password: data.password , device_key: fcmToken,});
  };

  const skipAction = async () => {
    await handle({ email: DEFAULT_USER, password: DEFAULT_PASSWORD, device_key: fcmToken, });
  };

  const handle = async (auth_data: any) => {
    setLoading(true);

    const paylod = {
      device_key: fcmToken,
      email: auth_data.email,
      password: auth_data.password,
    };
    const auth_result = await api.getSignIn(auth_data);
    console.log(auth_result);

    if (auth_result.kind === 'ok' && auth_result.data) {
      let auth_token =
        auth_result.data.token_type + ' ' + auth_result.data.access_token;
      onSignIn(auth_token);

      const user_result = await api.getLoggedUser();
      // const user_result = {
      //   kind: 'ok',
      //   user: {
      //     id: 71,
      //     name: 'customer 00001',
      //     last_name: 'Customer',
      //     email: 'customer0001@yopmail.com',
      //     email_verified_at: '2023-10-15T12:27:39.000000Z',
      //     dob: '2023-10-24',
      //     gender: 0,
      //     mobile_number: null,
      //     avatar: '01_000071_1698261207.JPG',
      //     apple_id: 'adf89b1a4219495c96b5bdb1ee77bc5b',
      //     device_key: '123',
      //     auth_mode: 1,
      //     auth_data: null,
      //     payment_data: 'cus_OqepZSozbhZKLr',
      //     timezone: null,
      //     timezone_offset: null,
      //     user_type_id: 6,
      //     place_id: 0,
      //     tenant_id: 1,
      //     published: 1,
      //     deleted: 0,
      //     otp: 5651,
      //     otp_verify_status: 1,
      //   },
      // };
      console.log('user_result', user_result);
      if (user_result.kind === 'ok' && user_result.user) {
        console.log('`dfsbvdjsbvjkdsbvjksbdvdjksabvjk`');

        await save(USER_DATA, user_result.user);

        subscribePayment('payment.channel.' + user_result.user.id);

        if (user_result.user.user_type_id === UserTypeEnum.Customer) {
          if (await load(USER_LOCATION)) RootNavigation.navigate('init');
          else RootNavigation.navigate('search_allow_location');
        } else showError();
      } else {
        if (user_result.kind == 'not-found') {
          setHasError(true);
          setErrorMessage('Verification pending');
        }
        if (user_result.kind == 'error') {
          setHasError(true);
          setErrorMessage('Your account has been deactive');
        }
        showError();
      }
    } else {
      if (auth_result.kind == 'not-found') {
        setHasError(true);
        setErrorMessage('Verification pending');
        RootNavigation.navigate('verification');
      } else if (auth_result.kind == 'error') {
        setHasError(true);
        setErrorMessage('Your account has been deactive');
      } else {
        showError();
      }
    }

    setLoading(false);
  };

  const showError = () => {
    setHasError(true);
    setErrorMessage('Invalid data, please try again');
  };

  const onAppleButtonPress = async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });
      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user
      );

      console.log('appleAuthRequestResponse', appleAuthRequestResponse);
      if (credentialState === appleAuth.State.AUTHORIZED) {
        const fullName = appleAuthRequestResponse.fullName;

        const res = jwt_decode(appleAuthRequestResponse.identityToken);

        console.log('in apple', res);
        try {
          if (appleAuthRequestResponse.user != null) {
            const req = {
              apple_id: appleAuthRequestResponse.user,
              social_type: 'Apple',
            };
            const getUser = await authStore.getAppleSignIn(req);
            console.log('hello if getuser----->', getUser);
            if (getUser) {
              let auth_token =
                getUser.data.token_type + ' ' + getUser.data.access_token;
              onSignIn(auth_token);

              const user_result = await api.getLoggedUser();
              console.log('user_result', user_result);
              if (user_result.kind === 'ok' && user_result.user) {
                console.log('dfsbvdjsbvjkdsbvjksbdvdjksabvjk');

                await save(USER_DATA, user_result.user);

                subscribePayment('payment.channel.' + user_result.user.id);

                if (user_result.user.user_type_id === UserTypeEnum.Customer) {
                  if (await load(USER_LOCATION))
                    RootNavigation.navigate('init');
                  else RootNavigation.navigate('search_allow_location');
                } else showError();
              }
            } else {
              console.log('hello----->', res?.email, fullName);
              const apple_obj = {
                name: fullName.givenName || " ",
                last_name: fullName.familyName || " " ,
                email: res?.email ,
                password: '12345678',
                user: appleAuthRequestResponse.user,
                socialType: 'apple',
                device_key: fcmToken,
              };

              const result = await authStore.getSignUp(apple_obj);
              console.log('getSignUp', result, apple_obj);

              if (result?.code == 200) {
                let auth_token =
                  result?.data?.token_type +
                  ' ' +
                  result.data?.access_token;
                onSignIn(auth_token);

                const user_result = await api.getLoggedUser();
                console.log('user_result', user_result);
                if (user_result.kind === 'ok' && user_result.user) {
                  console.log('dfsbvdjsbvjkdsbvjksbdvdjksabvjk', user_result);

                  await save(USER_DATA, user_result.user);

                  subscribePayment('payment.channel.' + user_result.user.id);

                  if (user_result.user.user_type_id === UserTypeEnum.Customer) {
                    if (await load(USER_LOCATION))
                      RootNavigation.navigate('init');
                    else RootNavigation.navigate('search_allow_location');
                  } else showError();
                }
              }
            }
            // const apple_User = await save('USER_DATA',apple_obj)
            // RootNavigation.navigate("init")
          } else {
            RootNavigation.navigate('init');
          }
        } catch (error: any) {
          console.log('AsyncStorage error', error);
        }
      }
    } catch (e: any) {
      alert(e);
    }
  };

  return (
    <>
      <ScreenBack
        style={AppStyles.screen_container}
        backgroundColor={AppColors.BG}
        preset={'scroll'}
      >
        <View style={[styles.main_view_style, {flex : 1}]}>
          <TouchableOpacity
            onPress={async () => RootNavigation.navigate('staff_sign_in')}
            style={styles.staff_login_button_style}
          >
            <Paragraph
              style={{
                color: AppColors.WHITE,
                fontFamily: 'Roboto-Bold',
                fontSize: moderateScale(14),
              }}
            >
              Continue as Staff
            </Paragraph>
          </TouchableOpacity>
          <List.Section style={AppStyles.sign_in_logo}>
            <TouchableOpacity
              style={AppStyles.logo_contenedor_sign_in}
              activeOpacity={0.9}
              // onPress={async () => RootNavigation.navigate("staff_sign_in")}
            >
              <Image
                style={AppStyles.logo_sign_in}
                source={require('../shared/app-logo.png')}
              />
            </TouchableOpacity>
          </List.Section>
          <List.Section>
            <Paragraph style={styles.text_login_logo}>Welcome back!</Paragraph>
          </List.Section>
          <Paragraph style={styles.sign_in_text_style}>
            Sign in to your account
          </Paragraph>

          <List.Section>
            <Controller
              control={control}
              rules={{
                required: true,
                pattern: emailPattern,
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  outlineColor={AppColors.DIVIDER_GRAY}
                  textAlign={'left'}
                  autoCapitalize={'none'}
                  mode="outlined"
                  style={AppStyles.input}
                  label={null}
                  placeholder="Email"
                  value={value}
                  onChangeText={onChange}
                  textColor={AppColors.WHITE}
                  keyboardType={'email-address'}
                />
              )}
              name="email"
            />
            {errors.email && (
              <Paragraph style={AppStyles.error_text}>
                Please enter a valid email.
              </Paragraph>
            )}
          </List.Section>
          <List.Section>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  outlineColor={AppColors.DIVIDER_GRAY}
                  autoCapitalize={'none'}
                  style={AppStyles.input}
                  placeholder={'Password'}
                  textAlign={'left'}
                  mode="outlined"
                  label={null}
                  value={value}
                  textColor={AppColors.WHITE}
                  onChangeText={onChange}
                  secureTextEntry={secureEntry}
                  right={
                    <TextInput.Icon
                      color={AppColors.WHITE}
                      icon={secureEntry ? 'eye' : 'eye-off'}
                      onPress={() => setSecureEntry(!secureEntry)}
                    />
                  }
                />
              )}
              name="password"
            />
            {errors.password && (
              <Paragraph style={AppStyles.error_text}>
                Please enter your password.
              </Paragraph>
            )}
          </List.Section>
          <TouchableOpacity
            onPress={() => RootNavigation.navigate('forgot_password')}
          >
            <Paragraph style={styles.forgot_text_style}>
              Forgot your password?
            </Paragraph>
          </TouchableOpacity>

          <View>
            <Paragraph
              style={{
                color: '#8E8E8E',
                fontSize: moderateScale(13),
                textAlign: 'center',
              }}
            >
              OR
            </Paragraph>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: scale(12),
                marginVertical: verticalScale(12),
              }}
            >
              {/* <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderColor: '#8E8E8E',
                  borderRadius: scale(5),
                  paddingHorizontal: scale(31),
                  paddingVertical: verticalScale(11),
                }}
                onPress={onAppleButtonPress}
              >
                <Icon source={'facebook'} size={25} color={AppColors.WHITE} />
              </TouchableOpacity> */}
              {Platform.OS === 'ios' && (
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderColor: '#8E8E8E',
                    borderRadius: scale(5),
                    paddingHorizontal: scale(31),
                    paddingVertical: verticalScale(11),
                  }}
                  onPress={onAppleButtonPress}
                >
                  <Icon source={'apple'} size={25} color={AppColors.WHITE} />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <List.Section>
            <Button
              mode="contained"
              dark={true}
              buttonColor={AppColors.LOGO_COLOR}
              onPress={handleSubmit(signInAction)}
              style={[
                AppStyles.button,
                {
                  marginHorizontal: scale(47),
                  borderRadius: scale(10),
                },
              ]}
              contentStyle={AppStyles.button_content}
              labelStyle={{
                fontSize: moderateScale(18),
                fontFamily: 'Roboto-bold',
              }}
            >
              Login
            </Button>
          </List.Section>

          <List.Section>
            <TouchableOpacity
              onPress={skipAction}
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
              }}
            >
              <Paragraph style={[AppStyles.text_skip, { color: '#656970' }]}>
                {' Continue as Guest'}
              </Paragraph>
              <Icon source={'chevron-right'} size={25} color={'#656970'} />
            </TouchableOpacity>
          </List.Section>
          <List.Section>
            <View style={AppStyles.view_text_center}>
              <Paragraph
                style={[
                  AppStyles.text_login_register,
                  {
                    fontSize: moderateScale(18),
                    color: '#8E8E8E',
                    fontFamily: 'Roboto-Regular',
                  },
                ]}
              >
                Don´t have a an account?
              </Paragraph>
              <TouchableOpacity
                onPress={() => RootNavigation.navigate('sign_up')}
              >
                <Paragraph
                  style={[
                    AppStyles.text_login_register_orange,
                    {
                      fontFamily: 'Roboto-Bold',
                      fontSize: moderateScale(18),
                    },
                  ]}
                >
                  Sign Up
                </Paragraph>
              </TouchableOpacity>
            </View>
          </List.Section>
        </View>
      </ScreenBack>
      <DialogLoadingIndicator visible={loading} />
      <Snackbar
        wrapperStyle={AppStyles.snackbar_wrapper}
        style={AppStyles.snackbar_content}
        visible={hasError}
        onDismiss={() => setHasError(false)}
        action={{
          label: 'OK',
          onPress: () => {},
        }}
        duration={Snackbar.DURATION_MEDIUM}
      >
        <Text style={{ color: AppColors.BLACK, fontFamily: 'Roboto-Regular' }}>
          {errorMessage}
        </Text>
      </Snackbar>

      <Snackbar
        wrapperStyle={AppStyles.snackbar_wrapper}
        style={AppStyles.snackbar_content}
        visible={showSnackbar}
        onDismiss={() => setShowSnackbar(false)}
        action={{
          label: 'OK',
          onPress: () => {},
        }}
        duration={Snackbar.DURATION_MEDIUM}
      >
        <Text style={{ color: AppColors.BLACK, fontFamily: 'Roboto-Regular' }}>
          Coming soon..
        </Text>
      </Snackbar>
    </>
  );
});

const styles = StyleSheet.create({
  main_view_style: {
    marginTop: verticalScale(33),
  },
  staff_login_button_style: {
    backgroundColor: AppColors.LOGO_COLOR,
    alignSelf: 'flex-end',
    paddingVertical: verticalScale(10),
    paddingLeft: scale(20),
    paddingRight: scale(10),
    borderTopLeftRadius: scale(30),
    borderBottomLeftRadius: scale(30),
  },
  text_login_logo: {
    color: AppColors.WHITE,
    fontSize: moderateScale(30),
    fontFamily: 'Roboto-Bold',
    textAlign: 'center',
    paddingTop: verticalScale(16),
  },
  sign_in_text_style: {
    color: '#9F9F9F',
    fontFamily: 'Roboto-Regular',
    textAlign: 'center',
    fontSize: moderateScale(15),
  },
  forgot_text_style: {
    color: '#979797',
    fontSize: moderateScale(12),
    textAlign: 'right',
    marginRight: scale(10),
  },
});
