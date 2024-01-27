import { observer } from 'mobx-react-lite';
import { List, Paragraph, Searchbar } from 'react-native-paper';
import { FlatList, Image } from 'react-native';
import * as React from 'react';
import { AppColors, AppStyles, moderateScale, scale } from '../../theme';
import {
  DialogLoadingIndicator,
  PlaceItemListCard,
  ScreenBack,
} from '../../components';
import { useContext, useEffect, useState } from 'react';
import { useStores } from '../../models';
import { ApplicationContext } from '../../navigator2/main-router';
import { BottomNavigationStackContext } from '../../navigator2/bottomTabNavigator';
import { View } from 'react-native';

export const SearchScreen = observer(function SearchScreen(props: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const [word, setWord] = useState('');
  const { placeStore } = useStores();
  const { search_places } = placeStore;

  const [data, setData] = useState([]);

  const { loadCity } = useContext(ApplicationContext);

  const { params } = useContext(BottomNavigationStackContext);

  useEffect(() => {
    if (params && params.index === 1) {
      async function fetchData() {
        try {
          setWord('');
          await search(word);
        } catch (e) {
          console.warn(e);
        } finally {
        }
      }

      fetchData().then();
    }
  }, [loadCity().id]);

  const search = async (text: string) => {
    setLoading(true);

    try {
      await placeStore.getSearchPlaces(text, loadCity().id);

      if (search_places.length === 0) setData([]);
      else setData(search_places.slice());
    } catch (e) {
      console.warn(e);
    } finally {
      setLoading(false);
    }
  };

  const emptyComponent = () => {
    return (
      <List.Section>
        <View style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: moderateScale(80) }}>
          <Image
            style={{ width: moderateScale(108), height: moderateScale(108), resizeMode: 'contain' }}
            source={require('../shared/Illustration.png')}
          />
          <Paragraph style={{ color: "#FDBD59", fontWeight: "600", fontSize: moderateScale(30), lineHeight: moderateScale(30) }}>
            NO RESULTS
          </Paragraph>
          <Paragraph style={{ color: "#B1B1AF", paddingHorizontal: scale(10), textAlign : "center", marginTop: moderateScale(5), fontSize: moderateScale(17), lineHeight: moderateScale(20) }}>
            Sorry, there are no results for this search. Please try another phrase
          </Paragraph>
        </View>
      </List.Section>
    );
  };

  return (
    <>
      <ScreenBack
        unsafe={true}
        style={AppStyles.screen_container}
        backgroundColor={AppColors.BG}
      >
        <List.Section>
          <Searchbar
            autoCapitalize={'none'}
            placeholderTextColor={AppColors.SEARCH_GRAY}
            style={AppStyles.search_input}
            textAlign={'left'}
            placeholder={'Please enter 3 or more characters..'}
            iconColor={AppColors.LOGO_COLOR}
            onChangeText={async (text) => {
              setWord(text);
              await search(text);
            }}
            value={word}
            onEndEditing={async () => {
              await search(word);
            }}
            autoCorrect={false}
          />
        </List.Section>
        <FlatList
          style={AppStyles.flat_container}
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={({ item, index }) => (
            <PlaceItemListCard
              onRefresh={() => { }}
              place={item}
              index={index}
            />
          )}
          keyExtractor={(item) => item.name}
          ListEmptyComponent={emptyComponent}
        ></FlatList>
      </ScreenBack>
      <DialogLoadingIndicator visible={loading} />
    </>
  );
});
