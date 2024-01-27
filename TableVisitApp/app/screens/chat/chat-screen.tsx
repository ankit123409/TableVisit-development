import { observer } from 'mobx-react-lite';
import * as React from 'react';
import {
  AppColors,
  AppStyles,
  moderateScale,
  scale,
  verticalScale,
} from '../../theme';
import { DialogLoadingIndicator } from '../../components';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Actions,
  Bubble,
  Composer,
  GiftedChat,
  InputToolbar,
  MessageText,
  Send,
} from 'react-native-gifted-chat';
import { useStores } from '../../models';
import Message from 'react-native-gifted-chat/lib/Message';
import { Avatar, IconButton } from 'react-native-paper';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Time from 'react-native-gifted-chat/lib/Time';
import { TwilioService } from '../../services';
import {
  load,
  remove,
  SELECTED_CHAT_DATA,
  SELECTED_SERVICE_RATE,
} from '../../utils/storage';
import Moment from 'moment';
import { RootNavigation } from '../../navigators';
import { UserTypeEnum } from '../../utils/app-enums';
import { useNavigation } from '@react-navigation/native';
import ActionSheet, {
  SheetManager,
  SheetProps,
  registerSheet,
} from 'react-native-actions-sheet';
import Pusher from 'pusher-js/react-native';
import pusherConfig from '../pusher.json';
import { BroadcastApi } from '../../services/api';

