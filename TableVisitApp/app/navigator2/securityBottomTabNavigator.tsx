import React, { createContext, useState } from 'react';
import { BottomNavigation, useTheme } from 'react-native-paper';
import { AppColors, AppStyles } from '../theme';
import { DJRequest } from '../screens/booking-staff/DJRequest';

type RoutesState = Array<{
  key: string;
  title: string;
  color?: string;
  badge?: boolean;
  getAccessibilityLabel?: string;
  getTestID?: string;
  focusedIcon?: string;
}>;

export const SecurityBottomNavigationStackContext = createContext(null);

const SecurityBottomNavigator = ({ route }) => {
  const theme = useTheme();

  theme.colors.secondaryContainer = 'transperent';

  const [index, setIndex] = useState(0);
  const [routes] = useState<RoutesState>([
    {
      key: 'bookings',
      title: 'Request',
      focusedIcon: 'checkbook',
    },
  ]);

  return (
    <SecurityBottomNavigationStackContext.Provider value={route}>
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
          bookings: DJRequest,
        })}
      />
    </SecurityBottomNavigationStackContext.Provider>
  );
};

export default SecurityBottomNavigator;
