import { observer } from 'mobx-react-lite';
import { Button, Divider, List, Paragraph, Snackbar } from 'react-native-paper';
import * as React from 'react';
import { AppColors, AppStyles } from '../../theme';
import { DialogLoadingIndicator, Screen, ScreenBack } from '../../components';
import { FlatList, SafeAreaView, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { load, SELECTED_BOOKING, SELECTED_PLACE } from '../../utils/storage';
import { useStores } from '../../models';
import { RootNavigation } from '../../navigators';

export const BookBottlesScreen = observer(function BookBottlesScreen() {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>([]);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [showResponse, setShowResponse] = useState<boolean>(false);

  const { serviceStore, tableSpendStore } = useStores();
  const { rates } = serviceStore;

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const temp = await load(SELECTED_PLACE);
        console.log('temo..', temp?.id);
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

  const setSelected = (id: string) => {
    const news = data.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          selected: !item.selected,
          icon: item.selected ? 'radiobox-blank' : 'radiobox-marked',
        };
      } else return item;
    });

    setData(news);
  };

  const add = () => {
    try {
      setLoading(true);

      const selected = data.filter((x) => x.selected === true);

      selected.map(async (item) => {
        const obj = {
          table_id: selectedBooking.table_id,
          amount: item.rate,
          tax_amount: item.tax,
          quantity: 1,
          total_tax_amount: item.tax,
          total_amount: item.total_rate,
          service_id: item.service_id,
          booking_id: selectedBooking.id,
        };

        await tableSpendStore.add(obj);
      });

      setShowResponse(true);
    } catch (e) {
      console.warn(e);
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <ScreenBack unsafe={true} >
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
              <List.Item
                right={() => (
                  <Paragraph style={AppStyles.service_rate_title}>
                    $ {item.total_rate}
                  </Paragraph>
                )}
                titleStyle={AppStyles.item_title}
                key={index}
                title={item.service_name}
                left={(props) => (
                  <List.Icon
                    {...props}
                    icon={item.icon ? item.icon : 'radiobox-blank'}
                  />
                )}
                onPress={async () => {
                  setSelected(item.id);
                }}
              />
            );
          }}
        />
      </ScreenBack>
      <DialogLoadingIndicator visible={loading} />
      {selectedBooking?.table_id &&
      <SafeAreaView style={{ backgroundColor: AppColors.BG }}>
        <Button
          mode="contained"
          dark={true}
          buttonColor={AppColors.LOGO_COLOR}
          onPress={async () => {
            await add();
          }}
          style={AppStyles.button_safe_nm}
          contentStyle={AppStyles.button_content}
          labelStyle={AppStyles.button_label}
        >
          ADD TO BOOKING
        </Button>
      </SafeAreaView>
      }
      <Snackbar
        wrapperStyle={AppStyles.snackbar_wrapper}
        style={AppStyles.snackbar_content}
        visible={showResponse}
        onDismiss={() => setShowResponse(false)}
        action={{
          label: 'OK',
          onPress: () => {
            RootNavigation.navigate('bottomNav');
          },
        }}
        duration={Snackbar.DURATION_MEDIUM}
      >
        <Text style={{ color: AppColors.BLACK, fontFamily: 'Roboto-Regular' }}>
          Your request has been sent. Thanks!
        </Text>
      </Snackbar>
    </>
  );
});
