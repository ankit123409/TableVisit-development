import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';

import DrawerItems from '../components/drawer-items/drawer-items';
import BottomNavigator from './bottomTabNavigator';
import { AppColors, moderateScale, verticalScale } from '../theme';
import { Image, TouchableOpacity, View } from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/core';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Drawer = createDrawerNavigator();

const CustomDrawerToggle = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      style={{
        marginLeft: 16,
        width: moderateScale(40),
        height: moderateScale(40),
        marginTop : verticalScale(16)
      }}
    >
      <Image
        source={require('../screens/shared/drawer.png')}
        style={{ width: moderateScale(21), height: moderateScale(17) }}
      />
    </TouchableOpacity>
  );
};

function AppDrawerStack() {
  const Insets = useSafeAreaInsets();
  return (
    <Drawer.Navigator
      screenOptions={{
        swipeEnabled: false,
        title: 'Home',
        headerStyle: {
          backgroundColor: AppColors.BG,
        },
        headerLeft: () => <CustomDrawerToggle />,
        header: (props) => (
          <View
            style={{
              paddingTop: Insets.top + 10,
              paddingBottom: Insets.top / 3,
              backgroundColor: AppColors.BG,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <CustomDrawerToggle />
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Image
                source={require('../screens/shared/table-visit.png')}
                resizeMode="contain"
                style={{
                  width: moderateScale(121),
                  height: moderateScale(22),
                }}
              />
            </View>
            <View style={{ width: 37 }} />
          </View>
        ),
        headerTitle: (props) => {
          return (
            <Image
              source={require('../screens/shared/table-visit.png')}
              resizeMode="contain"
              style={{
                width: moderateScale(121),
                height: moderateScale(22),
              }}
            />
          );
        },
      }}
      drawerContent={(props) => <DrawerItems />}
      initialRouteName="bottomNav"
    >
      <Drawer.Screen name="bottomNav" component={BottomNavigator} />
    </Drawer.Navigator>
  );
}

export default AppDrawerStack;
