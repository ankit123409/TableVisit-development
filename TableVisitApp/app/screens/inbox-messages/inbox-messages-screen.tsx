import { observer } from 'mobx-react-lite';
import { List, Searchbar } from 'react-native-paper';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
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
  MessageItemCard,
  Screen,
  ScreenBack,
} from '../../components';
import { useEffect, useState, useCallback } from 'react';
import { useStores } from '../../models';
import { RootNavigation } from '../../navigators';
import { useFocusEffect } from '@react-navigation/native';

export const InboxMessagesScreen = observer(function InboxMessagesScreen() {
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing] = useState(false);

  const [word, setWord] = useState('');

  const { bookingChatStore } = useStores();
  const { chats } = bookingChatStore;

  const [bookingChats, setBookingChats] = useState([]);
  //const [notifications] = useState([]);

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

  useFocusEffect(
    useCallback(() => {
      getInbox();
    }, [])
  );

  // useEffect(()=>{

  // },[]);

  const getInbox = async () => {
    try {
      const result = await bookingChatStore.inboxApi();
      if (result.kind === 'unauthorized') RootNavigation.navigate('sign_out');

      setBookingChats(result);
    } catch (e) {
      console.warn(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData().then(() => {});

    /*await TwilioService.getInstance().getChatClient(token.value)
                    .then((client) =>
                        client.getSubscribedChannels().then((paginator) => {
                            channelPaginator.current = paginator;
                            // @ts-ignore
                            const channels = TwilioService.getInstance().parseChannels(channelPaginator.current.items);

                            setMessages(messages);

                            setLoading(false);
                        })
                    ).catch((err) => console.log({message: err.message, type: 'danger'}));*/

    return () => {};
  }, []);

  return (
    <>
      <ScreenBack unsafe={true} backgroundColor={AppColors.BG}>
        {loading ? (
          <DialogLoadingIndicator visible={loading} />
        ) : (
          <>
            {bookingChats?.length > 0 ? (
              <View>
                <List.Section>
                  <Searchbar
                    autoCapitalize={'none'}
                    placeholderTextColor={'#ffffff'}
                    style={styles.search_input}
                    textAlign={'left'}
                    placeholder={'Type here to search..'}
                    iconColor={'#BBBBBB'}
                    onChangeText={setWord}
                    value={word}
                    // onTouchStart={search}
                    autoCorrect={false}
                    inputStyle={{color : "white"}}
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
                  renderItem={({ item, index }) => (
                    <MessageItemCard chat={item} index={index} />
                  )}
                  keyExtractor={(item, index) => index.toString()}
                ></FlatList>
              </View>
            ) : (
              <View style={styles.not_found_content}>
                <Image
                  style={styles.not_found_image}
                  source={require('../shared/no_chat.png')}
                />
                <Text style={styles.not_found_title}>YOUR Inbox is Empty</Text>
                <Text style={styles.not_found_description}>
                  When you have messages you’ll see them here
                </Text>
              </View>
            )}
          </>
        )}
      </ScreenBack>
    </>
  );
});

const styles = StyleSheet.create({
  search_input: {
    borderRadius: scale(5),
    margin: scale(10),
    backgroundColor: '#3A3A3F',
    color : "white"
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

// renderItem={({ item, index }) => (
//   <MessageItemCard chat={item} index={index} />
// )}
