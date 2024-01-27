import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { AppColors, AppStyles } from '../../theme';
import { DialogLoadingIndicator, Screen, ScreenBack } from '../../components';
import { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  Divider,
  List,
  Paragraph,
  Portal,
  Snackbar,
} from 'react-native-paper';
import { FlatList, SafeAreaView, Text, View } from 'react-native';
import Moment from 'moment';
import { load, SELECTED_BOOKING } from '../../utils/storage';
import { useStores } from '../../models';
import { RootNavigation } from '../../navigators';
import { currencyFormat } from '../../utils/app-helper';
import { PaymentMethodEnum } from '../../utils/app-enums';

export const StaffTableSpendsScreen = observer(
  function StaffTableSpendsScreen() {
    const [loading, setLoading] = useState<boolean>(false);
    const [closeDisabled, setCloseDisabled] = useState<boolean>(false);
    const [booking, setBooking] = useState<any>({});
    const [tableSpends, setTableSpends] = useState<any>([]);
    const [showDialog, setShowDialog] = useState<boolean>(false);
    const hideDialog = () => setShowDialog(false);
    const [showResponse, setShowResponse] = useState<boolean>(false);
    const [tableResponse, setTableResponse] = useState('');

    const {
      staffTableSpendStore,
      staffBookingStore,
      paymentStore,
      broadcastStore,
    } = useStores();
    const { table_spends } = staffTableSpendStore;

    // useEffect(() => {
    //   async function fetchData() {
    //     try {
    //       setLoading(true);

    //       const current = await load(SELECTED_BOOKING);

    //       if (current) {
    //         setBooking(current);

    //         const result = await staffTableSpendStore.getStaffTableSpends({
    //           booking_id: current.id,
    //         });
    //         console.log('result..', result);
    //         if (result === 'unauthorized') {
    //           RootNavigation.navigate('sign_out');
    //         }
    //       } else RootNavigation.goBack();

    //       if (table_spends) {
    //         setTableSpends(table_spends);
    //       } else setCloseDisabled(true);
    //     } catch (e) {
    //       console.warn(e);
    //       setCloseDisabled(true);
    //     } finally {
    //       setLoading(false);
    //     }
    //   }

    //   fetchData().then();

    //   return () => {};
    // }, []);

    const close = async (payment_method: PaymentMethodEnum) => {
      hideDialog();

      setLoading(true);

      try {
        if (payment_method === PaymentMethodEnum.Cash) {
          const payment = {
            booking_id: booking.id,
            amount: booking.amount_to_pay,
            payment_method: payment_method,
          };

          await paymentStore.add(payment);

          await closeTable();
        } else {
          if (booking.paid) await closeTable();
          else {
            await broadcastStore.paymentRequest(booking.id);
            setTableResponse('Please ask the Client to pay pending amount.');
          }
        }
      } catch (e) {
        console.log(e);
        setTableResponse('An error occurred. Please try again.');
      } finally {
        setLoading(false);
        setShowResponse(true);
      }
    };

    const closeTable = async () => {
      await staffBookingStore.closeBooking({ booking_id: booking.id });
      setTableResponse('Table closed. Thanks.');
      setCloseDisabled(true);
    };

    return (
      <>
        <ScreenBack
          unsafe={true}
          preset={'scroll'}
          style={AppStyles.screen_container}
          backgroundColor={AppColors.BG}
        >
          <Paragraph style={AppStyles.staff_page_title}>Details</Paragraph>

          <View style={[AppStyles.booking_container, { marginTop: 15 }]}>
            <View style={AppStyles.row_wrap}>
              <View style={AppStyles.content_start}>
                <Paragraph
                  numberOfLines={1}
                  style={AppStyles.booking_item_title}
                >
                  Customer
                </Paragraph>
              </View>
              <View style={AppStyles.content_end}>
                <Paragraph
                  numberOfLines={1}
                  style={AppStyles.booking_item_value}
                >
                  {booking.customer_name} {booking.customer_last_name}
                </Paragraph>
              </View>
            </View>
            <Divider style={AppStyles.booking_data_divider} />
            <View style={AppStyles.row_wrap}>
              <View style={AppStyles.content_start}>
                <Paragraph
                  numberOfLines={1}
                  style={AppStyles.booking_item_title}
                >
                  Table
                </Paragraph>
              </View>
              <View style={AppStyles.content_end}>
                <Paragraph
                  numberOfLines={1}
                  style={AppStyles.booking_item_value}
                >
                  {booking.table ? booking.table.table_number : null}
                </Paragraph>
              </View>
            </View>
            <Divider style={AppStyles.booking_data_divider} />
            <View style={AppStyles.row_wrap}>
              <View style={AppStyles.content_start}>
                <Paragraph
                  numberOfLines={1}
                  style={AppStyles.booking_item_title}
                >
                  Confirmation code
                </Paragraph>
              </View>
              <View style={AppStyles.content_end}>
                <Paragraph
                  numberOfLines={1}
                  style={AppStyles.booking_item_value}
                >
                  {booking.confirmation_code}
                </Paragraph>
              </View>
            </View>
            <Divider style={AppStyles.booking_data_divider} />
            <View style={AppStyles.row_wrap}>
              <View style={AppStyles.content_start}>
                <Paragraph
                  numberOfLines={1}
                  style={AppStyles.booking_item_title}
                >
                  Date
                </Paragraph>
              </View>
              <View style={AppStyles.content_end}>
                <Paragraph
                  numberOfLines={1}
                  style={AppStyles.booking_item_value}
                >
                  {Moment(booking.book_date).format('MM-DD-YYYY')}
                </Paragraph>
              </View>
            </View>
            <Divider style={AppStyles.booking_data_divider} />
            <View style={AppStyles.row_wrap}>
              <View style={AppStyles.content_start}>
                <Paragraph style={AppStyles.table_detail_row_medium}>
                  Amount
                </Paragraph>
              </View>
              <View style={AppStyles.content_end}>
                <Paragraph style={AppStyles.table_detail_row_medium}>
                  {booking.amount ? currencyFormat(booking.amount) : 0}
                </Paragraph>
              </View>
            </View>
            <View style={AppStyles.row_wrap}>
              <View style={AppStyles.content_start}>
                <Paragraph style={AppStyles.table_detail_row_medium}>
                  Taxes & fees
                </Paragraph>
              </View>
              <View style={AppStyles.content_end}>
                <Paragraph style={AppStyles.table_detail_row_medium}>
                  {booking.tax_amount ? currencyFormat(booking.tax_amount) : 0}
                </Paragraph>
              </View>
            </View>

            <View style={AppStyles.row_wrap}>
              <View style={AppStyles.content_start}>
                <Paragraph style={AppStyles.table_detail_row_medium}>
                  Gratuity
                </Paragraph>
              </View>
              <View style={AppStyles.content_end}>
                <Paragraph style={AppStyles.table_detail_row_medium}>
                  {booking.gratuity_amount
                    ? currencyFormat(booking.gratuity_amount)
                    : 0}
                </Paragraph>
              </View>
            </View>
            <Divider style={AppStyles.booking_data_divider} />

            <View style={AppStyles.row_wrap}>
              <View style={AppStyles.content_start}>
                <Paragraph style={AppStyles.booking_item_title}>
                  Booking total
                </Paragraph>
              </View>
              <View style={AppStyles.content_end}>
                <Paragraph style={AppStyles.table_detail_row_total}>
                  {booking.total_amount
                    ? currencyFormat(booking.total_amount)
                    : 0}
                </Paragraph>
              </View>
            </View>

            <Divider style={AppStyles.booking_data_divider} />

            <View style={AppStyles.row_wrap}>
              <View style={AppStyles.content_start}>
                <Paragraph style={AppStyles.table_detail_row_medium}>
                  Table spends
                </Paragraph>
              </View>
              <View style={AppStyles.content_end}>
                <Paragraph style={AppStyles.table_detail_row_medium}>
                  {booking.spent_amount
                    ? currencyFormat(booking.spent_amount)
                    : 0}
                </Paragraph>
              </View>
            </View>

            <View style={AppStyles.row_wrap}>
              <View style={AppStyles.content_start}>
                <Paragraph style={AppStyles.table_detail_row_medium}>
                  Gratuity
                </Paragraph>
              </View>
              <View style={AppStyles.content_end}>
                <Paragraph style={AppStyles.table_detail_row_medium}>
                  {booking.spent_gratuity
                    ? currencyFormat(booking.spent_gratuity)
                    : 0}
                </Paragraph>
              </View>
            </View>

            <Divider style={AppStyles.booking_data_divider} />

            <View style={AppStyles.row_wrap}>
              <View style={AppStyles.content_start}>
                <Paragraph style={AppStyles.booking_item_title}>
                  Amount to pay
                </Paragraph>
              </View>
              <View style={AppStyles.content_end}>
                <Paragraph style={AppStyles.table_detail_row_total}>
                  {booking.amount_to_pay
                    ? currencyFormat(booking.amount_to_pay)
                    : 0}
                </Paragraph>
              </View>
            </View>
          </View>
          <Paragraph style={AppStyles.staff_page_title}>Table spends</Paragraph>

          <FlatList
            scrollEnabled={false}
            style={{ marginBottom: 25 }}
            showsVerticalScrollIndicator={false}
            data={[...tableSpends]}
            keyExtractor={(item) => String(item.id)}
            ItemSeparatorComponent={() => {
              return <Divider style={AppStyles.items_divider} />;
            }}
            renderItem={({ item, index }) => {
              return (
                <List.Item
                  right={() => (
                    <Paragraph style={AppStyles.service_rate_title}>
                      $ {item.total_amount}
                    </Paragraph>
                  )}
                  titleStyle={AppStyles.item_title}
                  key={index}
                  title={item.service_name}
                />
              );
            }}
          />
        </ScreenBack>
        <SafeAreaView style={{ backgroundColor: AppColors.BG }}>
          <Button
            mode="contained"
            disabled={closeDisabled}
            dark={true}
            buttonColor={AppColors.LOGO_COLOR}
            onPress={async () => {
              if (!booking.paid) setShowDialog(true);
              else await closeTable();
            }}
            style={AppStyles.button}
            contentStyle={AppStyles.button_content}
            labelStyle={AppStyles.button_label}
          >
            CLOSE TABLE
          </Button>
        </SafeAreaView>
        <Portal>
          <Dialog
            style={{ borderRadius: 5, backgroundColor: AppColors.BG }}
            visible={showDialog}
            onDismiss={hideDialog}
          >
            {/*@ts-ignore*/}
            <Dialog.Title style={AppStyles.dialog_title}>
              Please select the payment method
            </Dialog.Title>
            <Dialog.Content>
              <View style={AppStyles.row_wrap}>
                <View style={AppStyles.row_wrap}>
                  <Paragraph style={[AppStyles.text_16]}>
                    Amount to pay:{' '}
                    {booking.amount_to_pay
                      ? currencyFormat(booking.amount_to_pay)
                      : 0}
                  </Paragraph>
                </View>
              </View>
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                style={[AppStyles.button, { borderRadius: 5 }]}
                contentStyle={AppStyles.button_content}
                labelStyle={AppStyles.button_label}
                onPress={async () => {
                  await close(PaymentMethodEnum.Cash);
                }}
              >
                CASH
              </Button>
              <Button
                style={[AppStyles.button, { borderRadius: 5 }]}
                contentStyle={AppStyles.button_content}
                labelStyle={AppStyles.button_label}
                onPress={async () => {
                  await close(PaymentMethodEnum.CreditCard);
                }}
              >
                CREDIT CARD
              </Button>
            </Dialog.Actions>
          </Dialog>
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
        </Portal>
        <DialogLoadingIndicator visible={loading} />
      </>
    );
  }
);
