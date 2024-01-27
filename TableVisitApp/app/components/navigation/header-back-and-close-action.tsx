import {Appbar} from 'react-native-paper';
import {AppColors, AppStyles} from '../../theme';
import React from 'react';

export const HeaderBackAndCloseAction = ({navigation, scene, previous}) => (
  <Appbar.Header style={{backgroundColor: AppColors.BG}}>
    {previous ? (
      <Appbar.BackAction size={20} onPress={() => navigation.goBack()} />
    ) : null}
    <Appbar.Content
      titleStyle={AppStyles.page_title_small}
      title={scene?.descriptor?.options?.title}
    />
    {previous ? (
      <Appbar.Action icon="close" onPress={() => navigation.goBack()} />
    ) : null}
  </Appbar.Header>
);
