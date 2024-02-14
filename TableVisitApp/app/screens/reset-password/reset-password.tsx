import OTPInputView from '@twotalltotems/react-native-otp-input';
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
import { AppColors, AppStyles, moderateScale, scale, verticalScale } from '../../theme';
import { RootNavigation } from '../../navigators';
import { useEffect, useState } from 'react';
import { DialogLoadingIndicator, Screen, ScreenBack } from '../../components';
import { useStores } from '../../models';
import { useForm, Controller } from 'react-hook-form';
import { emailPattern, passwordPattern } from '../../utils/app-helper';
import { load, REGISTRATION_DATA, save, TRUE, USER_EMAIL, USER_PHONE } from '../../utils/storage';
import { signinApi } from './signupApi';
import { forgotpasswordApi } from '../forgot-password/forgotPasswordApi';
import { goBack } from '../../navigators/RootNavigation';
export default function ResetPassword(props:any) {
  const [otp, setOtp] = useState<string>("");
  const [secureEntry, setSecureEntry] = useState(true);
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      otp:"",
      password: '',
      newpassword: '',
    },
  });
  const signUpAction=(data)=>{
    console.log("datata",data)
    const params={
        user_id :props?.route?.params?.data?.user_id,
        old_password:data.password,
        new_password:data.password_confirm,
        otp:otp
    }

  
    forgotpasswordApi.Reestpassword(params, (res: any) => {
    if (res) {
      console.log("res",res)
      
      // alert("Verification Done Successfully");
       RootNavigation.navigate('sign_in'); 
  // goBack()
  // goBack()
    }
},(error:any)=>{
    alert(error?.message);


//   setLoading(false);


})

  }
  return (
    <>
    <ScreenBack
      unsafe={true}
      style={AppStyles.screen_container}
      backgroundColor={AppColors.BG}
    >
      <View
        style={{
          padding: 10,
          paddingBottom: 1,
        //   justifyContent: "center",
        //   alignSelf: "center",
        //   alignItems: "center",
          flex: 1,
        }}
      >
      

        <Text style={{ color: "white", lineHeight: 23 }}>
          Please enter code below and verify yourself.
        </Text>
        <OTPInputView
          code={otp}
          style={{
            width: "70%",
            height: 100,
            alignSelf: "center",
            alignItems: "center",
          }}
          selectionColor="white"
          placeholderTextColor="white"
          pinCount={6}
        //   value={value}
        
          onCodeChanged={(code) => setOtp(code)}
          autoFocusOnLoad
          codeInputFieldStyle={{
            width: 30,
            height: 45,
            borderWidth: 0,
            borderBottomWidth: 1,
          }}
          codeInputHighlightStyle={{
            borderColor: "#03DAC6",
          }}
          onCodeFilled={(code) => {
            setOtp(code)

            // verifyOTP(code);
          }}
        />
        {/* <TouchableOpacity
          onPress={() => {
            // verifyOTP(otp);
          }}
        >
          <Text style={{ color: "white", marginTop: 10 }}>Verify OTP</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            // RootNavigation.navigate("sign_in");
          }}
        >
          <Text style={{ color: "white", marginTop: 10 }}>
            Go to login page
          </Text>
        </TouchableOpacity> */}


        <List.Section>
          <Paragraph style={AppStyles.text_form}>Old Password</Paragraph>
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
          <Paragraph style={AppStyles.text_form}>New Password</Paragraph>
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
                placeholder="Confirm your password"
                value={value}
                onChangeText={onChange}
                textColor="white"
                underlineColor={AppColors.DIVIDER_GRAY}
              />
            )}
            name="password_confirm"
          />
          {errors.newpassword && (
            <Paragraph style={AppStyles.error_text}>
             Please use a combination of uppercase letters, lower case letters,
              numbers and at least eight (8) characters or more.
            </Paragraph>
          )}
        </List.Section>

        
       
      </View>

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
            Save
          </Button>
        </List.Section>
    </ScreenBack>
   
  </>
  )
}