import * as React from 'react';
import {Platform, View} from 'react-native';
import {Paragraph, Portal, Dialog, ActivityIndicator} from 'react-native-paper';
import {AppColors, AppStyles} from "../../theme";

export const isIOS = Platform.OS === 'ios';

export const DialogLoadingIndicator = ({visible}: {
    visible: boolean;
}) => (
    <Portal>
        <Dialog style={{borderRadius: 12}} visible={visible} dismissable={false}>
            <Dialog.Content>
                <View style={AppStyles.loading_view}>
                    <ActivityIndicator
                        color={AppColors.PRIMARY}
                        size={32}
                        /*size={isIOS ? 'large' : 48}*/
                        style={{marginRight: 16}}
                    />
                    <Paragraph style={AppStyles.loading_paragraph}>Wait a moment please..</Paragraph>
                </View>
            </Dialog.Content>
        </Dialog>
    </Portal>
);
