import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { View } from 'react-native';
import { Button, List, Paragraph, TextInput } from 'react-native-paper';
import { AppColors, AppStyles } from '../../theme';
import { RootNavigation } from '../../navigators';
import { useEffect, useState } from 'react';
import { DialogLoadingIndicator, Screen, ScreenBack } from '../../components';
import { useForm, Controller } from 'react-hook-form';
import { emailPattern } from '../../utils/app-helper';
import { forgotpasswordApi } from './forgotPasswordApi';

export const ForgotPasswordScreen = observer(function ForgotPasswordScreen() {
  const [loading, setLoading] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
    },
  });

  useEffect(() => {
    setLoading(true);

    async function fetchData() {
      try {
      } catch (e) {
        console.warn(e);
      } finally {
        setLoading(false);
      }
    }

    fetchData().then();

    return () => {};
  }, []);

  const recoverPassword =  (data) => {
    // setLoading(true);


    const result=
      { email: data?.email}
    
      forgotpasswordApi.forgotpassword(result, (res: any) => {
      if (res) {
        console.log("res",res)
        
        // alert("Verification Done Successfully");
         RootNavigation.navigate('reset-password',{
          data:res
         });
    
      }
  },(error:any)=>{
      alert(error?.message);

  
    setLoading(false);


  })


    // setLoading(true);

    // try {
    // } catch (e) {
    //   console.warn(e);
    // } finally {
    //   setLoading(false);
    // }

    // RootNavigation.navigate('sign_in');
  };

  return (
    <>
      <ScreenBack
        unsafe={true}
        style={AppStyles.screen_container}
        backgroundColor={AppColors.BG}
      >
        <List.Section>
          <View style={AppStyles.row}>
            <View style={AppStyles.wrapper}>
              <Paragraph style={AppStyles.basic_text}>
                Enter the email associated to your account and we will send you
                an email with a link to recover your password.
              </Paragraph>
            </View>
          </View>
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
                underlineColor={AppColors.DIVIDER_GRAY}
                keyboardType={'email-address'}
                textColor="white"
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
          <Button
            mode="contained"
            dark={true}
            buttonColor={AppColors.LOGO_COLOR}
            onPress={handleSubmit(recoverPassword)}
            style={AppStyles.button}
            contentStyle={AppStyles.button_content}
            labelStyle={AppStyles.button_label}
          >
            Re-establish password
          </Button>
        </List.Section>
      </ScreenBack>
      <DialogLoadingIndicator visible={loading} />
    </>
  );
});
