import { observer } from 'mobx-react-lite';
import { Image, Dimensions } from 'react-native';
import * as React from 'react';
import { useCallback } from 'react';
import { RootNavigation } from '../../navigators';
import { useFocusEffect } from '@react-navigation/native';
import { isSignedIn } from '../../utils/auth';

export const LoadingScreen = observer(function LoadingScreen() {
  useFocusEffect(
    useCallback(() => {
      async function fetchData() {}

      fetchData().then(async () => {
        setTimeout(async () => {
          await isSignedIn().then((x) => {
            if (x) {
              RootNavigation.navigate('init');
            } else RootNavigation.navigate('auth');
          });
        }, 1500);
      });
    }, [true])
  );

  return (
    <Image
      style={{
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
      }}
      source={require('../shared/splash_screen.png')}
    />
    // <View style={AppStyles.splash_container}>
    //   <View>
    //     <Image
    //       style={{
    //         width: moderateScale(150),
    //         height: moderateScale(150),
    //         resizeMode: 'center',
    //       }}
    //       source={require('../shared/logo.png')}
    //     />
    //   </View>
    // </View>
  );
});
