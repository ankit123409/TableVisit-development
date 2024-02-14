import { observer } from 'mobx-react-lite';
import {
  Button,
  Dialog,
  Divider,
  Paragraph,
  Portal,
  Snackbar,
} from 'react-native-paper';
import * as React from 'react';
import {
  AppColors,
  AppStyles,
  moderateScale,
  scale,
  verticalScale,
} from '../../theme';
import { DialogLoadingIndicator, ScreenBack } from '../../components';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useEffect, useState } from 'react';
import {
  load,
  save,
  SELECTED_BOOKING,
  SELECTED_PLACE,
  SELECTED_SERVICE_RATE,
} from '../../utils/storage';
import { useStores } from '../../models';
import { useSelector } from 'react-redux';

export const BottleMenuScreen = observer(function BottleMenuScreen() {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>([]);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [selectedServiceRate, setSelectedServiceRate] = useState<any>({});
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);

  const { serviceStore, tableSpendStore } = useStores();
  const { rates } = serviceStore;

  const [showDialog, setShowDialog] = useState<boolean>(false);
  const hideDialog = () => setShowDialog(false);

  useEffect(() => {

    async function fetchData() {
      try {
        setLoading(true);

        const temp = await load(SELECTED_PLACE);

        if (temp) {
          await serviceStore.getRates(temp.id);
          setData(rates);
        }

        const booking = await load(SELECTED_BOOKING);
        if (booking) setSelectedBooking(booking);
      } catch (e) {
        console.warn(e);
      } finally {
        setLoading(false);
      }
    }

    fetchData().then();
  }, []);

  const request = async (data:any) => {


    try {
      const obj = {
        table_id: selectedBooking.table_id,
        amount: selectedServiceRate.rate,
        tax_amount: selectedServiceRate.tax,
        quantity: 1,
        total_tax_amount: selectedServiceRate.tax,
        total_amount: selectedServiceRate.total_rate,
        service_id: selectedServiceRate.service_id,
        booking_id: selectedBooking.id,
        service_type: 'bottle',
      };
      await tableSpendStore.add(obj);

      await save(SELECTED_SERVICE_RATE, selectedServiceRate);
      // const chat_type = UserTypeEnum.Server;

      // await save(SELECTED_CHAT_DATA, {
      //   code: selectedBooking.confirmation_code + '_' + chat_type,
      //   name:
      //     selectedBooking.confirmation_code +
      //     '_' +
      //     UserTypeEnum[chat_type].replace('_', ' '),
      //   type: chat_type,
      //   booking_id: selectedBooking.id,
      //   title: UserTypeEnum[chat_type].replace('_', ' '),
      // });
    } catch (e) {
      console.warn(e);
    } finally {
      hideDialog();
      // RootNavigation.navigate('chat');
    }
  };

  const showRequest = (item) => {
    // if (selectedBooking) {
    //   setSelectedServiceRate(item);
    //   setShowDialog(true);
    // } else setShowSnackbar(true);
  };

  return (
    <>
      <ScreenBack unsafe={true} backgroundColor={AppColors.BG}>
        <FlatList
          style={{ marginBottom: 25 }}
          showsVerticalScrollIndicator={false}
          data={[...data]}
          keyExtractor={(item) => String(item.id)}
          ItemSeparatorComponent={() => {
            return <Divider style={AppStyles.items_divider} />;
          }}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                onPress={async () => {
                  showRequest(item);
                }}
              >
                <View style={styles.venue_list_container}>
                  <View style={styles.column_wrap}>
                    <View style={styles.row_style}>
                      <Paragraph numberOfLines={1} style={[styles.title_style]}>
                        {item.service_name}
                      </Paragraph>
                      <Paragraph numberOfLines={1} style={[styles.price_style]}>
                        $ {item.total_rate}
                      </Paragraph>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </ScreenBack>
      <Portal>
        {showDialog && (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
            }}
          >
            <Dialog
              style={{ borderRadius: 5, backgroundColor: AppColors.LIGHTGRAY }}
              visible={showDialog}
              onDismiss={hideDialog}
            >
              {/*@ts-ignore*/}
              <Dialog.Title style={AppStyles.dialog_title}>
                REQUEST BY MESSAGE
              </Dialog.Title>
              <Dialog.Content>
                <View style={AppStyles.row_wrap}>
                  <View style={[AppStyles.content_start]}>
                    <Paragraph style={[styles.order_name_style]}>
                      {selectedServiceRate.service_name}
                    </Paragraph>
                  </View>
                  <View style={[AppStyles.content_end]}>
                    <Paragraph style={styles.order_price_style}>
                      $ {selectedServiceRate.total_rate}
                    </Paragraph>
                  </View>
                </View>
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
                  onPress={hideDialog}
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
                  onPress={async () => await request()}
                >
                  Yes
                </Button>
              </Dialog.Actions>
            </Dialog>
          </View>
        )}
      </Portal>
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
          Please reserve your table first..
        </Text>
      </Snackbar>
      <DialogLoadingIndicator visible={loading} />
    </>
  );
});

const styles = StyleSheet.create({
  venue_list_container: {
    marginLeft: scale(12),
    marginRight: scale(12),
    marginBottom: verticalScale(12),
    backgroundColor: '#282A2D',
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(12),
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    borderRadius: scale(5),
  },
  column_wrap: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  venue_list_pic: {
    borderRadius: 5,
    resizeMode: 'cover',
    width: moderateScale(40),
    height: moderateScale(40),
    marginRight: scale(12),
  },
  row_style: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  price_style: {
    color: AppColors.LOGO_COLOR,
    fontSize: moderateScale(13),
    fontFamily: 'Roboto-Bold',
  },
  title_style: {
    color: AppColors.WHITE,
    fontSize: moderateScale(13),
    fontFamily: 'Roboto-Regular',
  },
  order_name_style: {
    color: AppColors.WHITE,
    fontSize: moderateScale(17),
    fontFamily: 'Roboto-Regular',
  },
  order_price_style: {
    color: AppColors.LOGO_COLOR,
    fontSize: moderateScale(14),
    textAlign: 'right',
    fontFamily: 'Roboto-Bold',
  },
});