const direct_array = [
  {
    id: 1,
    Message: "That's fine",
  },
  {
    id: 2,
    Message: 'Good ',
  },
  {
    id: 3,
    Message: 'Thank You',
  },
];
// https://github.com/Gapur/react-native-twilio-chat
export const ChatScreen = observer(function ChatScreen(props) {
  const api = new BroadcastApi();
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState([]);
  const [chatUser, setChatUser] = useState({ _id: '', name: '', email: '' });
  const { authStore, chatStore, bookingChatStore, broadcastStore } =
    useStores();
  const [request, setRequest] = useState('');
  const [options, setOptions] = useState(null);
  const [placeholder, setPlaceholder] = useState('');
  const navigation = useNavigation();
  const [chatProfile, setChatProfile] = useState(null);
  const [chatData, setChatData] = useState({});
  const [textMessage, setTextMessage] = useState('');
  const [selected, setSelected] = useState(null);
  const { user } = authStore;
  const { token } = chatStore;

  const chatClientChannel = useRef();
  const chatMessagesPaginator = useRef();
  const scrollViewRef = useRef();

  const serverMessages = {
    'May we have more cups, please?': () => {
      setRequest('May we have more cups, please?');
    },
    'May we have more ice, please?': () => {
      setRequest('May we have more ice, please?');
    },
    'May we order another round of drinks, please?': () => {
      setRequest('May we order another round of drinks, please?');
    },
    Cancel: () => {
      setRequest('');
    },
  };

  const hookahWaitressMessages = [
    // "May we have another coal, please?": () => {
    //   setRequest("May we have another coal, please?")
    // },
    // "May we order another hookah, please?": () => {
    //   setRequest("May we order another hookah, please?")
    // },
    // "May we have more hookah tips, please?": () => {
    //   setRequest("May we have more hookah tips, please?")
    // },
    // Cancel: () => {
    //   setRequest("")
    // },
    {
      label: 'May we have another coal, please?',
      value: 'May we have another coal, please?',
    },
    {
      label: 'May we order another hookah, please?',
      value: 'May we order another hookah, please?',
    },
    {
      label: 'May we have more hookah tips, please?',
      value: 'May we have more hookah tips, please?',
    },
  ];

  const valetParkingMessages = {
    'Park Car, please?': () => {
      setRequest('Park Car, please?');
    },
    'Retrieve Car, please?': () => {
      setRequest('Retrieve Car, please?');
    },
    Cancel: () => {
      setRequest('');
    },
  };

  const djMessages = {
    'Song Request': () => {
      setRequest('Song Request');
    },
    Cancel: () => {
      setRequest(null);
    },
  };

  const emptyMessages = {
    Cancel: () => {
      setRequest(null);
    },
  };

  const getMessage = async () => {
    console.log('react_native===>', chatData);
    const fetchMessage = await broadcastStore.getMessage(chatData);
    console.log('fetchMessage_pusher', fetchMessage);
    if (fetchMessage.kind == 'ok') {
      setMessages(fetchMessage.result);
    }
  };

  useEffect(() => {
    // console.log("user",user.id);
    async function fetchData() {
      var pusher = new Pusher(pusherConfig.PUSHER_APP_KEY, pusherConfig);
      var chatChannel = pusher.subscribe('my-channel');
      console.log('chatChannel', chatChannel);
      chatChannel.bind('my-event', (data) => {
        console.log('DATA Chat Live==>', data.message);
        // setMessages(data)
        // messages.concat(data.message);
        // setMessages([...messages,data.message])
        setMessages((messages) => messages.concat(data.message));
        // messages.push(data.message);
        // {"booking_id": 66, "table_id": 74, "to_user": 186, "type": 4}
        // getMessage()
      });
      try {
        setOptions(emptyMessages);
        // const chat_data="" ;
        load(SELECTED_CHAT_DATA).then(async (chat_data) => {
          console.log('res=-=-=>> ', chat_data);
          console.log('chat_data', chat_data);
          if (chat_data) {
            setChatData(chat_data);

            const fetchMessage = await broadcastStore.getMessage(chat_data);
            if (fetchMessage.kind == 'ok') {
              setMessages(fetchMessage.result);
            }
            const result = await chatStore.getToken();

            if (result === 'unauthorized') {
              RootNavigation.navigate('sign_out');
            }

            // try {
            //   await channel(chat_data).then(async () => {
            //     await init(chat_data)
            //   })
            // } catch (e) {
            //   console.warn(e)
            // }
            // await remove(SELECTED_CHAT_DATA)
          }
        });

        await authStore.getLoggedUser();

        if (user) {
          let chat_user = {
            _id: user.email,
            name: user.name,
            email: user.email,
          };
          setChatUser(chat_user);

          let serviceRate = await load(SELECTED_SERVICE_RATE);

          if (serviceRate) {
            // onSend([
            //   {
            //     user: chat_user,
            //     text: "Request: " + serviceRate.service_name + " $ " + serviceRate.total_rate,
            //     _id: Moment().unix(),
            //   },
            // ])
            await remove(SELECTED_SERVICE_RATE);
          }

          navigation.setOptions({ title: chatData.title });
          setOptions(hookahWaitressMessages);
          if (chatData && user.user_type_id === UserTypeEnum.Customer) {
            setChatProfile(chatData.type);

            // switch (chatData.type) {
            //   case UserTypeEnum.Server:
            //     setOptions(serverMessages)
            //     break

            //   case UserTypeEnum.Hookah_Waitress:
            //     setOptions(hookahWaitressMessages)
            //     break

            //   case UserTypeEnum.Valet_Parking:
            //     setOptions(valetParkingMessages)
            //     break

            //   case UserTypeEnum.DJ:
            //     setOptions(djMessages)
            //     break
            // }
          } else {
            setPlaceholder('Write your message..');
          }
        }
      } catch (e) {
        console.warn(e);
      } finally {
        setLoading(false);
      }
    }

    fetchData().then();

    return () => {
      TwilioService.getInstance().clientShutdown();
    };
  }, []);

  const channel = async (chat_data: any) => {
    await TwilioService.getInstance()
      .getChatClient(token.value)
      .then((client) =>
        client
          .getChannelByUniqueName(chat_data.code)
          .then((channel) =>
            channel.channelState.status !== 'joined' ? channel.join() : channel
          )
          .then()
          .catch(() =>
            client
              .createChannel({
                uniqueName: chat_data.code,
                friendlyName: chat_data.name,
              })
              .then((channel) => {
                channel.join();
              })
          )
      );

    const data = {
      booking_id: chat_data.booking_id,
      chat_type: chat_data.type,
      external_name: chat_data.name,
      external_code: chat_data.code,
    };

    await bookingChatStore.saveBookingChat(data);
  };

  // const init = async (chat_data: any) => {
  //   // const chat_code = booking.confirmation_code + "_" + chat_type;
  //   await TwilioService.getInstance()
  //     .getChatClient(token.value)
  //     .then((client) => client.getChannelByUniqueName(chat_data.code))
  //     .then((channel) => setChannelEvents(channel))
  //     .then((currentChannel) => currentChannel.getMessages())
  //     .then((paginator) => {
  //       chatMessagesPaginator.current = paginator
  //       const newMessages = TwilioService.getInstance().parseMessages(paginator.items)
  //       setMessages(newMessages)
  //     })
  // }

  const insets = useSafeAreaInsets();

  // const setChannelEvents = useCallback((channel) => {
  //   chatClientChannel.current = channel
  //   // @ts-ignore
  //   chatClientChannel.current.on("messageAdded", (message) => {
  //     const newMessage = TwilioService.getInstance().parseMessage(message)
  //     const { giftedId } = message.attributes
  //     if (giftedId) {
  //       setMessages((prevMessages) => {
  //         if (prevMessages.some(({ _id }) => _id === giftedId)) {
  //           return prevMessages.map((m) => (m._id === giftedId ? newMessage : m))
  //         }
  //         return [newMessage, ...prevMessages]
  //       })
  //     }
  //   })
  //   return chatClientChannel.current
  // }, [])

  // const onSend = useCallback((newMessages = []) => {
  //   console.log("OnSEND",chatData,textMessage);
  //   // const attributes = { giftedId: newMessages[0]._id }
  //   // setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages))
  //   // // @ts-ignore
  //   // chatClientChannel.current?.sendMessage(newMessages[0].text, attributes)

  //   // broadcastStore.messageSent(chatData).then()
  //   api.chatSend(chatData,textMessage).then()

  // }, [])

  const onSend = async () => {
    console.log('chatData', chatData);
    chatData.message = textMessage;
    console.log('chatData', chatData);
    const result = await broadcastStore.sendMessage(chatData);
    console.log('sendMessage', result);
    if (result.kind == 'ok') {
      setTextMessage('');
    }
    // api.chatSend(chatData).then()
  };

  const renderActions = (props) => {
    return (
      <Actions
        {...props}
        containerStyle={{
          width: 44,
          height: 44,
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: 4,
          marginRight: 4,
          marginBottom: 0,
        }}
        wrapperStyle={{
          backgroundColor: AppColors.BG,
        }}
        icon={() => (
          <Avatar.Icon
            size={32}
            style={{ backgroundColor: AppColors.CHAT_RIGHT }}
            color={AppColors.LIGHT_GRAY}
            {...props}
            icon="order-bool-descending-variant"
          />
        )}
        /*transform: [{rotate: '-45deg'}*/
        options={options}
        optionTintColor={AppColors.CHAT_RIGHT}
      />
    );
  };
  return (
    <>
      <View style={AppStyles.chat_container}>
        <SafeAreaView />
        <View style={styles.headerStyle}>
          <IconButton
            iconColor={AppColors.WHITE}
            size={30}
            icon="chevron-left"
            onPress={() => navigation.goBack()}
          />
          <Text
            style={[
              AppStyles.title_center_small,
              { color: '#E1D3BE', fontWeight: '500' },
            ]}
          >
            {props?.route?.params?.name}
          </Text>
        </View>
        <ActionSheet id="mysheet">
          <View>
            {hookahWaitressMessages &&
              hookahWaitressMessages?.map((item) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setTextMessage(item.value), SheetManager.hide('mysheet');
                    }}
                  >
                    <View
                      style={{
                        marginVertical: 15,
                        padding: 5,
                        borderBottomColor: 'black',
                        borderBottomWidth: 0.5,
                      }}
                    >
                      <Text style={{ color: 'black' }}>{item.label}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
          </View>
        </ActionSheet>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <View style={{flex : 1}}>
          {/* <View style={{ paddingBottom: verticalScale(200) }}> */}
            <ScrollView
              ref={scrollViewRef}
              onContentSizeChange={() => scrollViewRef.current.scrollToEnd()}
            >
              {messages &&
                messages.map((item) => {
                  return (user.user_type_id == 6 && item.from_user == user.id) ||
                    (user.user_type_id != 6 &&
                      user.user_type_id == item.from_user_type) ? (
                    <View
                      style={{
                        marginVertical: moderateScale(8),
                        marginHorizontal: moderateScale(16),
                        backgroundColor: '#2D2D35',
                        borderRadius: moderateScale(15),
                        maxWidth: '70%',
                        alignSelf: 'flex-end',
                        paddingHorizontal: scale(10),
                        paddingVertical: verticalScale(12),
                        flexDirection: 'row',
                        gap: moderateScale(2),
                        minWidth: '20%',
                      }}
                    >
                      <Text
                        style={{
                          color: 'white',
                          fontSize: moderateScale(14),
                          fontFamily: 'Roboto-Bold',
                        }}
                      >
                        {item.message}
                      </Text>
                      <Text
                        style={{
                          color: '#585858',
                          fontSize: moderateScale(8),
                          alignSelf: 'flex-end',
                          position: 'absolute',
                          right: scale(8),
                          bottom: verticalScale(4),
                          fontFamily: 'Roboto-Regular',
                        }}
                      >
                        {Moment(item.created_at).format('h:mm a')}
                      </Text>
                    </View>
                  ) : (
                    <View
                      style={{
                        marginVertical: moderateScale(8),
                        marginHorizontal: moderateScale(16),
                        backgroundColor: '#2D2D35',
                        borderRadius: moderateScale(15),
                        maxWidth: '70%',
                        alignSelf: 'flex-start',
                        paddingHorizontal: scale(10),
                        paddingVertical: verticalScale(12),
                        flexDirection: 'row',
                        gap: moderateScale(2),
                        minWidth: '20%',
                      }}
                    >
                      <Text
                        style={{
                          color: 'white',
                          fontFamily: 'Roboto-Bold',
                          fontSize: moderateScale(14),
                        }}
                      >
                        {item.message}
                      </Text>
                      <Text
                        style={{
                          color: '#585858',
                          fontSize: moderateScale(8),
                          alignSelf: 'flex-end',
                          position: 'absolute',
                          right: scale(8),
                          bottom: verticalScale(4),
                          fontFamily: 'Roboto-Regular',
                        }}
                      >
                        {Moment(item.created_at).format('h:mm a')}
                      </Text>
                    </View>
                  );
                })}
            </ScrollView>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                gap: scale(5),
                marginTop: verticalScale(5),
                paddingBottom: verticalScale(100)
              }}
            >
              {direct_array.map((message, index) => {
                return (
                  <TouchableOpacity
                    onPress={async () => {
                      chatData.message = message.Message;
                      setSelected(message.id);
                      console.log('called', chatData);

                      const result = await broadcastStore.sendMessage(chatData);
                      if (result.kind == 'ok') {
                        setTextMessage('');
                      }
                    }}
                    key={message.id}
                    style={{
                      backgroundColor: '#FDBD5933',
                      paddingHorizontal: scale(10),
                      paddingVertical: verticalScale(5),
                      borderRadius: scale(30),
                      borderColor:
                        selected === message.id ? '#FDBD59' : '#FDBD5933',
                      borderWidth: 1,
                    }}
                  >
                    <Text
                      style={{
                        color: selected === message.id ? '#FDBD59' : 'white',
                        fontFamily: 'Roboto-Bold',
                      }}
                    >
                      {message.Message}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            {/* </View> */}

          </View>

          <View
            style={{
              height: verticalScale(40),
              borderStyle: 'solid',
              backgroundColor: '#3C3E40',
              position: 'absolute',
              bottom: verticalScale(36),
              right: scale(16),
              left: scale(16),
              borderRadius: moderateScale(22),
            }}
          >
            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
              {/* <View style={{ flex: 0.2 }}>
              <TouchableOpacity onPress={() => SheetManager.show('mysheet')}>
                <Avatar.Icon
                  size={32}
                  style={{ backgroundColor: AppColors.CHAT_RIGHT }}
                  color={AppColors.LIGHT_GRAY}
                  icon="order-bool-descending-variant"
                />
              </TouchableOpacity>
            </View> */}
              <View style={{ flex: 1, width: '100%' }}>
                <TextInput
                  placeholderTextColor={'white'}
                  placeholder={placeholder}
                  onChangeText={(text) => setTextMessage(text)}
                  style={{ color: 'white', marginLeft: scale(10) }}
                  value={textMessage}
                />
              </View>
              <View style={{ flex: 0.3, alignItems: 'flex-end' }}>
                <TouchableOpacity onPress={() => onSend()}>
                  <Avatar.Icon
                    size={40}
                    style={{
                      marginTop: -5,
                      backgroundColor: '#3C3E40',
                      transform: [{ rotate: '-45deg' }],
                    }}
                    color={AppColors.LOGO_COLOR}
                    icon="send"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          </View>
        </KeyboardAvoidingView>
        {/* <GiftedChat
          text={request}
          messages={messages}
          renderAvatarOnTop
          onSend={(messages) => onSend(messages)}
          user={chatUser}
          alwaysShowSend={true}
          showUserAvatar={false}
          onInputTextChanged={(text) => {
            setRequest(text)
          }}
          optionTintColor={AppColors.CHAT_RIGHT}
          placeholder={placeholder}
          renderComposer={(props) => (
            <Composer
              disableComposer={true}
              keyboardAppearance={"dark"}
              {...props}
              textInputStyle={{
                color: AppColors.LIGHT_GRAY,
                fontSize: 14,
                paddingVertical: 5,
                backgroundColor: AppColors.CHAT_RIGHT,
              }}
            />
          )}
          renderInputToolbar={(props) => (
            <InputToolbar
              {...props}
              containerStyle={{
                backgroundColor: AppColors.CHAT_RIGHT,
                borderColor: AppColors.CHAT_LEFT,
              }}
              optionTintColor={AppColors.CHAT_RIGHT}
              primaryStyle={{ alignItems: "center" }}
            />
          )}
          renderSend={(props) => (
            <Send
              {...props}
              disabled={!request}
              containerStyle={{
                width: 32,
                height: 32,
                alignItems: "center",
                justifyContent: "center",
                marginHorizontal: 5,
                backgroundColor: AppColors.CHAT_RIGHT,
                borderRadius: 16,
              }}
            >
              <Avatar.Icon
                size={32}
                style={{
                  marginTop: -5,
                  backgroundColor: AppColors.CHAT_RIGHT,
                  transform: [{ rotate: "-45deg" }],
                }}
                color={AppColors.WHITE}
                {...props}
                icon="send"
              />
            </Send>
          )}
          renderActions={renderActions}
          bottomOffset={insets.bottom - 3}
          renderBubble={(props) => {
            return (
              <Bubble
                {...props}
                wrapperStyle={{
                  left: {
                    backgroundColor: AppColors.CHAT_LEFT,
                    borderBottomEndRadius: 5,
                    borderBottomStartRadius: 0,
                  },
                  right: {
                    backgroundColor: AppColors.CHAT_RIGHT,
                    borderBottomEndRadius: 0,
                    borderBottomStartRadius: 5,
                  },
                }}
              />
            )
          }}
          renderTime={(props) => (
            <Time
              containerStyle={{
                left: {
                  backgroundColor: AppColors.CHAT_LEFT,
                },
                right: {
                  backgroundColor: AppColors.CHAT_RIGHT,
                },
              }}
              {...props}
            />
          )}
          renderMessageText={(props) => (
            <MessageText
              containerStyle={{
                left: {
                  backgroundColor: AppColors.CHAT_LEFT,
                },
                right: {
                  backgroundColor: AppColors.CHAT_RIGHT,
                },
              }}
              textStyle={{
                left: {
                  fontSize: 14,
                  fontFamily: "Roboto",
                  color: AppColors.LIGHT_GRAY,
                },
                right: {
                  fontSize: 14,
                  fontFamily: "Roboto",
                  color: AppColors.LIGHT_GRAY,
                },
              }}
              {...props}
            />
          )}
          renderMessage={(props) => <Message {...props} />}
        /> */}
      </View>
      <DialogLoadingIndicator visible={loading} />
    </>
  );
});

const styles = StyleSheet.create({
  headerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRightStyle: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
