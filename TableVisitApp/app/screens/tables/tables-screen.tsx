import { observer } from 'mobx-react-lite';
import * as React from 'react';
import {
  AppColors,
  AppStyles,
  moderateScale,
  scale,
  verticalScale,
} from '../../theme';
import {
  DialogLoadingIndicator,
  PlaceDetailCard,
  ScreenBack,
} from '../../components';
import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  load,
  save,
  SELECTED_PLACE,
  SELECTED_TABLE,
} from '../../utils/storage';
import { loadSelectedDate } from '../../utils/app-helper';
import { Divider, List, Paragraph } from 'react-native-paper';
import { OptionsHeader } from '../../components/place/options-header';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useStores } from '../../models';
import { RootNavigation } from '../../navigators';
import { PolicyTypeEnum } from '../../utils/app-enums';
import Moment from 'moment';
import Icon from 'react-native-paper/src/components/Icon';

export const TablesScreen = observer(function TablesScreen(props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [date, setDate] = useState(null);
  const [place, setPlace] = useState<any>({});
  const [data, setData] = useState<any>([]);
  const { tableStore, policyStore } = useStores();
  const { tables } = tableStore;
  const { policy } = policyStore;

  useFocusEffect(
    useCallback(() => {
      let date;

      const fetchData = async () => {
        setLoading(true);

        try {
          date = await loadSelectedDate();
          let temp_place = await load(SELECTED_PLACE);

          if (temp_place) {
            setPlace(temp_place);
            const result = await tableStore.getTablesWithDate(
              temp_place.id,
              date
            );

            if (result === 'unauthorized') {
              RootNavigation.navigate('sign_out');
            }

            await policyStore.getPolicy(
              temp_place.id,
              PolicyTypeEnum.Reservation
            );
          }
        } catch (e) {
          console.warn(e);
        } finally {
          setLoading(false);
        }
      };

      fetchData().then(async () => {
        if (date) {
          date = Moment(date).format('MM-DD-YYYY');
          setDate(date);
        }

        setData(tables);
      });
    }, [])
  );

  const headerComponent = () => {
    return (
      <>
        <PlaceDetailCard date={date} place={place} />

        <View
          style={{
            marginTop: verticalScale(15),
            marginHorizontal: scale(15),
          }}
        >
          <OptionsHeader />
        </View>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('reservation_policy')}
          style={{
            marginTop: verticalScale(15),
            marginHorizontal: scale(15),
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Paragraph style={styles.reservation_policy}>
            Reservation policy
          </Paragraph>
          <Icon size={30} color={'#E1D3BE'} source="chevron-right" />
        </TouchableOpacity>
        <View
          style={{
            marginTop: verticalScale(20),
            marginHorizontal: scale(5),
          }}
        >
          <Paragraph style={AppStyles.detail_card_main}>
            Choose the table of your preference
          </Paragraph>
        </View>
      </>
    );
  };

  const emptyComponent = () => {
    return (
      <Paragraph style={AppStyles.empty_text}>
        We didn't find available tables for the selected date
      </Paragraph>
    );
  };

  return (
    <>
      <ScreenBack preset={'fixed'} unsafe={true} backgroundColor={AppColors.BG}>
        <FlatList
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          data={[...data]}
          keyExtractor={(item) => String(item.id)}
          ItemSeparatorComponent={() => {
            return <Divider style={styles.items_divider} />;
          }}
          renderItem={({ item, index }) => {
            return (
              <List.Item
                right={(props) => (
                  <Icon color={'#E1D3BE'} size={30} source="chevron-right" />
                )}
                style={{ marginHorizontal: scale(16) }}
                key={index}
                title={
                  <View style={styles.table_item_content}>
                    <Text style={styles.table_content_name, { color: item?.is_booked ? "gray" : "white" }}>{item?.name}</Text>
                    <Text style={styles.table_content_guest, { color: item?.is_booked ? "gray" : "white" }}>
                      ( Guest {item?.guests_count} )
                    </Text>
                  </View>
                }
                onPress={async () => {
                  if (!item?.is_booked) {
                    await save(SELECTED_TABLE, item);
                    RootNavigation.navigate('confirm');
                  }
                }}
              />
            );
          }}
          ListEmptyComponent={emptyComponent}
          ListHeaderComponent={headerComponent}
        />
      </ScreenBack>
      <DialogLoadingIndicator visible={loading} />
    </>
  );
});

const styles = StyleSheet.create({
  reservation_policy: {
    color: '#E1D3BE',
    fontFamily: 'Roboto-Bold',
    fontSize: moderateScale(18),
  },
  table_item_content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
  },
  table_content_name: {
    color: '#E1D3BE',
    fontSize: moderateScale(15),
    fontFamily: 'Roboto-Bold',
  },
  table_content_guest: {
    color: '#B1B1AF',
    fontSize: moderateScale(10),
    fontFamily: 'Roboto-Regular',
  },
  items_divider: {
    marginHorizontal: scale(16),
    backgroundColor: '#3A3A3F',
    height: verticalScale(1),
  },
});
