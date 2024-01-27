import {observer} from 'mobx-react-lite';
import {FlatList} from 'react-native';
import * as React from 'react';
import {AppColors, AppStyles} from '../../theme';
import {useEffect, useState} from 'react';
import {
  DialogLoadingIndicator,
  PlaceItemListCard,
  ScreenBack,
} from '../../components';
import {useStores} from '../../models';
import {List, Paragraph} from 'react-native-paper';

export const MyFavoritesScreen = observer(function MyFavoritesScreen() {
  const [loading, setLoading] = useState<boolean>(true);
  const {favoriteStore} = useStores();
  const {favorites} = favoriteStore;

  // const [favoritePlaces, setFavoritePlaces] = useState([]);

  async function fetchData() {
    setLoading(true);

    try {
      await favoriteStore.getFavorites();
    } catch (e) {
      console.warn(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData().then();
  }, []);

  const emptyComponent = () => {
    return (
      <List.Section>
        <Paragraph style={AppStyles.empty_text_home}>
          You don't have any favourites..
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
          data={favorites.slice()}
          renderItem={({item, index}) => (
            <PlaceItemListCard
              onRefresh={async () => {
                await fetchData();
              }}
              favorite_list={true}
              place={item}
              index={index}
            />
          )}
          keyExtractor={item => item.name}
          ListEmptyComponent={emptyComponent}></FlatList>
      </ScreenBack>

      <DialogLoadingIndicator visible={loading} />
    </>
  );
});
