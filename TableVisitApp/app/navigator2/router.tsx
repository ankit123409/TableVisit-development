import * as React from 'react';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import DashboardNavigator from './dashboardNavigator';
import AuthNavigator from './authNavigator';
import {ApplicationProvider} from '../navigators';
import {AppStyles} from '../theme';
import {Image, View} from 'react-native';
import {LoadingScreen} from '../screens/loading/loading-screen2';
import {StatusBar} from 'expo-status-bar';

const AppRouter = React.forwardRef<
  NavigationContainerRef,
  Partial<React.ComponentProps<typeof NavigationContainer>>
>((props, ref) => {
  const [isPreloading, setIsPreloading] = React.useState(true);

  const onLoadEffect = () => {
    (async () => {
      setTimeout(() => {
        setIsPreloading(false);
      }, 2000);
    })();
  };
  React.useEffect(onLoadEffect, []);

  //   if (isPreloading) {
  //     return (
  //       //   <View style={AppStyles.splash_container}>
  //       //     <View>
  //       //       <Image
  //       //         style={{maxWidth: 200, resizeMode: 'center'}}
  //       //         source={require('../screens/shared/logo.png')}
  //       //       />
  //       //     </View>
  //       //   </View>
  //       <NavigationContainer>
  //         <ApplicationProvider>
  //           <LoadingScreen />
  //         </ApplicationProvider>
  //       </NavigationContainer>
  //     );
  //   } else {
  return (
    <NavigationContainer {...props} ref={ref}>
      {true ? <DashboardNavigator /> : <AuthNavigator />}
      <StatusBar style="dark" />
    </NavigationContainer>
  );
  //   }
});

export default AppRouter;
