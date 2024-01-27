import { observer } from 'mobx-react-lite';
import { List, Paragraph, Searchbar } from 'react-native-paper';
import {
  FlatList,
  RefreshControl,
  TouchableOpacity,
  StyleSheet,
  View,
  SafeAreaView,
  Image as RNImage,
  Text,
} from 'react-native';
import * as React from 'react';
import {
  AppColors,
  AppStyles,
  moderateScale,
  scale,
  verticalScale,
} from '../../theme';
import { DialogLoadingIndicator, Screen, ScreenBack } from '../../components';
import { useState } from 'react';
import Icon from 'react-native-paper/src/components/Icon';
import { RootNavigation } from '../../navigators';
import { useStores } from '../../models';
import { SELECTED_CHAT_DATA, save } from '../../utils/storage';
import { UserTypeEnum } from '../../utils/app-enums';

export const BookingStaffInbox = observer(function BookingStaffInbox() {
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing] = useState(false);
  const [word] = useState('');

  const { bookingChatStore } = useStores();
  const [bookingChats, setBookingChats] = useState([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await bookingChatStore.inboxApi();
      if (result.kind === 'unauthorized') RootNavigation.navigate('sign_out');

      setBookingChats(result);
    } catch (e) {
      console.warn(e);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData().then(() => {});

    return () => {};
  }, []);

  const goToChat = async (chat) => {
    await save(SELECTED_CHAT_DATA, {
      code: chat.code,
      // name: chat.name,
      type: chat.type,
      booking_id: chat.booking_id,
      title: UserTypeEnum[chat.type].replace('_', ' '),
      name: chat.code + '_' + UserTypeEnum[chat.type].replace('_', ' '),
      to_user: chat.to_user.id,
      table_id: chat.table_id,
    });

    RootNavigation.navigate('chat', {
      name: `${chat?.from_user.name} - ${chat?.table.table_number}`,
    });
  };

  const renderInbox = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => goToChat(item)}>
        <View style={styles.venue_list_container}>
          <RNImage
            style={styles.venue_list_pic}
            source={{
              uri:
                item.image_path,
            }}
          />
          <View style={styles.column_wrap}>
            <View>
              <Paragraph numberOfLines={1} style={AppStyles.venue_card_name}>
                {`${item?.from_user?.name ?? "User"} - ${item?.table?.table_number}`}
              </Paragraph>
            </View>
            {/* {index === 1 && (
              <View
                style={{
                  backgroundColor: AppColors.GREEN_COLOR,
                  paddingHorizontal: scale(7),
                  borderRadius: scale(10),
                  marginRight: scale(10),
                }}
              >
                <Paragraph
                  style={{
                    color: AppColors.WHITE,
                    fontSize: moderateScale(12),
                    fontFamily: 'Roboto-Bold',
                  }}
                >
                  2
                </Paragraph>
              </View>
            )} */}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <ScreenBack unsafe={true} backgroundColor={AppColors.BG}>
          <View style={AppStyles.header_style}>
            <View />
            <RNImage
              style={AppStyles.logo_image_style}
              source={require('../shared/table-visit.png')}
            />
            <TouchableOpacity
              onPress={() => RootNavigation.navigate('sign_out')}
            >
              <Icon source={'login'} size={25} color={AppColors.LIGHR_WHITE} />
            </TouchableOpacity>
          </View>
          {loading ? (
            <DialogLoadingIndicator visible={loading} />
          ) : (
            <>
              {bookingChats?.length > 0 ? (
                <View>
                  <List.Section>
                    <Searchbar
                      autoCapitalize={'none'}
                      placeholderTextColor={'#585858'}
                      style={styles.search_input}
                      textAlign={'left'}
                      placeholder={'Type here to search..'}
                      iconColor={'#BBBBBB'}
                      // onChangeText={setWord}
                      value={word}
                      // onTouchStart={search}
                      autoCorrect={false}
                    />
                  </List.Section>
                  <FlatList
                    refreshControl={
                      <RefreshControl
                        refreshing={refreshing}
                        tintColor={AppColors.LIGHT_GRAY}
                      />
                    }
                    data={bookingChats}
                    style={AppStyles.flat_container}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderInbox}
                    keyExtractor={(item, index) => index.toString()}
                  ></FlatList>
                </View>
              ) : (
                <View style={styles.not_found_content}>
                  <RNImage
                    style={styles.not_found_image}
                    source={require('../shared/no_chat.png')}
                  />
                  <Text style={styles.not_found_title}>
                    YOUR Inbox is Empty
                  </Text>
                  <Text style={styles.not_found_description}>
                    When you have messages you’ll see them here
                  </Text>
                </View>
              )}
            </>
          )}
        </ScreenBack>
      </SafeAreaView>
    </>
  );
});

const styles = StyleSheet.create({
  venue_list_container: {
    marginLeft: scale(12),
    marginRight: scale(12),
    marginBottom: verticalScale(12),
    backgroundColor: '#282A2D',
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(5),
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
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

  booking_amount: {
    color: AppColors.LIGHR_WHITE,
    fontSize: moderateScale(12),
    textAlign: 'right',
  },
  search_input: {
    borderRadius: scale(5),
    margin: scale(10),
    backgroundColor: '#3A3A3F',
  },
  not_found_content: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    gap: verticalScale(5),
    marginHorizontal: scale(50),
  },
  not_found_image: {
    width: scale(100),
    height: verticalScale(77),
  },
  not_found_title: {
    fontSize: moderateScale(25),
    color: '#FDBD59',
    fontFamily: 'Roboto-Bold',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  not_found_description: {
    fontSize: moderateScale(15),
    color: '#B1B1AF',
    fontFamily: 'Roboto-Regular',
    textAlign: 'center',
  },
});
