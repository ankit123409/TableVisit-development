import { observer } from 'mobx-react-lite';
import { FlatList } from 'react-native';
import * as React from 'react';
import { AppColors, AppStyles } from '../../theme';
import { useEffect, useState } from 'react';
import {
  DialogLoadingIndicator,
  PlaceItemListCard,
  Screen,
  ScreenBack,
} from '../../components';
import { useStores } from '../../models';
import { load, USER_LOCATION } from '../../utils/storage';
import { List, Paragraph } from 'react-native-paper';

export const FeaturedVenuesScreen = observer(function FeaturedVenuesScreen() {
  const [loading, setLoading] = useState<boolean>(true);
  const { placeStore } = useStores();
  const { featured_by_city, near_by_cities } = placeStore;

  useEffect(() => {
    setLoading(true);

    async function fetchData() {
      try {
        let location = await load(USER_LOCATION);

        if (location) await placeStore.getNearByCities();
        // if (location) await placeStore.getFeaturedByCity(location.id);
      } catch (e) {
        console.warn(e);
      } finally {
        setLoading(false);
      }
    }

    fetchData().then();
  }, []);

  const emptyComponent = () => {
    return (
      <List.Section>
        <Paragraph style={AppStyles.empty_text_home}>
          We didn't find any results..
        </Paragraph>
      </List.Section>
    );
  };

  return (
    <>
      <ScreenBack unsafe={true} backgroundColor={AppColors.BG}>
        <FlatList
          style={AppStyles.flat_container}
          showsVerticalScrollIndicator={false}
          data={near_by_cities.slice()}
          renderItem={({ item, index }) => (
            <PlaceItemListCard
              onRefresh={() => {}}
              place={item}
              index={index}
            />
          )}
          keyExtractor={(item) => String(item.id)}
          ListEmptyComponent={emptyComponent}
        ></FlatList>
      </ScreenBack>

      <DialogLoadingIndicator visible={loading} />
    </>
  );
});
