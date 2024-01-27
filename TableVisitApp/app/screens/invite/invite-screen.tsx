import { observer } from 'mobx-react-lite';
import { Divider, List, Snackbar } from 'react-native-paper';
import { FlatList, Text } from 'react-native';
import * as React from 'react';
import { AppColors, AppStyles } from '../../theme';
import { Screen, ScreenBack } from '../../components';
import { useState } from 'react';

export const InviteScreen = observer(function InviteScreen() {
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);

  const data = [
    {
      title: 'Invite Friends by Whatsapp',
      link: '',
      icon: 'whatsapp',
    },
    {
      title: 'Invite Friends by SMS',
      link: '',
      icon: 'message-processing-outline',
    },
    {
      title: 'Invite Friends by Email',
      link: '',
      icon: 'email-outline',
    },
    {
      title: 'Invite Friends by...',
      link: '',
      icon: 'share-variant',
    },
  ];

  return (
    <>
      <ScreenBack unsafe={true} backgroundColor={AppColors.BG}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={[...data]}
          keyExtractor={(item) => item.icon}
          ItemSeparatorComponent={() => {
            return <Divider style={AppStyles.items_divider} />;
          }}
          renderItem={({ item, index }) => {
            return (
              <List.Item
                right={(props) => <List.Icon {...props} icon="chevron-right" />}
                titleStyle={AppStyles.item_title}
                key={index}
                title={item.title}
                left={(props) => <List.Icon {...props} icon={item.icon} />}
                onPress={() => {
                  setShowSnackbar(true);
                }}
              />
            );
          }}
        />
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
