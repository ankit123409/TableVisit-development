import React, { createContext, useState } from 'react';
import { BookingStaffNotifications } from '../screens';
import { BottomNavigation, useTheme } from 'react-native-paper';
import { AppColors, AppStyles } from '../theme';

type RoutesState = Array<{
  key: string;
  title: string;
  color?: string;
  badge?: boolean;
  getAccessibilityLabel?: string;
  getTestID?: string;
  focusedIcon?: string;
}>;

export const HookahBottomNavigationStackContext = createContext(null);

const HookahBottomNavigator = ({ route }) => {
  const theme = useTheme();

  theme.colors.secondaryContainer = 'transperent';

  const [index, setIndex] = useState(0);
  const [routes] = useState<RoutesState>([
    {
      key: 'notifications',
      title: 'Notifications',
      focusedIcon: 'bell-outline',
    },
  ]);

  return (
    <HookahBottomNavigationStackContext.Provider value={route}>
      <BottomNavigation
        barStyle={AppStyles.bottom_navigation_bar}
        activeColor={AppColors.LOGO_COLOR}
        inactiveColor={AppColors.WHITE}
        shifting={false}
        navigationState={{ index, routes }}
        onIndexChange={(index) => {
          setIndex(index);
          route.params = { index: index };
        }}
        renderScene={BottomNavigation.SceneMap({
          notifications: BookingStaffNotifications,
        })}
      />
    </HookahBottomNavigationStackContext.Provider>
  );
};

export default HookahBottomNavigator;
