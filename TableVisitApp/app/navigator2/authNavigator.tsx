import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  ForgotPasswordScreen,
  SignUpScreen,
  StaffSignInScreen,
} from '../screens';
import {Verification} from '../screens/verification/verification';

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

const Stack = createNativeStackNavigator<RootParamList>();

function AuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="sign_in"
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
}

export default AuthNavigator;
