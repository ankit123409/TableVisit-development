import {observer} from 'mobx-react-lite';
import {Button, FAB, Paragraph, useTheme} from 'react-native-paper';
import * as React from 'react';
import {AppColors, AppStyles} from '../../theme';
import { ScreenBack} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {View} from 'react-native';

export const MoodFiltersScreen = observer(function MoodFiltersScreen() {
  const {colors} = useTheme();

  const navigation = useNavigation();

  return (
    <ScreenBack style={[AppStyles.wrapper, {backgroundColor: colors.background}]}>
      <Paragraph style={AppStyles.modal_title}>{null}</Paragraph>

      <FAB
        style={AppStyles.fab_top}
        color={AppColors.WHITE}
        icon="close"
        small
        onPress={() => navigation.goBack()}
      />

      <FAB
        style={AppStyles.fab_top_right}
        color={AppColors.WHITE}
        icon={null}
        label={'Clear'}
        uppercase={false}
        small
        onPress={() => navigation.goBack()}
      />

      <Paragraph style={AppStyles.modal_subtitle}>
        What are you in the mood for?
      </Paragraph>

      <View style={AppStyles.modal_bottom}>
        <Button
          mode="contained"
          dark={true}
          buttonColor={AppColors.LOGO_COLOR}
          onPress={() => navigation.goBack()}
          style={AppStyles.button}
          contentStyle={AppStyles.button_content}
          labelStyle={AppStyles.button_label}>
          CONTINUE
        </Button>
      </View>
    </ScreenBack>
  );
});
