import { observer } from 'mobx-react-lite';
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as React from 'react';

import {
  AppColors,
  AppStyles,
  moderateScale,
  verticalScale,
} from '../../theme';
import { Screen, ScreenBack } from '../../components';
import { RootNavigation } from '../../navigators';
import Icon from 'react-native-paper/src/components/Icon';

export const DJRequest = observer(function DJRequest() {
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <ScreenBack unsafe={true} backgroundColor={AppColors.BG}>
          <View style={AppStyles.header_style}>
            <View />
            <Image
              style={AppStyles.logo_image_style}
              source={require('../shared/table-visit.png')}
            />
            <TouchableOpacity
              onPress={() => RootNavigation.navigate('sign_out')}
            >
              <Icon source={'login'} size={25} color={AppColors.LIGHR_WHITE} />
            </TouchableOpacity>
          </View>
          <Text
            style={{
              color: 'white',
              fontFamily: 'Roboto-Bold',
              fontSize: moderateScale(20),
              textAlign: 'center',
              marginTop: verticalScale(100),
            }}
          >
            Coming Soon...
          </Text>
        </ScreenBack>
      </SafeAreaView>
    </>
  );
});
