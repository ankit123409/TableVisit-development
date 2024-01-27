import { observer } from 'mobx-react-lite';
import { Button, Paragraph } from 'react-native-paper';
import { Image, View } from 'react-native';
import * as React from 'react';
import {
  AppColors,
  AppStyles,
  moderateScale,
  verticalScale,
} from '../../theme';
import { DialogLoadingIndicator, Screen, ScreenBack } from '../../components';
import { RootNavigation } from '../../navigators';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { useStores } from '../../models';

export const IdentityVerificationScreen = observer(
  function IdentityVerificationScreen() {
    const { userProfileStore } = useStores();

    const [loading, setLoading] = useState(false);

    const pickId = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 0.75,
      });

      if (!result.cancelled) {
        try {
          setLoading(true);

          // @ts-ignore
          let response = await userProfileStore.uploadGovernmentId(result.uri);

          console.log(response);

          if (response.code !== 200) console.log(response.message);
          else RootNavigation.navigate('id_type');
        } catch (e) {
          console.warn(e);
        } finally {
          setLoading(false);
        }
      }
    };

    return (
      <>
        <ScreenBack unsafe={true} backgroundColor={AppColors.BG}>
          <Paragraph
            style={{
              color: 'white',
              fontFamily: 'Roboto-Bold',
              fontSize: moderateScale(18),
              textAlign: 'center',
              marginTop: verticalScale(200),
            }}
          >
            Coming Soon....
          </Paragraph>
          {/* <View style={AppStyles.row}>
            <Paragraph style={AppStyles.verification_title}>
              Let's add your ID
            </Paragraph>
            <Paragraph style={AppStyles.verification_paragraph}>
              We're required by law yo verify your identify before you can spend
              with card. Your information will be encrypted and stored securely.
            </Paragraph>
          </View>
          <View style={AppStyles.row}>
            <Image
              style={AppStyles.verification_img}
              source={require('../shared/personal_information.png')}
            />
          </View>
          <View style={AppStyles.modal_bottom}>
            <Button
              mode="contained"
              dark={true}
              buttonColor={AppColors.LOGO_COLOR}
              onPress={pickId}
              style={AppStyles.button}
              contentStyle={AppStyles.button_content}
              labelStyle={AppStyles.button_label}>
              ADD AN ID
            </Button>
          </View> */}
        </ScreenBack>
        <DialogLoadingIndicator visible={loading} />
      </>
    );
  }
);
