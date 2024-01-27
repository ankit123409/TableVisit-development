import React, { createContext, useState } from 'react';
import { BottomNavigation, useTheme } from 'react-native-paper';
import { AppColors, AppStyles } from '../theme';
import { DJRequest } from '../screens/booking-staff/DJRequest';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DjStaffScreen } from '../screens/dj-staff/DjStaff_Screen';
import { WithdrowScreen } from '../screens/withdrow';
import { AmountTransfer } from '../screens/withdrow/Amount_Transfer';

type RoutesState = Array<{
  key: string;
  title: string;
  color?: string;
  badge?: boolean;
  getAccessibilityLabel?: string;
  getTestID?: string;
  focusedIcon?: string;
}>;

export type StaffParamList = {
  dj: undefined;
  withdrow : undefined
  amountTransfer : undefined
};

export const SecurityBottomNavigationStackContext = createContext(null);

const Stack = createNativeStackNavigator<StaffParamList>();
const DjBottomNavigator = ({ route }) => {
  const theme = useTheme();

  theme.colors.secondaryContainer = 'transperent';

  const [index, setIndex] = useState(0);
  const [routes] = useState<RoutesState>([
    {
      key: 'dj',
      title: 'DJ',
      focusedIcon: 'checkbook',
    },
  ]);

  return (
    <SecurityBottomNavigationStackContext.Provider value={route}>
    
    <Stack.Navigator
      initialRouteName="dj"
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
        title: '',
        headerTitleStyle: {
          color: 'white',
          fontSize: 20,
        },
        headerTitleAlign: 'left',
      })}
    >
      <Stack.Screen
        name="dj"
        component={DjStaffScreen}
        options={{

        }}
      />
      <Stack.Screen
        name="withdrow"
        component={WithdrowScreen}
        options={{
          title : "Withdraw Tip"
        }}
      />
      <Stack.Screen
        name="amountTransfer"
        component={AmountTransfer}
        options={{
          title : "",
          headerLeft : () => null
        }}
      />
    </Stack.Navigator>
    </SecurityBottomNavigationStackContext.Provider>
  );
};

export default DjBottomNavigator;
