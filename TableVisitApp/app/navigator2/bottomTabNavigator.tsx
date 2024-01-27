import React, { createContext } from 'react';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import {
  BookingsScreen,
  HomeScreen,
  InboxMessagesScreen,
  SearchScreen,
} from '../screens';
import { Avatar, useTheme } from 'react-native-paper';
import { AppColors } from '../theme';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Tab = createBottomTabNavigator();

export const BottomNavigationStackContext = createContext(null);

const BottomNavigator = ({ route }) => {
  const theme = useTheme();

  theme.colors.secondaryContainer = 'transperent';

  return (
    <BottomNavigationStackContext.Provider value={route}>
      <Tab.Navigator
        screenOptions={{ headerShown: false }}
        tabBar={(props) => <CustomTabBarView {...props} />}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          initialParams={{ focusedIcon: 'home-outline' }}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          initialParams={{ focusedIcon: 'magnify' }}
        />
        <Tab.Screen
          name="Bookings"
          component={BookingsScreen}
          initialParams={{ focusedIcon: 'checkbook' }}
        />
        <Tab.Screen
          name="Inbox"
          component={InboxMessagesScreen}
          initialParams={{ focusedIcon: 'comment-multiple-outline' }}
        />
      </Tab.Navigator>
    </BottomNavigationStackContext.Provider>
  );
};

export default BottomNavigator;

const windowWidth = Dimensions.get('window').width;

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
const CustomTabBarView = (props: BottomTabBarProps) => {
  const routes = props.state.routes;
  const currentTabIndex = props.state.index;

  return (
    <View style={styles.tabViewContainerStyle}>
      {routes.map((item: any, index) => {
        const isSelectedTab = index == currentTabIndex;

        return (
          <TouchableOpacity
            disabled={isSelectedTab}
            onPress={() => {
              LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut
              );
              props.navigation.navigate(item.name);
            }}
            key={item.key}
          >
            <Avatar.Icon
              style={[
                {
                  backgroundColor: isSelectedTab
                    ? AppColors.STAR
                    : AppColors.LIGHT_BLACK,
                  top: isSelectedTab ? -20 : 0,
                  shadowColor: isSelectedTab
                    ? AppColors.STAR
                    : AppColors.LIGHT_BLACK,
                },
                styles.iconStyle,
              ]}
              color={isSelectedTab ? AppColors.WHITE : AppColors.LIGHR_WHITE}
              size={50}
              icon={item.params?.focusedIcon}
            />
            <View
              style={[
                {
                  width: windowWidth / routes.length,
                  paddingBottom:
                    props.insets.bottom != 0 ? props.insets.bottom : 10,
                },
                styles.tabItemContainerStyle,
              ]}
            >
              {isSelectedTab && (
                <View style={styles.selectedBGViewStyle}>
                  <View style={styles.tabLeftBorderRadiusStyle}>
                    <View style={styles.tabBorderRadiusSubStyle} />
                  </View>
                </View>
              )}
              {isSelectedTab && (
                <View style={styles.selectedBGViewStyle}>
                  <View style={styles.tabRightBorderRadiusStyle}>
                    <View style={styles.tabBorderRadiusSubStyle} />
                  </View>
                </View>
              )}

              <View style={{ height: 40 }}></View>
              {isSelectedTab && (
                <Text style={styles.tabTextStyle}>{item.name}</Text>
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  iconStyle: {
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 1000,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  selectedBGViewStyle: {
    borderRadius: 1000,
    width: 80,
    height: 80,
    alignSelf: 'center',
    position: 'absolute',
    backgroundColor: AppColors.BG,
    top: -40,
  },
  tabViewContainerStyle: {
    flexDirection: 'row',

    backgroundColor: AppColors.LIGHT_BLACK,
    shadowColor: AppColors.LIGHT_BLACK,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 13,
  },
  tabItemContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  tabLeftBorderRadiusStyle: {
    width: 20,
    height: 10,
    backgroundColor: AppColors.BG,
    right: '100%',
    top: '50%',
    position: 'absolute',
    alignSelf: 'flex-end',
  },
  tabRightBorderRadiusStyle: {
    width: 20,
    height: 10,
    backgroundColor: AppColors.BG,
    left: '100%',
    top: '50%',
    position: 'absolute',
    alignSelf: 'flex-end',
    // zIndex: 100,
  },
  tabBorderRadiusSubStyle: {
    height: 20,
    width: 20,
    backgroundColor: AppColors.LIGHT_BLACK,
    borderRadius: 10,
  },
  tabTextStyle: {
    color: AppColors.STAR,
    marginTop: 5,
    fontFamily: 'Roboto-Bold',
  },
});
