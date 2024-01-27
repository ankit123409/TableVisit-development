import * as React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Avatar, Drawer, List, Paragraph } from 'react-native-paper';
import { AppColors, AppStyles } from '../../theme';
import { useEffect, useState } from 'react';
import { load, USER_DATA, USER_LOCATION } from '../../utils/storage';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import Moment from 'moment';
import {
  DrawerActions,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';
import Icon from 'react-native-paper/src/components/Icon';

const drawItemsData = [
  {
    label: 'Invite friends',
    icon: 'account-multiple-plus-outline',
    key: 1,
    navigation: 'invite',
  },
  {
    label: 'Get help',
    icon: 'help-circle-outline',
    key: 2,
    navigation: 'help',
  },
  {
    label: 'Give us feedback',
    icon: 'comment-text-multiple-outline',
    key: 3,
    navigation: 'feedback',
  },
  {
    label: 'Notifications',
    icon: 'bell-outline',
    key: 4,
    navigation: 'notifications',
  },
  {
    label: 'Privacy Policy',
    icon: 'shield-account-outline',
    key: 5,
    navigation: 'privacy',
  },
  {
    label: 'Terms of Use',
    icon: 'shield-lock-outline',
    key: 6,
    navigation: 'terms',
  },
  { label: 'Sign Out', icon: 'power', key: 7, navigation: 'sign_out' },
];

/*const renderList = (data: any) => {
    return (
        <>
            <FlatList
                style={{marginBottom: 15}}
                ListHeaderComponent={() => {
                    return (
                        <></>
                    );
                }}
                ListFooterComponent={() => {
                    return (
                        <>
                            <Divider style={AppStyles.items_divider}/>
                            <Paragraph
                                style={AppStyles.drawer_version}>{Application.nativeApplicationVersion}</Paragraph>
                        </>
                    );
                }}
                data={[...data]}
                keyExtractor={(item) => String(item.key)}
                ItemSeparatorComponent={() => {
                    return (
                        <Divider style={AppStyles.items_divider}/>
                    )
                }}
                renderItem={({item, index}) => {
                    return (
                        <List.Item
                            left={(props) => <List.Icon {...props} icon={item.icon}/>}
                            right={(props) => <List.Icon {...props} icon="chevron-right"/>}
                            titleStyle={AppStyles.item_title}
                            key={index}
                            title={item.label}
                            onPress={() => RootNavigation.navigate(item.navigation)}
                        />
                    );
                }}
            />
        </>
    );
}*/

const DrawerItems = () => {
  const [user, setUser] = useState<any>({});
  const [location, setLocation] = useState<any>({});
  const [drawerItemIndex, setDrawerItemIndex] = useState<number>(0);
  const setDrawerItem = (index: number) => setDrawerItemIndex(index);

  const navigation: NavigationProp<any> = useNavigation();
  const [timestamp, setTimestamp] = useState<number>(0);

  useEffect(() => {
    async function fetchData() {
      try {
        let user_data = await load(USER_DATA);

        if (user_data) setUser(user_data);

        let temp_location = await load(USER_LOCATION);

        if (temp_location) setLocation(temp_location);

        setTimeout(() => {
          setTimestamp(Moment().unix());
        }, 1000);
      } catch (e) {
        console.warn(e);
      } finally {
      }
    }

    fetchData().then();
  }, [timestamp]);

  return (
    <DrawerContentScrollView
      alwaysBounceVertical={false}
      style={{ backgroundColor: AppColors.LIGHTGRAY }}
    >
      <Drawer.Section style={{ marginTop: 10 }} showDivider={false}>
        <TouchableOpacity
          onPress={() => {
            setDrawerItem(30);
            navigation.navigate('profile');
          }}
        >
          <View
            style={[
              {
                padding: 10,
                paddingHorizontal: 20,
                alignItems: 'center',
                gap: 10,
              },
              AppStyles.row_wrap,
            ]}
          >
            <Avatar.Image
              source={
                user.avatar
                  ? {
                      uri: `https://tablevisit.s3.us-east-1.amazonaws.com/user/avatar/${user.avatar}`,
                    }
                  : require('../../screens/shared/app-logo.png')
              }
              style={AppStyles.user_avatar}
            />
            <View
              style={[
                { paddingLeft: 10, paddingTop: 5 },
                AppStyles.column_wrap,
              ]}
            >
              <Paragraph numberOfLines={1} style={AppStyles.profile_name}>
               {user?.name?.length <= 1 ?  (user?.name.length > 1 ?  `${user.name} ${user.last_name}` : user.email) :   `${user.name} ${user.last_name}` }
              </Paragraph>
              <Paragraph numberOfLines={1} style={AppStyles.profile_email}>
                My Profile
              </Paragraph>
            </View>
          </View>
        </TouchableOpacity>
      </Drawer.Section>
      <Drawer.Section showDivider={false} style={{ marginTop: 10 }}>
        <TouchableOpacity
          style={{
            paddingHorizontal: 20,
            paddingVertical: 15,
            borderBottomWidth: 1,
            borderBottomColor: '#3A3A3F',
          }}
          onPress={() => {
            setDrawerItem(20);
            navigation.navigate('search_allow_location');
            navigation.dispatch(DrawerActions.closeDrawer());
          }}
        >
          <View
            style={[
              {
                justifyContent: 'space-between',
              },
              AppStyles.row_wrap,
            ]}
          >
            <View style={[{ gap: 10 }, AppStyles.row_wrap]}>
              <Icon
                source={'city-variant-outline'}
                size={25}
                color={
                  drawerItemIndex === 20
                    ? AppColors.LOGO_COLOR
                    : AppColors.LIGHR_WHITE
                }
              />
              <Paragraph
                numberOfLines={1}
                style={[
                  styles.labelStyle,
                  {
                    color:
                      drawerItemIndex === 20
                        ? AppColors.LOGO_COLOR
                        : AppColors.LIGHR_WHITE,
                  },
                ]}
              >
                {location.name}
              </Paragraph>
            </View>
            <Icon
              source={'chevron-right'}
              size={25}
              color={
                drawerItemIndex === 20
                  ? AppColors.LOGO_COLOR
                  : AppColors.LIGHR_WHITE
              }
            />
          </View>
        </TouchableOpacity>
        {drawItemsData.map((props, index) => (
          <TouchableOpacity
            style={{
              paddingHorizontal: 20,
              paddingVertical: 15,
              borderBottomWidth: drawItemsData?.length === index + 1 ? 0 : 1,
              borderBottomColor: '#3A3A3F',
            }}
            onPress={() => {
              setDrawerItem(index);
              navigation.navigate(props.navigation);
              navigation.dispatch(DrawerActions.closeDrawer());
            }}
          >
            <View
              style={[
                {
                  justifyContent: 'space-between',
                },
                AppStyles.row_wrap,
              ]}
            >
              <View style={[{ gap: 10 }, AppStyles.row_wrap]}>
                <Icon
                  source={props.icon}
                  size={25}
                  color={
                    drawerItemIndex === index
                      ? AppColors.LOGO_COLOR
                      : AppColors.LIGHR_WHITE
                  }
                />
                <Paragraph
                  numberOfLines={1}
                  style={[
                    styles.labelStyle,
                    {
                      color:
                        drawerItemIndex === index
                          ? AppColors.LOGO_COLOR
                          : AppColors.LIGHR_WHITE,
                    },
                  ]}
                >
                  {props.label}
                </Paragraph>
              </View>
              <Icon
                source={'chevron-right'}
                size={25}
                color={
                  drawerItemIndex === index
                    ? AppColors.LOGO_COLOR
                    : AppColors.LIGHR_WHITE
                }
              />
            </View>
          </TouchableOpacity>
        ))}
      </Drawer.Section>
    </DrawerContentScrollView>
  );
};

export default DrawerItems;

const styles = StyleSheet.create({
  labelStyle: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
  },
});
