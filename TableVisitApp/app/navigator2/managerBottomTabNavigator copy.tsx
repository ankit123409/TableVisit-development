import React, { createContext, useState } from 'react';
import { BookingStaffInbox, BookingStaffNotifications } from '../screens';
import { BottomNavigation, useTheme } from 'react-native-paper';
import { AppColors, AppStyles } from '../theme';
import { SecurityBookingScreen } from '../screens/booking-staff/Security_Booking_Screen';

type RoutesState = Array<{
  key: string;
  title: string;
  color?: string;
  badge?: boolean;
  getAccessibilityLabel?: string;
  getTestID?: string;
  focusedIcon?: string;
}>;

export const ManagerBottomNavigationStackContext = createContext(null);

const ManagerBottomNavigator = ({ route }) => {
  const theme = useTheme();

  theme.colors.secondaryContainer = 'transperent';

  const [index, setIndex] = useState(0);
  const [routes] = useState<RoutesState>([
    {
      key: 'bookings',
      title: 'Bookings',
      focusedIcon: 'checkbook',
    },
    { key: 'inbox', title: 'Inbox', focusedIcon: 'comment-multiple-outline' },

    {
      key: 'notifications',
      title: 'Notifications',
      focusedIcon: 'bell-outline',
    },
  ]);

  return (
    <ManagerBottomNavigationStackContext.Provider value={route}>
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
          bookings: SecurityBookingScreen,
          inbox: BookingStaffInbox,
          notifications: BookingStaffNotifications,
        })}
      />
    </ManagerBottomNavigationStackContext.Provider>
  );
};

export default ManagerBottomNavigator;
