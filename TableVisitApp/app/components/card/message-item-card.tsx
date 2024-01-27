import * as React from 'react';
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { AppStyles, moderateScale, scale, verticalScale } from '../../theme';
import { Avatar, Paragraph } from 'react-native-paper';
import { UserTypeEnum } from '../../utils/app-enums';
import { save, SELECTED_CHAT_DATA } from '../../utils/storage';
import { RootNavigation } from '../../navigators';

export const MessageItemCard = ({
  chat,
  index,
}: {
  chat: any;
  index: number;
}) => {
  // let image_storage_url:'http://192.168.0.34/Nicole-Weapplise/public/images/places/';
  // console.log("chat",image_storage_url + chat.image_path);
  const goToChat = async () => {
    console.log('itemm..', chat);
    await save(SELECTED_CHAT_DATA, {
      code: chat.code,
      // name: chat.name,
      type: chat.type,
      booking_id: chat.booking_id,
      title: UserTypeEnum[chat.type].replace('_', ' '),
      name: chat.code + '_' + UserTypeEnum[chat.type].replace('_', ' '),
      to_user: chat?.to_user?.id,
      table_id: chat.table_id,
    });

    RootNavigation.navigate('chat', {
      name: `${chat?.to_user?.name} - ${chat?.table?.table_number}`,
    });
  };

  return (
    <TouchableOpacity
      onPress={async () => {
        await goToChat();
      }}
    >
      <View style={styles.venue_list_container}>
        <Image
          style={styles.venue_list_pic}
          source={{
            uri:
              chat.image_path,
          }}
        />
        <View style={styles.column_wrap}>
          <View style={AppStyles.row_wrap}>
            <Paragraph
              numberOfLines={1}
              style={[AppStyles.staff_booking_title]}
            >
              {chat?.to_user?.name} - {chat?.table?.table_number}
            </Paragraph>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

/*export const MessageItemCard = ({message, index}: {
    message: any;
    index: number;
}) => {
    return (
        <TouchableOpacity
            onPress={async () => {
                RootNavigation.navigate("chat");
            }}
        >
            <View style={AppStyles.venue_list_container}>
                <Paragraph>
                    {message.name}
                </Paragraph>
            </View>
        </TouchableOpacity>
    );
};*/

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
});
