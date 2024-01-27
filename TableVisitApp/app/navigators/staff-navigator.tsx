import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ChatScreen, StaffTableSpendsScreen} from '../screens';
import {HeaderBackAction} from '../components';
import {StaffHomeScreen, StaffTablesScreen} from '../screens';
import {Appbar} from 'react-native-paper';
import {AppColors, AppStyles} from '../theme';
import {RootNavigation} from './navigation-utilities';
import {SignOutScreen} from '../screens/sign-out/sign-out-screen';

export type StaffParamList = {
  staff_home: undefined;
  staff_tables: undefined;
  chat: undefined;
  staff_table_spends: undefined;
  sign_out: undefined;
};

const Stack = createStackNavigator<StaffParamList>();

const HeaderStaffHomeScreen = ({navigation, scene}) => (
  <Appbar.Header style={{backgroundColor: AppColors.BG}}>
    <Appbar.Action
      icon="account-arrow-left-outline"
      onPress={() => {
        RootNavigation.navigate('sign_out');
      }}
    />
    <Appbar.Content
      titleStyle={{
        ...AppStyles.page_title_small,
        fontSize: scene?.descriptor?.options?.title != '' ? 15 : 23,
      }}
      title={
        scene?.descriptor?.options?.title != ''
          ? scene?.descriptor?.options?.title
          : 'Staff'
      }
    />

    <Appbar.Action
      icon="account-multiple-outline"
      onPress={() => {
        RootNavigation.navigate('staff_tables');
      }}
    />
  </Appbar.Header>
);

export const HeaderStaffTablesScreen = ({navigation, scene, previous}) => (
  <Appbar.Header style={{backgroundColor: AppColors.BARRAS}}>
    {previous ? (
      <Appbar.BackAction size={20} onPress={() => navigation.goBack()} />
    ) : null}
    <Appbar.Content
      titleStyle={AppStyles.page_title_small}
      title={scene?.descriptor?.options?.title}
    />
    <Appbar.Action
      icon="comment-text-multiple"
      onPress={() => {
        RootNavigation.navigate('staff_home');
      }}
    />
  </Appbar.Header>
);

export function StaffNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: 'screen',
        header: ({navigation, scene, previous}) =>
          HeaderBackAction({navigation, scene, previous}),
      }}>
      <Stack.Screen
        options={{
          title: '',
          header: ({navigation, scene}) =>
            HeaderStaffHomeScreen({navigation, scene}),
        }}
        name="staff_home"
        component={StaffHomeScreen}
      />
      <Stack.Screen
        options={{
          title: '',
          header: ({navigation, scene, previous}) =>
            HeaderStaffTablesScreen({navigation, scene, previous}),
        }}
        name="staff_tables"
        component={StaffTablesScreen}
      />
      <Stack.Screen
        options={{
          title: '',
          header: ({navigation, scene, previous}) =>
            HeaderBackAction({navigation, scene, previous}),
        }}
        name="chat"
        component={ChatScreen}
      />
      <Stack.Screen
        options={{
          title: 'Table spends',
          header: ({navigation, scene, previous}) =>
            HeaderStaffTablesScreen({navigation, scene, previous}),
        }}
        name="staff_table_spends"
        component={StaffTableSpendsScreen}
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
}

const exitRoutes = ['chat'];
export const canExitStaff = (routeName: string) =>
  exitRoutes.includes(routeName);
