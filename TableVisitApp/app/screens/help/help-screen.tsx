import { observer } from 'mobx-react-lite';
import { List, Snackbar } from 'react-native-paper';
import * as React from 'react';
import { AppColors, AppStyles } from '../../theme';
import { Screen, ScreenBack } from '../../components';
import { useState } from 'react';
import { Text } from 'react-native';

export const HelpScreen = observer(function HelpScreen() {
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);

  return (
    <>
      <ScreenBack unsafe={true} backgroundColor={AppColors.BG}>
        <List.Section>
          <List.Item
            left={(props) => (
              <List.Icon
                {...props}
                color={AppColors.WHITE}
                icon="note-text-outline"
              />
            )}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            titleStyle={AppStyles.help_title}
            title={'Frequently Asked Questions'}
            description={'Find answers to the most frequently asked questions'}
            descriptionStyle={AppStyles.item_text_white}
            onPress={() => {
              setShowSnackbar(true);
            }}
          />
          <List.Item
            left={(props) => (
              <List.Icon
                {...props}
                color={AppColors.WHITE}
                icon="comment-text-outline"
              />
            )}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            titleStyle={AppStyles.help_title}
            title={'Live chat'}
            description={'Start a conversation, we are here to help'}
            descriptionStyle={AppStyles.item_text_white}
            onPress={() => {
              setShowSnackbar(true);
            }}
          />
          <List.Item
            left={(props) => (
              <List.Icon
                {...props}
                color={AppColors.WHITE}
                icon="phone-outline"
              />
            )}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            titleStyle={AppStyles.help_title}
            title={'Call us'}
            description={'Call us, we are always happy to help with you'}
            descriptionStyle={AppStyles.item_text_white}
            onPress={() => {
              setShowSnackbar(true);
            }}
          />
          <List.Item
            left={(props) => (
              <List.Icon
                {...props}
                color={AppColors.WHITE}
                icon="email-outline"
              />
            )}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            titleStyle={AppStyles.help_title}
            title={'Write us'}
            description={'Write us, we are always happy to help with you'}
            descriptionStyle={AppStyles.item_text_white}
            onPress={() => {
              setShowSnackbar(true);
            }}
          />
        </List.Section>
      </ScreenBack>
      <Snackbar
        wrapperStyle={AppStyles.snackbar_wrapper}
        style={AppStyles.snackbar_content}
        visible={showSnackbar}
        onDismiss={() => setShowSnackbar(false)}
        action={{
          label: 'OK',
          onPress: () => {},
        }}
        duration={Snackbar.DURATION_MEDIUM}
      >
        <Text style={{ color: AppColors.BLACK, fontFamily: 'Roboto-Regular' }}>
          Coming soon..
        </Text>
      </Snackbar>
    </>
  );
});
