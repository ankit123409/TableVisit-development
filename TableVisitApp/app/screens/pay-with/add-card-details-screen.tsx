import {observer} from 'mobx-react-lite';
import {Button, List, useTheme, Checkbox} from 'react-native-paper';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import * as React from 'react';
import {AppColors, AppStyles} from '../../theme';

export const AddCardDetailsScreen = observer(function AddCardDetailsScreen() {
  const {colors} = useTheme();
  //const navigation = useNavigation()
  const [checked, setChecked] = React.useState('first');

  return (
    <ScrollView
      style={[styles.container, {backgroundColor: colors.background}]}>
      <List.Section>
        <View style={AppStyles.container}>
          <Text style={AppStyles.cardNumber}>Card number</Text>
        </View>
        <View style={AppStyles.row}>
          <View>
            <Image width={50} source={require('../shared/ic-mastercard.png')} />
          </View>
          <View style={AppStyles.container}>
            <Text style={AppStyles.labelTitle}>1234 1234 1234 1234</Text>
          </View>
          <View style={{paddingRight: 8}}>
            <Image width={132} source={require('../shared/ic-camera.png')} />
          </View>
        </View>
        <View style={AppStyles.line} />
        <View style={AppStyles.row}>
          <View>
            <Text style={AppStyles.expiration}>Expiration</Text>
          </View>
          <View>
            <Text style={AppStyles.expiration}>CVV</Text>
          </View>
          <View>
            <Text style={AppStyles.expiration}>ZIP Code</Text>
          </View>
        </View>
        <View style={AppStyles.row}>
          <View>
            <Text style={AppStyles.labelTitle}>12/25</Text>
          </View>
          <View>
            <Text style={AppStyles.labelTitle}>12/25</Text>
          </View>
          <View>
            <Text style={AppStyles.labelTitle}>12/25</Text>
          </View>
        </View>
        <View style={AppStyles.line} />
        <View style={AppStyles.row}>
          <View>
            <Checkbox
              status={checked === 'first' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('first')}
              color="#ffbd59"
            />
          </View>
          <View style={{paddingTop: 8}}>
            <Text style={AppStyles.labelTitle}>Saved card</Text>
          </View>
        </View>
        <View style={AppStyles.line} />

        <Button
          mode="contained"
          buttonColor={AppColors.LOGO_COLOR}
          // onPress={() => logIn()}
          style={AppStyles.button}>
          <Text style={AppStyles.login}>ADD CARD</Text>
        </Button>
      </List.Section>
    </ScrollView>
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
