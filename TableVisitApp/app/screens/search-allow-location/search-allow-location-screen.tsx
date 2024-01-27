import { observer } from "mobx-react-lite";
import {
  List,
  Searchbar,
  Divider,
  useTheme,
  Icon,
  IconButton,
} from "react-native-paper";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import * as React from "react";
import { AppColors, AppStyles } from "../../theme";
import { useContext, useEffect, useState } from "react";
import { RootNavigation } from "../../navigators";
import { useStores } from "../../models";
import { DialogLoadingIndicator, ScreenBack } from "../../components";
import { load, save, USER_LOCATION } from "../../utils/storage";
import { ApplicationContext } from "../../navigator2/main-router";

export const SearchAllowLocationScreen = observer(
  function SearchAllowLocationScreen() {
    const theme = useTheme();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState("");

    const { cityStore, stateStore } = useStores();
    const { cities_top, cities_search } = cityStore;
    const { states } = stateStore;

    const { changeCity } = useContext(ApplicationContext);

    useEffect(() => {
      async function init() {
        try {
          await stateStore.getStates();
          // await cityStore.getCitiesTop();
          // setData(cities_top);
          await cityStore.getCitiesSearch("Atlanta"); // temp set atlanta
          setData(cities_search);
        } catch (e) {
          console.warn(e);
        } finally {
          setLoading(false);
        }
      }

      init().then();
    }, []);

    const loadState = (item: any) => {
      let state = states.find((x) => x.id === item.state_id);

      if (state) return ", " + state.iso_code;

      return null;
    };

    const search = async () => {
      setLoading(true);

      try {
        await cityStore.getCitiesSearch(searchQuery);
        setData(cities_search);
      } catch (e) {
        console.warn(e);
      } finally {
        setLoading(false);
      }
    };

    const setLocation = async (item: any) => {
      setLoading(true);
      let go_back = false;

      try {
        if (await load(USER_LOCATION)) go_back = true;
        console.log("itemm", item);
        await save(USER_LOCATION, item);

        changeCity(item);
      } catch (e) {
        console.warn(e);
      } finally {
        setLoading(false);
        if (go_back) RootNavigation.goBack();
        else RootNavigation.navigate("init");
      }
    };

    return (
      <>
        <ScreenBack
          style={AppStyles.screen_container}
          backgroundColor={AppColors.BG}
        >
          <List.Section>
            <View style={AppStyles.row}>
              <View
                style={[
                  AppStyles.wrapper,
                  { flexDirection: "row", alignItems: "flex-start" },
                ]}
              >
                <IconButton
                  iconColor={AppColors.WHITE}
                  size={30}
                  icon="chevron-left"
                  onPress={() => RootNavigation.goBack()}
                />
                <Text style={AppStyles.search_title}>
                  Choose your city, let’s find{"\n"}venues near you!
                </Text>
                {/*<Text style={AppStyles.search_text}>
                                Choose your city, let’s find venues near you!
                            </Text>*/}
              </View>
            </View>
            <Searchbar
              autoCorrect={false}
              autoCapitalize={"none"}
              placeholderTextColor={AppColors.SEARCH_GRAY}
              style={[
                AppStyles.search_input,
                {
                  backgroundColor: AppColors.LIGHT_BLACK,
                },
              ]}
              inputStyle={{ color: AppColors.WHITE }}
              textAlign={"left"}
              placeholder={"Please enter 3 or more characters.."}
              iconColor={AppColors.LIGHT_GRAY}
              onChangeText={setSearchQuery}
              value={searchQuery}
              onEndEditing={search}
            />
            {/*<View style={AppStyles.row}>
                        <Text style={AppStyles.search_use}>Use my current location</Text>
                    </View>
                    <Divider style={AppStyles.divider}/>*/}
            <Text style={AppStyles.search_small_title}>
              Your VIP experience in...
            </Text>
          </List.Section>
          {/*<List.Section>
                    <TouchableOpacity onPress={() => RootNavigation.navigate("sign_in")}>
                        <Paragraph style={[AppStyles.text_skip]}>
                            Skip
                        </Paragraph>
                    </TouchableOpacity>
                </List.Section>*/}

          <FlatList
            showsVerticalScrollIndicator={false}
            data={[...data]}
            keyExtractor={(item) => String(item.id)}
            ItemSeparatorComponent={() => {
              return <View style={[{ height: 15 }]} />;
            }}
            renderItem={({ item, index }) => {
              return (
                <List.Item
                  right={(props) => (
                    <List.Icon {...props} icon="chevron-right" />
                  )}
                  style={{
                    backgroundColor: AppColors.LIGHT_BLACK,
                    marginHorizontal: 10,
                    borderRadius: 10,
                  }}
                  titleStyle={AppStyles.item_title}
                  key={index}
                  title={item.name + loadState(item)}
                  onPress={async () => {
                    await setLocation(item);
                  }}
                />
              );
            }}
          />
        </ScreenBack>

        <DialogLoadingIndicator visible={loading} />
      </>
    );
  }
);