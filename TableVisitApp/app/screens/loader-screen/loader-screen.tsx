import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { DialogLoadingIndicator, Screen, ScreenBack } from '../../components';
import { AppColors } from '../../theme';
import { USER_DATA, load } from '../../utils/storage';

export const LoadingScreen = observer(function LoadingScreen(props: any) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await load(USER_DATA);
        if (user.user_type_id) {
          props.navigation.replace('staffbottomNav');
          setLoading(false);
        }
      } catch (e) {}
    };
    fetchData().then();
  }, []);

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <ScreenBack unsafe={true} backgroundColor={AppColors.BG}>
          <DialogLoadingIndicator visible={loading} />
        </ScreenBack>
      </SafeAreaView>
    </>
  );
});
