import * as React from 'react';
import { Portal, Dialog } from 'react-native-paper';
import RenderHtml from 'react-native-render-html';
import { Dimensions, ScrollView } from 'react-native';
import { AppColors, AppStyles } from '../../theme';

export const DialogPlaceDetail = ({
  place,
  visible,
  onDismiss,
}: {
  place: any;
  visible: boolean;
  onDismiss: any;
}) => {
  return (
    <Portal>
      <Dialog
        style={{ borderRadius: 12, backgroundColor: AppColors.BG }}
        visible={visible}
        dismissable={true}
        onDismiss={onDismiss}
      >
        {/*@ts-ignore*/}
        <Dialog.Title>{'place.name'}</Dialog.Title>
        <Dialog.ScrollArea
          style={{ maxHeight: 0.6 * Dimensions.get('window').height }}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            {place && place.detail ? (
              <RenderHtml
                contentWidth={Dimensions.get('window').width}
                baseStyle={AppStyles.venue_data_text}
                source={{ html: place.detail.detail }}
              />
            ) : null}
          </ScrollView>
        </Dialog.ScrollArea>
      </Dialog>
    </Portal>
  );
};
