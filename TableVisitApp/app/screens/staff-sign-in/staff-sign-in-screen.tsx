import { observer } from 'mobx-react-lite';
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Button,
  List,
  Paragraph,
  Snackbar,
  Text,
  TextInput,
} from 'react-native-paper';
import { ApplicationContext, RootNavigation } from '../../navigators';
import React, { useContext, useEffect, useState } from 'react';
import { onSignIn } from '../../utils/auth';
import { load, save, TRUE, USER_DATA } from '../../utils/storage';
import {
  AppColors,
  AppStyles,
  moderateScale,
  scale,
  verticalScale,
} from '../../theme';
import { DialogLoadingIndicator, Screen, ScreenBack } from '../../components';
import { UserTypeEnum } from '../../utils/app-enums';
import { AuthApi } from '../../services/api';
import { useForm, Controller } from 'react-hook-form';
import { emailPattern } from '../../utils/app-helper';
// import messaging from '@react-native-firebase/messaging';

export const StaffSignInScreen = observer(function StaffSignInScreen() {
  const api = new AuthApi();
  const [secureEntry, setSecureEntry] = useState(true);

  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const [loading, setLoading] = useState<boolean>(false);

  // const {subscribeMessage} = useContext(ApplicationContext);

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

  const [fcmToken, setFcmToken] = useState('');

  // const requestUserPermission = async () => {
  //   const authStatus = await FirebaseMessagingTypes().requestPermission();
  //   console.log('Authorization status(authStatus):', authStatus);
  //   return (
  //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //     authStatus === messaging.AuthorizationStatus.PROVISIONAL
  //   );
  // };

  // useEffect(() => {
  //   if (requestUserPermission()) {
  //     messaging()
  //       .getToken()
  //       .then((fcmToken) => {
  //         console.log('FCM Token at login -> ', fcmToken);
  //         setFcmToken(fcmToken);
  //       });
  //   }
  // }, []);

  // hookah1@yopmail.com
  // navin2@free2ducks.com
  // security1@yopmail.com
  // manager1@yopmain.com
  // waitress1
  useEffect(() => {
    if (__DEV__) {
      // setValue('email', 'server3@yopmail.com', { shouldValidate: true });
      // setValue('password', '12345678', { shouldValidate: true });
      setValue('email', '', { shouldValidate: true });
      setValue('password', '', { shouldValidate: true });
    }
  }, [TRUE]);


  useEffect(() => {
    const fetchData = async () => {
      let FCM_TOKEN = await load('FCM_TOKEN');
      setFcmToken(FCM_TOKEN);
      console.log('FCM_TOKEN >>>', FCM_TOKEN);
    };

    fetchData().then(async () => {});

    return () => {};
  }, []);

  const signInAction = async (data) => {
    console.log('Stafff');

    setLoading(true);

    let auth_data = {
      email: data.email,
      password: data.password,
      device_key: fcmToken,
    };

    console.log('auth_data..', auth_data);

    const auth_result = await api.getStaffSignIn(auth_data);
    if (auth_result.kind === 'ok' && auth_result.data) {
      let auth_token =
        auth_result.data.token_type + ' ' + auth_result.data.access_token;
      onSignIn(auth_token);

      const user_result = await api.getLoggedUser();
      if (user_result.kind === 'ok' && user_result.user) {
        await save(USER_DATA, user_result.user);

        // subscribeMessage('message.channel.' + user_result.user.id);

        if (user_result.user.user_type_id !== UserTypeEnum.Customer) {
          RootNavigation.navigate('staff_stack');
          setLoading(false);

          if (Platform.OS === 'android')
            return ToastAndroid.show(
              'Welcome Staff Member',
              ToastAndroid.SHORT
            );
        }
      }
    } else {
      showError();
    }

    setLoading(false);
  };

  const showError = () => {
    setHasError(true);
    // Invalid user or password..
    setErrorMessage('Invalid data, please try again');
  };

  return (
    <>
      <ScreenBack
        style={
          (AppStyles.screen_container,
          { height: Dimensions.get('screen').height })
        }
        backgroundColor={AppColors.BG}
        preset={'scroll'}
      >
        <View style={[AppStyles.wrapper, styles.main_view_style]}>
          <TouchableOpacity
            onPress={async () => RootNavigation.navigate('sign_in')}
            style={styles.user_login_button_style}
          >
            <Paragraph
              style={{
                color: AppColors.WHITE,
                fontFamily: 'Roboto-Bold',
                fontSize: moderateScale(14),
              }}
            >
              Continue as User
            </Paragraph>
          </TouchableOpacity>

          <List.Section style={styles.sign_in_logo}>
            <Image
              style={AppStyles.logo_sign_in}
              source={require('../shared/app-logo.png')}
            />
          </List.Section>
          <List.Section style={{ marginTop: verticalScale(45) }}>
            <Paragraph
              style={[
                AppStyles.text_login_logo,
                { fontSize: moderateScale(23) },
              ]}
            >
              The Future of Nightlife
            </Paragraph>
          </List.Section>
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
                  onChangeText={onChange}
                  textColor={AppColors.WHITE}
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
                  marginTop: verticalScale(20),
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

          <List.Section
            style={{
              marginTop: verticalScale(40),
            }}
          >
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
                Are you an existing customer?
              </Paragraph>
              <TouchableOpacity
                onPress={() => RootNavigation.navigate('sign_in')}
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
                  Login
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
    </>
  );
});

const styles = StyleSheet.create({
  main_view_style: {
    marginTop: verticalScale(33),
  },
  user_login_button_style: {
    backgroundColor: AppColors.LOGO_COLOR,
    alignSelf: 'flex-end',
    paddingVertical: verticalScale(10),
    paddingLeft: scale(20),
    paddingRight: scale(10),
    borderTopLeftRadius: scale(30),
    borderBottomLeftRadius: scale(30),
  },
  sign_in_logo: {
    height: moderateScale(120),
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    marginTop: verticalScale(25),
  },
  forgot_text_style: {
    color: '#979797',
    fontSize: moderateScale(12),
    textAlign: 'right',
    marginRight: scale(10),
  },
});
