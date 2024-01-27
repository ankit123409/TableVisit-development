import React, { createContext, useState } from "react";
import {
  BookingStaffInbox,
  BookingStaffNotifications,
  BookingStaffScreen,
  BookingsScreen,
  HomeScreen,
  InboxMessagesScreen,
  SearchScreen,
  StaffHomeScreen,
  StaffTableSpendsScreen,
} from "../screens";
import { BottomNavigation, useTheme } from "react-native-paper";
import { AppColors, AppStyles } from "../theme";
import { StaffTableScreen } from "../screens/staff-table/Staff_Table_Screen";
import { DjStaffScreen } from "../screens/dj-staff/DjStaff_Screen";

type RoutesState = Array<{
  key: string;
  title: string;
  color?: string;
  badge?: boolean;
  getAccessibilityLabel?: string;
  getTestID?: string;
  focusedIcon?: string;
}>;

export const StaffBottomNavigationStackContext = createContext(null);

const StaffBottomNavigator = ({ route }) => {
  const theme = useTheme();

  theme.colors.secondaryContainer = "transperent";

  const [index, setIndex] = useState(0);
  const [routes] = useState<RoutesState>([
    // {
    //   key: 'booking',
    //   title: 'Booking',
    //   focusedIcon: 'checkbook',
    // },
    // { key: 'inbox', title: 'Inbox', focusedIcon: 'comment-multiple-outline' },
    // { key: 'spend', title: 'Spend', focusedIcon: 'checkbook' },
    // {
    //   key: 'notifications',
    //   title: 'Notifications',
    //   focusedIcon: 'comment-multiple-outline',
    // },
    
    {
      key: "bookings",
      title: "Bookings",
      focusedIcon: "checkbook",
    },
    { key: "inbox", title: "Inbox", focusedIcon: "comment-multiple-outline" },
    { key: "spend", title: "Tabs", focusedIcon: "login" },
    {
      key: "notifications",
      title: "Notifications",
      focusedIcon: "bell-outline",
    },
  ]);

  return (
    <StaffBottomNavigationStackContext.Provider value={route}>
      <BottomNavigation
        barStyle={AppStyles.bottom_navigation_bar}
        activeColor={AppColors.LOGO_COLOR}
        inactiveColor={AppColors.WHITE}
        shifting={false}
        navigationState={{ index, routes }}
        // onIndexChange={setIndex}
        onIndexChange={(index) => {
          setIndex(index);
          route.params = { index: index };
        }}
        renderScene={BottomNavigation.SceneMap({
          
          bookings: BookingStaffScreen,
          inbox: BookingStaffInbox,
          spend: StaffTableScreen,
          notifications: BookingStaffNotifications,
        })}
      />
    </StaffBottomNavigationStackContext.Provider>
  );
};

export default StaffBottomNavigator;