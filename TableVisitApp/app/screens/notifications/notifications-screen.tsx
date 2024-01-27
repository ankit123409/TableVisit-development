import * as React from 'react';
import {observer} from 'mobx-react-lite';
import {Divider, List, Paragraph, Switch} from 'react-native-paper';
import {View} from 'react-native';
import {AppColors, AppStyles} from '../../theme';
import {DialogLoadingIndicator, ScreenBack} from '../../components';
import {useEffect, useState} from 'react';
import {useStores} from '../../models';
import {UserSettingTypeEnum} from '../../utils/app-enums';

export const NotificationsScreen = observer(function NotificationsScreen() {
  const [messagesByEmailOn, setMessagesByEmailOn] = useState(false);
  const [messagesBySmsOn, setMessagesBySmsOn] = useState(false);
  const [remindersByEmailOn, setRemindersByEmailOn] = useState(false);
  const [remindersBySmsOn, setRemindersBySmsOn] = useState(false);

  const {userSettingStore} = useStores();
  const {user_settings} = userSettingStore;

  const [loading, setLoading] = useState<boolean>(false);

  const onToggleMessagesEmail = async () => {
    setMessagesByEmailOn(!messagesByEmailOn);
    await userSettingStore.saveUserSetting({
      setting_type: UserSettingTypeEnum.MessagesByEmail,
      active: !messagesByEmailOn,
    });
  };
  const onToggleMessagesSms = async () => {
    setMessagesBySmsOn(!messagesBySmsOn);
    await userSettingStore.saveUserSetting({
      setting_type: UserSettingTypeEnum.MessagesBySms,
      active: !messagesBySmsOn,
    });
  };
  const onToggleRemindersEmail = async () => {
    setRemindersByEmailOn(!remindersByEmailOn);
    await userSettingStore.saveUserSetting({
      setting_type: UserSettingTypeEnum.RemindersByEmail,
      active: !remindersByEmailOn,
    });
  };
  const onToggleRemindersSms = async () => {
    setRemindersBySmsOn(!remindersBySmsOn);
    await userSettingStore.saveUserSetting({
      setting_type: UserSettingTypeEnum.RemindersBySms,
      active: !remindersBySmsOn,
    });
  };

  useEffect(() => {
    setLoading(true);

    async function fetchData() {
      try {
        await userSettingStore.getUserSettings();

        if (user_settings) {
          const messagesByEmail = user_settings.filter(
            x => x.setting_type === UserSettingTypeEnum.MessagesByEmail,
          )[0];
          const messagesBySms = user_settings.filter(
            x => x.setting_type === UserSettingTypeEnum.MessagesBySms,
          )[0];

          const remindersByEmail = user_settings.filter(
            x => x.setting_type === UserSettingTypeEnum.RemindersByEmail,
          )[0];
          const remindersBySms = user_settings.filter(
            x => x.setting_type === UserSettingTypeEnum.RemindersBySms,
          )[0];

          setMessagesByEmailOn(
            !!(messagesByEmail && messagesByEmail.active === 1),
          );
          setMessagesBySmsOn(!!(messagesBySms && messagesBySms.active === 1));

          setRemindersByEmailOn(
            !!(remindersByEmail && remindersByEmail.active === 1),
          );
          setRemindersBySmsOn(
            !!(remindersBySms && remindersBySms.active === 1),
          );
        }
      } catch (e) {
        console.warn(e);
      } finally {
        setLoading(false);
      }
    }

    fetchData().then();

    return () => {};
  }, []);

  return (
    <>
      <ScreenBack
        unsafe={true}
        style={AppStyles.screen_container}
        backgroundColor={AppColors.BG}>
        <List.Section>
          <View style={AppStyles.row}>
            <View style={AppStyles.wrapper}>
              <Paragraph style={AppStyles.title}>Messages</Paragraph>
              <Paragraph style={AppStyles.text_style}>
                Receive messages from agent, server and valet parking, including
                booking request.
              </Paragraph>
            </View>
          </View>
        </List.Section>
        <List.Section>
          <View style={AppStyles.row}>
            <View style={AppStyles.content_start}>
              <Paragraph style={AppStyles.text_notifications}>Email</Paragraph>
            </View>
            <View style={AppStyles.content_end}>
              <Switch
                style={AppStyles.switch}
                color={AppColors.COOL_GREEN}
                value={messagesByEmailOn}
                onValueChange={onToggleMessagesEmail}
              />
            </View>
          </View>
        </List.Section>
        <Divider style={AppStyles.divider} />
        <List.Section>
          <View style={AppStyles.row}>
            <View style={AppStyles.content_start}>
              <Paragraph style={AppStyles.text_notifications}>
                Text messages
              </Paragraph>
            </View>
            <View style={AppStyles.content_end}>
              <Switch
                style={AppStyles.switch_large}
                color={AppColors.COOL_GREEN}
                value={messagesBySmsOn}
                onValueChange={onToggleMessagesSms}
              />
            </View>
          </View>
        </List.Section>
        <Divider style={AppStyles.divider} />
        <List.Section>
          <View style={AppStyles.row}>
            <View style={AppStyles.wrapper}>
              <Paragraph style={AppStyles.title}>Reminders</Paragraph>
              <Paragraph style={AppStyles.text_style}>
                Receive booking reminder, request to write a review, pricing
                notices, and reminders related to your activities on Table
                Visit.
              </Paragraph>
            </View>
          </View>
        </List.Section>
        <List.Section>
          <View style={AppStyles.row}>
            <View style={AppStyles.content_start}>
              <Paragraph style={AppStyles.text_notifications}>Email</Paragraph>
            </View>
            <View style={AppStyles.content_end}>
              <Switch
                style={AppStyles.switch}
                color={AppColors.COOL_GREEN}
                value={remindersByEmailOn}
                onValueChange={onToggleRemindersEmail}
              />
            </View>
          </View>
        </List.Section>
        <Divider style={AppStyles.divider} />
        <List.Section>
          <View style={AppStyles.row}>
            <View style={AppStyles.content_start}>
              <Paragraph style={AppStyles.text_notifications}>
                Text messages
              </Paragraph>
            </View>
            <View style={AppStyles.content_end}>
              <Switch
                style={AppStyles.switch_large}
                color={AppColors.COOL_GREEN}
                value={remindersBySmsOn}
                onValueChange={onToggleRemindersSms}
              />
            </View>
          </View>
        </List.Section>
        <Divider style={AppStyles.divider} />
      </ScreenBack>
      <DialogLoadingIndicator visible={loading} />
    </>
  );
});
