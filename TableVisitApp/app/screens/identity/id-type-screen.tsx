import { observer } from 'mobx-react-lite';
import {
  Avatar,
  Button,
  Dialog,
  Divider,
  List,
  Paragraph,
  Portal,
  Snackbar,
  TextInput,
} from 'react-native-paper';
import { FlatList, Text, View } from 'react-native';
import * as React from 'react';
import { AppColors, AppStyles } from '../../theme';
import { DialogLoadingIndicator, Screen, ScreenBack } from '../../components';
import { RootNavigation } from '../../navigators';
import { useEffect, useState } from 'react';
import { useStores } from '../../models';
import {
  GOVERNMENT_ID,
  ISSUED_COUNTRY_ID,
  GOVERNMENT_ID_TYPE,
  loadString,
  saveString,
} from '../../utils/storage';
import { IdTypeEnum } from '../../utils/app-enums';

export const IdTypeScreen = observer(function IdTypeScreen() {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [types, setTypes] = useState([]);
  const [issuingCountry, setIssuingCountry] = useState('Select..');
  const [governmentId, setGovernmentId] = useState(null);
  const [issuingCountries, setIssuingCountries] = useState([]);
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);

  const { countryStore } = useStores();
  const { countries } = countryStore;

  const data = [
    {
      id: IdTypeEnum.DriversLicense.toString(),
      title: "Driver's license",
      selected: false,
      icon: 'radiobox-blank',
    },
    {
      id: IdTypeEnum.Passport.toString(),
      title: 'Passport',
      selected: false,
      icon: 'radiobox-blank',
    },
    {
      id: IdTypeEnum.IdentityCard.toString(),
      title: 'Identity card',
      selected: false,
      icon: 'radiobox-blank',
    },
  ];

  const setSelected = (id: string) => {
    const news = types.map((item) => {
      if (item.id === id) {
        saveString(GOVERNMENT_ID_TYPE, item.id).then();

        return {
          ...item,
          selected: true,
          icon: 'radiobox-marked',
        };
      } else {
        return {
          ...item,
          selected: false,
          icon: 'radiobox-blank',
        };
      }
    });

    setTypes(news);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        await countryStore.getCountries();

        if (countries) setIssuingCountries(countries.slice());

        setTypes(data);
      } catch (e) {
        console.warn(e);
      } finally {
        setLoading(false);
      }
    }

    fetchData().then();
  }, []);

  const next = async () => {
    setLoading(true);

    try {
      const government_id_type = await loadString(GOVERNMENT_ID_TYPE);
      const issued_country_id = await loadString(ISSUED_COUNTRY_ID);

      if (!governmentId || !government_id_type || !issued_country_id) {
        setShowSnackbar(true);
        setLoading(false);
      } else {
        await saveString(GOVERNMENT_ID, governmentId);
        setShowSnackbar(false);
        setLoading(false);
        RootNavigation.navigate('verifying_identity');
      }
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <>
      <ScreenBack unsafe={true} backgroundColor={AppColors.BG}>
        <View style={AppStyles.row}>
          <Paragraph style={AppStyles.verification_title}>
            Please fill out all fields
          </Paragraph>
        </View>
        <List.Section>
          <Paragraph style={AppStyles.text_form}>
            Government ID Number
          </Paragraph>
          <TextInput
            textAlign={'left'}
            autoCapitalize={'none'}
            mode="flat"
            label={null}
            style={AppStyles.input_flat}
            placeholder="Enter Government ID Number"
            value={governmentId}
            onChangeText={setGovernmentId}
            underlineColor={AppColors.DIVIDER_GRAY}
          />
        </List.Section>
        <List.Section>
          <Paragraph style={AppStyles.text_form}>
            Issuing country/region
          </Paragraph>
          <List.Item
            style={{ marginHorizontal: 5 }}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            titleStyle={AppStyles.item_text_white}
            title={issuingCountry}
            descriptionStyle={AppStyles.item_text_white}
            onPress={() => {
              setVisible(true);
            }}
          />
        </List.Section>
        <List.Section>
          <Paragraph style={AppStyles.text_form}>ID type</Paragraph>
          <FlatList
            scrollEnabled={false}
            data={[...types]}
            keyExtractor={(item) => String(item.id)}
            ItemSeparatorComponent={() => {
              return <Divider style={AppStyles.items_divider} />;
            }}
            renderItem={({ item, index }) => {
              return (
                <List.Item
                  style={{ marginHorizontal: 5 }}
                  right={(props) => <List.Icon {...props} icon={item.icon} />}
                  titleStyle={AppStyles.item_title}
                  key={index}
                  title={item.title}
                  onPress={async () => {
                    setSelected(item.id);
                  }}
                />
              );
            }}
          />
          <Divider style={AppStyles.items_divider} />
        </List.Section>
        <View style={AppStyles.modal_bottom}>
          <Avatar.Icon
            size={35}
            style={{
              backgroundColor: AppColors.TRANSPARENT,
              alignSelf: 'center',
            }}
            icon={'server-security'}
          />
          <Paragraph style={[AppStyles.text_13, AppStyles.text_center]}>
            Your information will be encrypted and stored securely.
          </Paragraph>
          <Button
            mode="contained"
            dark={true}
            buttonColor={AppColors.LOGO_COLOR}
            onPress={async () => {
              await next();
            }}
            style={AppStyles.button}
            contentStyle={AppStyles.button_content}
            labelStyle={AppStyles.button_label}
          >
            CONTINUE
          </Button>
        </View>
      </ScreenBack>
      <DialogLoadingIndicator visible={loading} />
      <Portal>
        <Dialog
          style={{ borderRadius: 0, backgroundColor: AppColors.BG }}
          onDismiss={() => {
            setVisible(false);
          }}
          visible={visible}
          dismissable={true}
        >
          {/*@ts-ignore*/}
          <Dialog.Title>Select country/region</Dialog.Title>
          <Dialog.Content style={{ height: 450 }}>
            <FlatList
              style={{ marginHorizontal: -10 }}
              showsVerticalScrollIndicator={false}
              data={[...issuingCountries]}
              keyExtractor={(item) => String(item.id)}
              ItemSeparatorComponent={() => {
                return <Divider style={AppStyles.items_divider} />;
              }}
              renderItem={({ item, index }) => {
                return (
                  <List.Item
                    right={(props) => (
                      <List.Icon {...props} icon="chevron-right" />
                    )}
                    titleStyle={AppStyles.item_title}
                    key={index}
                    title={item.name}
                    onPress={async () => {
                      await saveString(ISSUED_COUNTRY_ID, item.id.toString());
                      await setIssuingCountry(item.name);
                      setVisible(false);
                    }}
                  />
                );
              }}
            />
          </Dialog.Content>
        </Dialog>
      </Portal>

      <Snackbar
        wrapperStyle={AppStyles.snackbar_wrapper}
        style={AppStyles.snackbar_content}
        visible={showSnackbar}
        onDismiss={() => setShowSnackbar(false)}
        action={{
          label: 'OK',
          onPress: () => {},
        }}
        duration={Snackbar.DURATION_MEDIUM}
      >
        <Text style={{ color: AppColors.BLACK, fontFamily: 'Roboto-Regular' }}>
          Please fill out all fields..
        </Text>
      </Snackbar>
    </>
  );
});
