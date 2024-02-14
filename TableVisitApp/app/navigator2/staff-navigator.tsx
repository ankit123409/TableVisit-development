import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SignOutScreen } from '../screens/sign-out/sign-out-screen';
import { AppColors } from '../theme';
import StaffBottomNavigator from './staffBottomTabNavigator';
import { useStores } from '../models';
import { USER_DATA, load } from '../utils/storage';
import { UserTypeEnum } from '../utils/app-enums';
import HookahBottomNavigator from './hookahBottomTabNavigator';
import { LoadingScreen } from '../screens/loader-screen/loader-screen';
import { BookingStaffDetailsScreen } from '../screens';
import SecurityBottomNavigator from './securityBottomTabNavigator';
import ManagerBottomNavigator from './managerBottomTabNavigator copy';
import { ChatScreen } from '../screens/staff-chat/chat-screen';
import { verticalAnimation } from '../animations';
import DjBottomNavigator from './djBottomTabNavigator';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-paper';

export type StaffParamList = {
  staff_home: undefined;
  staff_tables: undefined;
  chat: undefined;
  staff_table_spends: undefined;
  sign_out: undefined;
  AppDrawerStack: undefined;
  staffbottomNav: undefined;
  bottomNav: undefined;
  loading: undefined;
  booking_staff_details: undefined | { data: any };
  dj: undefined;
};
const Stack = createNativeStackNavigator<StaffParamList>();

export function StaffNavigator() {
  const [user, setUser] = useState(null);
  useEffect(() => {

    console.log("sdjbjbdjb")
    // const fetchData = async () => {
    //   try {
    //     const user = await load(USER_DATA);

    //     setUser(user);
    //   } catch (e) {}
    // };

    // fetchData().then();
  }, []);

  console.log("user?.user_type_id", user?.staff_type)
  return (
    <Stack.Navigator
      // initialRouteName="StaffHomeScreen"
      screenOptions={(props) => ({
        headerStyle: {
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
        title: 'Home',
        headerTitleStyle: {
          color: 'white',
          fontSize: 20,
        },
        headerTitleAlign: 'left',
      })}
    >
      {/* <Stack.Screen
        options={{
          title: '',
        }}
        name="staff_home"
        component={StaffHomeScreen}
      />
      <Stack.Screen
        options={{
          title: '',
        }}
        name="staff_tables"
        component={StaffTablesScreen}
      />
      <Stack.Screen
        options={{
          title: '',
        }}
        name="chat"
        component={ChatScreen}
      />
      <Stack.Screen
        options={{
          title: 'Table spends',
        }}
        name="staff_table_spends"
        component={StaffTableSpendsScreen}
      /> */}
       <Stack.Screen
          name="staffbottomNav"
          component={StaffBottomNavigator}
          options={{ headerShown: false, headerTitleAlign: 'center' }}
        />
      <Stack.Screen
        options={verticalAnimation as any}
        name="chat"
        component={ChatScreen}
      />
      <Stack.Screen
        options={{
          title: '',
        }}
        name="loading"
        component={LoadingScreen}
      />
        
      {/* {user?.user_type_id === 8 ? (
        <Stack.Screen
          name="staffbottomNav"
          component={HookahBottomNavigator}
          options={{ headerShown: false, headerTitleAlign: 'center' }}
        />
      ) : user?.user_type_id === 9 ? (
        <Stack.Screen
          name="staffbottomNav"
          component={SecurityBottomNavigator}
          options={{ headerShown: false, headerTitleAlign: 'center' }}
        />
      ) : user?.user_type_id === 1 ? (
        <Stack.Screen
          name="staffbottomNav"
          component={DjBottomNavigator}
          options={{ headerShown: false, headerTitleAlign: 'center' }}
        />
      ) : user?.user_type_id === 5 ? (
        <Stack.Screen
          name="staffbottomNav"
          component={StaffBottomNavigator}
          options={{ headerShown: false, headerTitleAlign: 'center' }}
        />
      ) : user?.staff_type === 2 ? (
        <Stack.Screen
          name="staffbottomNav"
          component={ManagerBottomNavigator}
          options={{ headerShown: false, headerTitleAlign: 'center' }}
        />
      ) : (
        <Stack.Screen
          name="staffbottomNav"
          component={StaffBottomNavigator}
          options={{ headerShown: false, headerTitleAlign: 'center' }}
        />
      )} */}
      <Stack.Screen
        name="booking_staff_details"
        component={BookingStaffDetailsScreen}
        options={(props) => {
          return {
            title: 'Table Details',
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
            }
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
}

const exitRoutes = ['chat'];
export const canExitStaff = (routeName: string) =>
  exitRoutes.includes(routeName);
