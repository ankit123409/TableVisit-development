import {Appbar} from 'react-native-paper';
import {AppColors, AppStyles} from '../../theme';
import React from 'react';

export const HeaderBackAction = ({navigation, scene, previous}) => (
  <Appbar.Header style={{backgroundColor: AppColors.BARRAS}}>
    {previous ? (
      <Appbar.BackAction size={20} onPress={() => navigation.goBack()} />
    ) : null}
    {console.log('scene?.descriptor?.options?.title', scene)}
    <Appbar.Content
      titleStyle={AppStyles.page_title_small}
      title={scene?.descriptor?.options?.title}
    />
  </Appbar.Header>
);
