import { observer } from 'mobx-react-lite';
import {
  Button,
  Dialog,
  Divider,
  List,
  Paragraph,
  Portal,
  Snackbar,
} from 'react-native-paper';
import {
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  Text,
} from 'react-native';
import * as React from 'react';

import { useState } from 'react';
import {
  AppColors,
  AppStyles,
  moderateScale,
  scale,
  verticalScale,
} from '../../theme';
import { DialogLoadingIndicator, ScreenBack } from '../../components';
import Icon from 'react-native-paper/src/components/Icon';

import { RootNavigation } from '../../navigators';
import { useStores } from '../../models';
import { useFocusEffect } from '@react-navigation/core';
import { USER_DATA, load } from '../../utils/storage';
import TableStaffDetailSheet from './Table_Details_Sheet';

export type visibleType = {
  visible: boolean;
  data: {
    table_id: number | null;
    place_id: number | null;
    booking_id: number | null;
  };
};
export const StaffTableScreen = observer(function StaffTableScreen() {
  const [loading, setLoading] = useState<boolean>(true);

  const { tableStore } = useStores();
  const { tables } = tableStore;
  const { staffBookingStore } = useStores();
  const [isCloseConfirm, setIsCloseConfirm] = useState<{
    visible: false;
    booking_id: null | number;
  }>({
    booking_id: null,
    visible: false,
  });
  const [showResponse, setShowResponse] = useState<boolean>(false);
  const [tableResponse, setTableResponse] = useState('');

  const [isVisible, setIsVisible] = useState<visibleType>({
    data: {
      booking_id: null,
      place_id: null,
      table_id: null,
    },
    visible: false,
  });

  useFocusEffect(
    React.useCallback(() => {
      search().then();

      return () => {};
    }, [])
  );

  const search = async () => {
    try {
      const user = await load(USER_DATA);
      if (user?.place_id) {
        await tableStore.getTables(user?.place_id);
        setLoading(false);
      }
    } catch (e) {
      console.warn(e);
    } finally {
      setLoading(false);
    }
  };

  const emptyComponent = () => {
    return (
      <List.Section>
        <Paragraph style={AppStyles.empty_text_home}>
          We didn't find any results..
        </Paragraph>
      </List.Section>
    );
  };

  const closeTable = async () => {
    await staffBookingStore.closeBooking({
      booking_id: isCloseConfirm.booking_id,
    });
    setTableResponse('Table closed. Thanks.');
    setIsCloseConfirm({
      booking_id: null,
      visible: false,
    });
    search().then();
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <ScreenBack unsafe={true} backgroundColor={AppColors.BG}>
          <View style={AppStyles.header_style}>
            <View />
            <Image
              style={AppStyles.logo_image_style}
              source={require('../shared/table-visit.png')}
            />
            <TouchableOpacity
              onPress={() => RootNavigation.navigate('sign_out')}
            >
              <Icon source={'login'} size={25} color={AppColors.LIGHR_WHITE} />
            </TouchableOpacity>
          </View>
          <FlatList
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
            data={tables}
            keyExtractor={(item) => String(item.id)}
            ItemSeparatorComponent={() => {
              return <Divider style={AppStyles.items_divider} />;
            }}
            renderItem={({ item, index }) => {
              return (
                <List.Item
                  right={(props) => (
                    <List.Icon color={AppColors.WHITE} icon="chevron-right" />
                  )}
                  titleStyle={AppStyles.table_list_title}
                  descriptionStyle={AppStyles.table_list_detail}
                  key={index}
                  title={
                    <View style={styles.table_title_style}>
                      <Paragraph
                        numberOfLines={1}
                        style={styles.table_name_style}
                      >
                        {item.name}{' '}
                      </Paragraph>
                      <Paragraph style={styles.table_guest_style}>
                        {' '}
                        ({`Guest ${item.guests_count}`})
                      </Paragraph>
                    </View>
                  }
                  onPress={async () => {
                    setIsVisible({
                      data: {
                        booking_id: item?.booking?.id,
                        place_id: item?.place_id,
                        table_id: item?.id,
                      },
                      visible: true,
                    });
                  }}
                />
              );
            }}
            ListEmptyComponent={emptyComponent}
          />
        </ScreenBack>
      </SafeAreaView>
      {isVisible.visible && (
        <TableStaffDetailSheet
          isVisible={isVisible}
          setIsVisible={() =>
            setIsVisible({
              data: {
                booking_id: null,
                place_id: null,
                table_id: null,
              },
              visible: false,
            })
          }
          setIsCloseConfirm={setIsCloseConfirm}
        />
      )}
      {isCloseConfirm.visible && (
        <Portal>
           <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
            }}
          >
          <Dialog
            style={{
              borderRadius: scale(10),
              backgroundColor: AppColors.LIGHTGRAY,
            }}
            visible={isCloseConfirm.visible}
            onDismiss={() =>
              setIsCloseConfirm({
                booking_id: null,
                visible: false,
              })
            }
          >
            <Dialog.Title
              style={{
                alignSelf: 'center',
                alignContent: 'center',
                width: moderateScale(47),
              }}
            >
              <View>
                <Icon
                  source={'information-outline'}
                  size={47}
                  color={'#CFCFCF'}
                />
              </View>
            </Dialog.Title>
            <Dialog.Content>
              <Paragraph
                style={{
                  color: AppColors.WHITE,
                  fontFamily: 'Roboto-Bold',
                  fontSize: moderateScale(25),
                  lineHeight: verticalScale(40),
                  textAlign: 'center',
                }}
              >
                Are You Sure?
              </Paragraph>
              <Paragraph
                style={{
                  color: '#B1B1AF',
                  fontFamily: 'Roboto-Regular',
                  fontSize: moderateScale(18),
                  lineHeight: moderateScale(25),
                  textAlign: 'center',
                }}
              >
                Please be sure to close tab on in-house POS system
              </Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                style={[
                  AppStyles.button,
                  {
                    borderRadius: scale(5),
                    backgroundColor: '#16181B',
                    margin: 0,
                  },
                ]}
                contentStyle={{
                  paddingVertical: verticalScale(0),
                  width: scale(70),
                }}
                labelStyle={AppStyles.button_label}
                onPress={() =>
                  setIsCloseConfirm({
                    booking_id: null,
                    visible: false,
                  })
                }
              >
                Cancel
              </Button>
              <Button
                style={[
                  AppStyles.button,
                  {
                    borderRadius: 5,
                    backgroundColor: AppColors.LOGO_COLOR,
                    margin: 0,
                  },
                ]}
                contentStyle={{
                  paddingVertical: verticalScale(0),
                  width: scale(70),
                }}
                labelStyle={AppStyles.button_label}
                onPress={closeTable}
              >
                Yes
              </Button>
            </Dialog.Actions>
          </Dialog>
          </View>
        </Portal>
      )}
      <Snackbar
        wrapperStyle={AppStyles.snackbar_wrapper}
        style={AppStyles.snackbar_content}
        visible={showResponse}
        onDismiss={() => setShowResponse(false)}
        action={{
          label: 'OK',
          onPress: () => {
            RootNavigation.goBack();
          },
        }}
        duration={Snackbar.DURATION_MEDIUM}
      >
        <Text style={{ color: 'black', fontFamily: 'Roboto-Bold' }}>
          {tableResponse}
        </Text>
      </Snackbar>
      <DialogLoadingIndicator visible={loading} />
    </>
  );
});

const styles = StyleSheet.create({
  table_name_style: {
    fontSize: moderateScale(15),
    color: AppColors.WHITE,
    fontFamily: 'Roboto-Bold',
    textAlign: 'center',
    maxWidth: scale(170),
  },
  table_title_style: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  table_guest_style: {
    fontSize: moderateScale(10),
    color: '#B1B1AF',
    fontFamily: 'Roboto-Bold',
    textAlign: 'center',
  },
});
