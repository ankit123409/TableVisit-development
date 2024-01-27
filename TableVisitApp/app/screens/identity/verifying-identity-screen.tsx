import {observer} from 'mobx-react-lite';
import {Button, Paragraph} from 'react-native-paper';
import {Image, View} from 'react-native';
import * as React from 'react';
import {AppColors, AppStyles} from '../../theme';
import {DialogLoadingIndicator, Screen, ScreenBack} from '../../components';
import {RootNavigation} from '../../navigators';
import {useState} from 'react';
import {useStores} from '../../models';
import {
  GOVERNMENT_ID,
  ISSUED_COUNTRY_ID,
  GOVERNMENT_ID_TYPE,
  loadString,
  remove,
} from '../../utils/storage';

export const VerifyingIdentityScreen = observer(
  function VerifyingIdentityScreen() {
    const [loading, setLoading] = useState(false);
    const {userProfileStore} = useStores();

    const save = async () => {
      setLoading(true);

      try {
        const government_id = await loadString(GOVERNMENT_ID);
        const government_id_type = await loadString(GOVERNMENT_ID_TYPE);
        const issued_country_id = await loadString(ISSUED_COUNTRY_ID);

        await userProfileStore.saveGovernmentId({
          government_id: government_id,
          government_id_type: government_id_type,
          issued_country_id: issued_country_id,
        });

        await remove(GOVERNMENT_ID);
        await remove(GOVERNMENT_ID_TYPE);
        await remove(ISSUED_COUNTRY_ID);
      } catch (e) {
        console.warn(e);
      } finally {
        setLoading(false);
      }

      RootNavigation.navigate('profile');
    };

    return (
      <>
        <ScreenBack unsafe={true} backgroundColor={AppColors.BG}>
          <View style={AppStyles.row}>
            <Paragraph style={AppStyles.verification_title}>
              We're verifying your identity
            </Paragraph>
            <Paragraph style={AppStyles.verification_paragraph}>
              We'll let you know when your identity checks are complete.
            </Paragraph>
          </View>
          <View style={AppStyles.row}>
            <Image
              style={AppStyles.verification_img}
              source={require('../shared/loading.png')}
            />
          </View>
          <View style={AppStyles.modal_bottom}>
            <Button
              mode="contained"
              dark={true}
              buttonColor={AppColors.LOGO_COLOR}
              onPress={async () => {
                await save();
              }}
              style={AppStyles.button}
              contentStyle={AppStyles.button_content}
              labelStyle={AppStyles.button_label}>
              DONE
            </Button>
          </View>
        </ScreenBack>
        <DialogLoadingIndicator visible={loading} />
      </>
    );
  },
);
