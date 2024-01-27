import {observer} from 'mobx-react-lite';
import * as React from 'react';
import {AppColors, AppStyles} from '../../theme';
import {DialogLoadingIndicator, Screen, ScreenBack} from '../../components';
import {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Button, List, Paragraph, TextInput} from 'react-native-paper';
import {RootNavigation} from '../../navigators';

export const FeedbackScreen = observer(function FeedbackScreen() {
  const [loading, setLoading] = useState<boolean>(false);
  const [feedbackText, setFeedbackText] = useState('');

  useEffect(() => {
    setLoading(true);

    async function fetchData() {
      try {
      } catch (e) {
        console.warn(e);
      } finally {
        setLoading(false);
      }
    }

    fetchData().then();

    return () => {};
  }, []);

  const sendFeedback = async () => {
    setLoading(true);
    try {
    } catch (e) {
      console.warn(e);
    } finally {
      setLoading(false);

      RootNavigation.goBack();
    }
  };

  return (
    <>
      <ScreenBack
        unsafe={true}
        style={AppStyles.screen_container}
        backgroundColor={AppColors.BG}>
        <List.Section>
          <View style={AppStyles.row}>
            <View style={AppStyles.wrapper}>
              <Paragraph style={AppStyles.title}>How are we doing?</Paragraph>
              <Paragraph style={AppStyles.text_style}>
                Share your experience with us. What went well? What could have
                gone better?
              </Paragraph>
            </View>
          </View>
        </List.Section>
        <List.Section>
          <View style={[AppStyles.row, {marginVertical: 10}]}>
            <TextInput
              style={AppStyles.input_special}
              underlineColor={AppColors.DIVIDER_GRAY}
              textAlign={'left'}
              autoCapitalize={'none'}
              mode="flat"
              multiline={true}
              placeholder={'Let us know what you think..'}
              label={null}
              value={feedbackText}
              onChangeText={setFeedbackText}
            />
          </View>
        </List.Section>
        <List.Section>
          <Button
            mode="contained"
            dark={true}
            buttonColor={AppColors.LOGO_COLOR}
            style={AppStyles.button}
            contentStyle={AppStyles.button_content}
            labelStyle={AppStyles.button_label}
            onPress={async () => {
              await sendFeedback();
            }}>
            SUBMIT FEEDBACK
          </Button>
        </List.Section>
      </ScreenBack>

      <DialogLoadingIndicator visible={loading} />
    </>
  );
});
