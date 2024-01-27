import { observer } from 'mobx-react-lite';
import * as React from 'react';
import {
  AppColors,
  AppStyles,
  moderateScale,
  scale,
  verticalScale,
} from '../../theme';
import {  ScreenBack } from '../../components';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export const ReservationPolicy = observer(function ReservationPolicy() {
  return (
    <>
      <ScreenBack
        unsafe={true}
        style={AppStyles.screen_container}
        backgroundColor={AppColors.BG}
      >
        <ScrollView style={[styles.container]}>
          <View
            style={{
              padding: scale(15),
            }}
          >
            <Text style={styles.descriptionStyle}>
              All reservations must be cancelled 48 hours prior to date of booking for a full deposit refund. Any booking canceled within 48 hours of booking date will be non-refundable.
            </Text>

          </View>
        </ScrollView>
      </ScreenBack>
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  descriptionStyle: {
    color: '#E1D3BE',
    marginBottom: verticalScale(10),
    lineHeight: verticalScale(15),
    fontFamily: 'Roboto-Regular',
    fontSize: moderateScale(12),
  },
});
