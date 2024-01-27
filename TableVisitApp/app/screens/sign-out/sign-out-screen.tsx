import {observer} from 'mobx-react-lite';
import {RootNavigation} from '../../navigators';
import React, {useContext, useEffect} from 'react';
import {load, USER_DATA} from '../../utils/storage';
import {AppColors, AppStyles} from '../../theme';
import { ScreenBack} from '../../components';
import {onSignOut} from '../../utils/auth';
import {ApplicationContext} from '../../navigator2/main-router';
import { useStores } from '../../models';

export const SignOutScreen = observer(function SignOutScreen() {
  const {unsubscribe} = useContext(ApplicationContext);

  const { userStore } = useStores();

  useEffect(() => {
    async function fetchData() {
      try {
        const user = await load(USER_DATA);

        unsubscribe('payment.channel.' + user.id);
        unsubscribe('message.channel.' + user.id);

        await userStore.logout()
        onSignOut().then(() => {
          RootNavigation.navigate('loading');
        });
      } catch (e) {
        console.warn(e);
      } finally {
        RootNavigation.navigate('sign_in');
      }
    }

    fetchData().then();
  }, []);

  return (
    <ScreenBack
      style={AppStyles.screen_container}
      backgroundColor={AppColors.BG}></ScreenBack>
  );
});
