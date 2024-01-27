import { observer } from 'mobx-react-lite';
import {
  Button,
  Checkbox,
  List,
  Paragraph,
  Snackbar,
  TextInput,
} from 'react-native-paper';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import * as React from 'react';
import { AppColors, AppStyles, moderateScale, scale, verticalScale } from '../../theme';
import { RootNavigation } from '../../navigators';
import { useEffect, useState } from 'react';
import { DialogLoadingIndicator, Screen, ScreenBack } from '../../components';
import { useStores } from '../../models';
import { useForm, Controller } from 'react-hook-form';
import { emailPattern, passwordPattern } from '../../utils/app-helper';
import { load, REGISTRATION_DATA, save, TRUE, USER_EMAIL, USER_PHONE } from '../../utils/storage';
// import {CountryPicker} from "react-native-country-codes-picker";

export const SignUpScreen = observer(function SignUpScreen() {
  const { authStore } = useStores();

  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const [loading, setLoading] = useState(false);

  const [checked, setChecked] = useState(true);

  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState('+91');
  const [secureEntry, setSecureEntry] = useState(true);
  const [fcmToken, setFcmToken] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      name: '',
      last_name: '',
      email: '',
      password: '',
      password_confirm: '',
    },
  });

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
    }
  }, [TRUE]);

  const signUpAction = async (data) => {
    setLoading(true);

  

    const result = await authStore.getSignUp({
      name: data.name,
      last_name: data.last_name,
      email: data.email,
      password: data.password,
      socialType: '',
      device_key: fcmToken,
    });


    if (result && result.code === 200) {
      // alert('Congrats! You’re now registered. Please sign in.');
      await save(USER_EMAIL, data.email);
      await save(REGISTRATION_DATA, {
        name: data.name,
        last_name: data.last_name,
        email: data.email,
        password: data.password,
        socialType: '',
        device_key: fcmToken,
      });
      RootNavigation.navigate('verification');
      setIsSuccess(true);
    } else {
      // alert(JSON.stringify(result));
      if (result && result.message) setErrorMessage(result.message);
      else setErrorMessage('An error occurred. Please try again later.');
      setHasError(true);
    }

    setLoading(false);
  };

  return (
    <>
      <ScreenBack
        unsafe={true}
        style={AppStyles.screen_container}
        backgroundColor={AppColors.BG}
        preset={'scroll'}
      >
        <List.Section style={AppStyles.mt15}>
          <Paragraph style={AppStyles.text_form}>First Name</Paragraph>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                textAlign={'left'}
                autoCapitalize={'none'}
                mode="flat"
                label={null}
                style={AppStyles.input_flat}
                placeholder="Enter your first name"
                value={value}
                onChangeText={onChange}
                textColor="white"
                underlineColor={AppColors.DIVIDER_GRAY}
              />
            )}
            name="name"
          />
          {errors.name && (
            <Paragraph style={AppStyles.error_text}>
              Please enter your first name.
            </Paragraph>
          )}
        </List.Section>
        <List.Section>
          <Paragraph style={AppStyles.text_form}>Last Name</Paragraph>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                textAlign={'left'}
                autoCapitalize={'none'}
                mode="flat"
                label={null}
                style={AppStyles.input_flat}
                placeholder="Enter your last name"
                value={value}
                onChangeText={onChange}
                textColor="white"
                underlineColor={AppColors.DIVIDER_GRAY}
              />
            )}
            name="last_name"
          />
          {errors.last_name && (
            <Paragraph style={AppStyles.error_text}>
              Please enter your last name.
            </Paragraph>
          )}
        </List.Section>
        <List.Section>
          <Paragraph style={AppStyles.text_form}>Email</Paragraph>
          <Controller
            control={control}
            rules={{
              required: true,
              pattern: emailPattern,
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                textAlign={'left'}
                autoCapitalize={'none'}
                mode="flat"
                label={null}
                style={AppStyles.input_flat}
                placeholder="Enter your email"
                value={value}
                onChangeText={onChange}
                textColor="white"
                underlineColor={AppColors.DIVIDER_GRAY}
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
       
        {/* <List.Section>
          <Paragraph style={AppStyles.text_form}>Phone Number</Paragraph>
          <View style={{
            flexDirection : "row",
            alignItems : "center"
          }}>
          <TouchableOpacity
        onPress={() => setShow(true)}
        style={{
            width: scale(70),
            // height: 60,
            paddingLeft: scale(15),
        }}
      >
        <Text style={{
            color: 'white',
            fontSize: moderateScale(16)
        }}>
            {countryCode}
        </Text>
        <CountryPicker
        show={show}
        lang={"en"}
        pickerButtonOnPress={(item) => {
          setCountryCode(item.dial_code);
          setShow(false);
        }}
        disableBackdrop={false}
        onBackdropPress={() => setShow(false)}
        // enableModalAvoiding={true}
        style={{
          // Styles for whole modal [View]
          modal: {
              height: verticalScale(500),
              backgroundColor: AppColors.WHITE
          },
          // Styles for modal backdrop [View]
          backdrop: {
          
          },
          // Styles for bottom input line [View]
          line: {
          
          },
          // Styles for list of countries [FlatList]
          itemsList: {
          
          },
          // Styles for input [TextInput]
          textInput: {
                height: scale(40),
                borderRadius: 0,
          },
          // Styles for country button [TouchableOpacity]
          countryButtonStyles: {
                height: scale(50)
          },
          // Styles for search message [Text]
          searchMessageText: {
            
          },
          // Styles for search message container [View]
          countryMessageContainer: {
          
          },
          // Flag styles [Text]
         
          // Dial code styles [Text]
          dialCode: {
  
          },
          // Country name styles [Text]
          countryName: {
  
          }
      }}
      />
      </TouchableOpacity>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                textAlign={'left'}
                autoCapitalize={'none'}
                mode="flat"
                label={null}
                style={[AppStyles.input_flat, {width : Dimensions.get("screen").width - scale(90)}]}
                placeholder="Enter your phone number"
                value={value}
                onChangeText={onChange}
                textColor="white"
                underlineColor={AppColors.DIVIDER_GRAY}
                keyboardType={'numeric'}
              />
            )}
            name="mobile_number"
          />
          </View>
          {errors.email && (
            <Paragraph style={AppStyles.error_text}>
              Please enter a phone number.
            </Paragraph>
          )}
        </List.Section> */}
        <List.Section>
          <Paragraph style={AppStyles.text_form}>Password</Paragraph>
          <Controller
            control={control}
            rules={{
              required: true,
              pattern: passwordPattern,
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                autoCorrect={false}
                textAlign={'left'}
                mode="flat"
                label={null}
                style={AppStyles.input_flat}
                secureTextEntry={secureEntry}
                placeholder="Enter your password"
                right={
                  <TextInput.Icon
                    icon={secureEntry ? 'eye' : 'eye-off'}
                    onPress={() => setSecureEntry(!secureEntry)}
                  />
                }
                textColor="white"
                value={value}
                onChangeText={onChange}
                underlineColor={AppColors.DIVIDER_GRAY}
              />
            )}
            name="password"
          />
          {errors.password && (
            <Paragraph style={AppStyles.error_text}>
              Please use a combination of uppercase letters, lower case letters,
              numbers and at least eight (8) characters or more.
            </Paragraph>
          )}
        </List.Section>
        <List.Section>
          <Paragraph style={AppStyles.text_form}>Confirm Password</Paragraph>
          <Controller
            control={control}
            rules={{
              required: true,
              validate: (value) => value === watch('password', '') || 'ERROR',
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                autoCorrect={false}
                textAlign={'left'}
                mode="flat"
                label={null}
                style={AppStyles.input_flat}
                secureTextEntry={secureEntry}
                placeholder="Confirm your password"
                value={value}
                onChangeText={onChange}
                textColor="white"
                underlineColor={AppColors.DIVIDER_GRAY}
              />
            )}
            name="password_confirm"
          />
          {errors.password_confirm && (
            <Paragraph style={AppStyles.error_text}>
              Password confirmation doesn't match.
            </Paragraph>
          )}
        </List.Section>
        <List.Section>
          <View style={[AppStyles.view_text_center, AppStyles.m10]}>
            <Checkbox
              color={AppColors.LOGO_COLOR}
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => {
                setChecked(!checked);
              }}
            />
            <Paragraph style={[AppStyles.text_login_register]}>
              I have read and accept the
            </Paragraph>
            <TouchableOpacity
              onPress={() => RootNavigation.navigate('sign_in')}
            >
              <Paragraph style={AppStyles.text_underline}>
                privacy policy{' '}
              </Paragraph>
            </TouchableOpacity>
            <Paragraph style={[AppStyles.text_login_register]}>and</Paragraph>
            <TouchableOpacity
              onPress={() => RootNavigation.navigate('sign_in')}
            >
              <Paragraph style={AppStyles.text_underline}>
                terms of use
              </Paragraph>
            </TouchableOpacity>
          </View>
        </List.Section>
        <List.Section>
          <Button
            mode="contained"
            dark={true}
            buttonColor={AppColors.LOGO_COLOR}
            onPress={handleSubmit(signUpAction)}
            style={AppStyles.button}
            contentStyle={AppStyles.button_content}
            labelStyle={AppStyles.button_label}
          >
            Create my account
          </Button>
        </List.Section>
        <List.Section style={AppStyles.mb25}>
          <View style={AppStyles.view_text_center}>
            <Paragraph style={[AppStyles.text_login_register]}>
              Already have an account?
            </Paragraph>
            <TouchableOpacity
              onPress={() => RootNavigation.navigate('sign_in')}
            >
              <Paragraph style={AppStyles.text_login_register_orange}>
                Login
              </Paragraph>
            </TouchableOpacity>
          </View>
        </List.Section>
      </ScreenBack>

      <DialogLoadingIndicator visible={loading} />

      <Snackbar
        wrapperStyle={AppStyles.snackbar_wrapper}
        style={AppStyles.snackbar_content}
        visible={isSuccess}
        onDismiss={() => setIsSuccess(false)}
        action={{
          label: 'OK',
          onPress: () => {
            RootNavigation.navigate('sign_in');
          },
        }}
        duration={Snackbar.DURATION_MEDIUM}
      >
        <Text style={{ color: AppColors.BLACK, fontFamily: 'Roboto-Regular' }}>
          {'Your account has been successfully created'}
        </Text>
      </Snackbar>

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
