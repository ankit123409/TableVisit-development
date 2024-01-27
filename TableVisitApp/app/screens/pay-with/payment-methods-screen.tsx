import {observer} from 'mobx-react-lite';
import {Divider, List, useTheme} from 'react-native-paper';
import {ScrollView, StyleSheet, FlatList, Text, View} from 'react-native';
import * as React from 'react';
import {AppColors, AppStyles} from '../../theme/app-theme';
import {RootNavigation} from '../../navigators';

export const PaymentMethodsScreen = observer(function PaymentMethodsScreen() {
  const {colors} = useTheme();

  const data = [
    {
      key: 'credit',
      title: 'Add another payment method',
      icon: 'credit-card-settings-outline',
    },
  ];

  return (
    <View style={[AppStyles.container, {backgroundColor: colors.background}]}>
      <List.Section>
        <View>
          <Text style={AppStyles.mastercard1234}>Mastercard 1234</Text>
        </View>
        <View>
          <Text style={AppStyles.jakeJohnson}>Jake Johnson</Text>
        </View>
        <View>
          <Text style={AppStyles.date_card}>12/25</Text>
        </View>
      </List.Section>
      <FlatList
        data={[...data]}
        keyExtractor={item => String(item.key)}
        ItemSeparatorComponent={Divider}
        style={AppStyles.flat_list}
        renderItem={({item, index}) => {
          return (
            <List.Item
              titleStyle={AppStyles.list_item_white}
              key={index}
              title={item.title}
              left={props => (
                <List.Icon
                  {...props}
                  color={AppColors.WHITE}
                  icon={'credit-card-settings-outline'}
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
                RootNavigation.navigate('add_card_details');
              }}
            />
          );
        }}
      />
    </View>
  );
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
  },
});
