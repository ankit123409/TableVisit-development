// import { CardField, useConfirmPayment, useStripe } from '@stripe/stripe-react-native';
import { observer } from 'mobx-react-lite';
// import * as React from 'react';
// import { StyleSheet } from 'react-native';
// import { Button, useTheme } from 'react-native-paper';
// import { ScreenBack } from '../../components';
// import { AppColors } from '../../theme';
import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { CardField, confirmSetupIntent, initPaymentSheet, presentPaymentSheet, useStripe } from '@stripe/stripe-react-native';

export const AddCardDetailsScreen = observer(function AddCardDetailsScreen(props:any) {
  const handleAddCard=async ()=>{

    // const { error } = await initPaymentSheet({
    //   merchantDisplayName: 'Table Visit',
    //   paymentIntentClientSecret:"pi_3OhZ53Hc45h8j8XY0gdqUA9L_secret_HtkBe7Oc3IcEfMPwg05wxhHiW"
    // });
    const init = await initPaymentSheet({
      merchantDisplayName: 'Table Visit',
      paymentIntentClientSecret:"pi_3OhZCCHc45h8j8XY1EuoSTeo_secret_ZAe2iKrtTMSebocJliQcZQgVM"
      
    }).then(res=>{
      console.log(res)
    }).catch(err=>{
      console.log("err",err)
    })
    console.log("init",init)
    await presentPaymentSheet()

  }
  const handleConfirmPayment=()=>{

  }


  return (
    <View>
      <CardField
        postalCodeEnabled={false}
        placeholder={{
          number: '4242 4242 4242 4242',
        }}
        cardStyle={{
          backgroundColor: '#FFFFFF',
          textColor: '#000000',
        }}
        style={{
          width: '100%',
          height: 50,
          marginVertical: 30,
        }}
      />
      <Button title="Add Card" onPress={handleAddCard} />
      <Button title="Confirm Payment" onPress={handleConfirmPayment} />
      
    </View>
  );
      }) ;


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   row: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     paddingHorizontal: 12,
//   },
// });
