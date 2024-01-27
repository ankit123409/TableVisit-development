import {observer} from 'mobx-react-lite';
import {List, useTheme, Divider} from 'react-native-paper';
import {FlatList, View} from 'react-native';
import * as React from 'react';
import {RootNavigation} from '../../navigators';
import Zocial from 'react-native-vector-icons/Zocial';
import {AppColors, AppStyles} from '../../theme';

export const PayWithScreen = observer(function PayWithScreen() {
  const {colors} = useTheme();

  //const navigation = useNavigation()

  const data = [
    {
      key: 'credit',
      title: 'Credit or debit card',
      icon: 'credit-card-settings-outline',
    },
    {key: 'paypal', title: 'Paypal', icon: 'paypal'},
  ];

  return (
    <View style={[AppStyles.container, {backgroundColor: colors.background}]}>
      <FlatList
        data={[...data]}
        keyExtractor={item => String(item.key)}
        ItemSeparatorComponent={Divider}
        style={AppStyles.flat_list}
        renderItem={({item, index}) => {
          return (
            <List.Item
              titleStyle={AppStyles.list_item_white}
              title={item.title}
              key={index}
              left={props => (
                <List.Icon
                  {...props}
                  icon={() => {
                    return <Zocial {...props} name={'paypal'} />;
                  }}
                />
              )}
              right={props => (
                <List.Icon
                  {...props}
                  color={AppColors.WHITE}
                  icon="chevron-right"
                />
              )}
              onPress={() => {
                RootNavigation.navigate('payment_methods');
              }}
            />
          );
        }}
      />
    </View>
  );
});
