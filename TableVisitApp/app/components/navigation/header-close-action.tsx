import {Appbar} from 'react-native-paper';
import {AppColors, AppStyles} from '../../theme';
import React from 'react';
import {RootNavigation} from '../../navigators';

export const HeaderCloseAction = ({scene}) => (
  <Appbar.Header style={{backgroundColor: AppColors.BG}}>
    <Appbar.Content
      titleStyle={AppStyles.page_title_small}
      title={scene?.descriptor?.options?.title}
    />
    <Appbar.Action
      icon="close"
      onPress={() => RootNavigation.navigate('bottomNav')}
    />
  </Appbar.Header>
);
