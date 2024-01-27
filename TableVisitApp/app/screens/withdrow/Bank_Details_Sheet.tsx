import React, { useEffect, useRef, useState } from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  AppColors,
  AppStyles,
  moderateScale,
  scale,
  verticalScale,
} from '../../theme';
import Icon from 'react-native-paper/src/components/Icon';
import moment from 'moment';
import { Button, Dialog, List, Paragraph, Portal, TextInput } from 'react-native-paper';
import { table_details_types, useStores } from '../../models';
import { load } from '../../utils/storage';
import { DialogLoadingIndicator } from '../../components';
import { Controller, useForm } from 'react-hook-form';

const BankDetailsSheet = ({
  isVisible,
  setIsVisible,
  props,
}) => {
  let sheetRef = useRef(null);

  const [loading, setLoading] = useState<boolean>(false);

  const { staffTableSpendStore } = useStores();

  const [tableDetails, setTableDetails] = useState<table_details_types | null>(
    null
  );
  useEffect(() => {
    if (isVisible.visible) {
      sheetRef.open();
    }
  }, [isVisible.visible]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      name: '',
      bank_name: '',
      account_number: '',
      routing_number: '',
    },
  });

  const signUpAction = async (data) => {
    sheetRef.close();
    props.navigation.navigate("amountTransfer")
  }

  return (
    <>
      <RBSheet
        animationType="slide"
        ref={(ref) => {
          sheetRef = ref;
        }}
        height={Dimensions.get('screen').height - verticalScale(200)}
        customStyles={{
          wrapper: { paddingHorizontal: 4, zIndex: 0 },
          container: {
            borderRadius: 10,
            backgroundColor: '#2D2D35',
            zIndex: 0,
          },
        }}
        onClose={setIsVisible}
      >
        <SafeAreaView>
          <View>
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.headerView}>
                <Text style={styles.headTextStyle}>{"Bank Details"}</Text>
                <TouchableOpacity
                  onPress={setIsVisible}
                  style={styles.close_style}
                >
                  <Icon
                    source={'close-circle'}
                    size={25}
                    color={AppColors.WHITE}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  paddingHorizontal: scale(16),
                  flexDirection: 'column',
                }}
              >
                <List.Section >
          <Paragraph style={styles.text_form}>Full Beneficiary Name</Paragraph>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                textAlign={'left'}
                autoCapitalize={'none'}
                mode="flat"
                label={null}
                style={styles.input_flat}
                placeholder="Enter Beneficiary Name"
                value={value}
                onChangeText={onChange}
                textColor="white"
                underlineColor={AppColors.DIVIDER_GRAY}
              />
            )}
            name="name"
          />
          {errors.name && (
            <Paragraph style={AppStyles.error_text}>
              Please enter your name.
            </Paragraph>
          )}
        </List.Section>
        <List.Section>
          <Paragraph style={styles.text_form}>Bank Name</Paragraph>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                textAlign={'left'}
                autoCapitalize={'none'}
                mode="flat"
                label={null}
                style={styles.input_flat}
                placeholder="Enter Bank Name"
                value={value}
                onChangeText={onChange}
                textColor="white"
                underlineColor={AppColors.DIVIDER_GRAY}
              />
            )}
            name="bank_name"
          />
          {errors.bank_name && (
            <Paragraph style={AppStyles.error_text}>
              Please enter bank detail.
            </Paragraph>
          )}
        </List.Section>
        <List.Section>
          <Paragraph style={styles.text_form}>Account Number</Paragraph>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                textAlign={'left'}
                autoCapitalize={'none'}
                mode="flat"
                label={null}
                style={styles.input_flat}
                placeholder="Enter Account Number"
                value={value}
                onChangeText={onChange}
                textColor="white"
                underlineColor={AppColors.DIVIDER_GRAY}
              />
            )}
            name="account_number"
          />
          {errors.account_number && (
            <Paragraph style={AppStyles.error_text}>
              Please enter account number.
            </Paragraph>
          )}
        </List.Section>
        <List.Section>
          <Paragraph style={styles.text_form}>Routing Number</Paragraph>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                textAlign={'left'}
                autoCapitalize={'none'}
                mode="flat"
                label={null}
                style={styles.input_flat}
                placeholder="Enter Routing Number"
                value={value}
                onChangeText={onChange}
                textColor="white"
                underlineColor={AppColors.DIVIDER_GRAY}
              />
            )}
            name="routing_number"
          />
          {errors.routing_number && (
            <Paragraph style={AppStyles.error_text}>
              Please enter routing number.
            </Paragraph>
          )}
        </List.Section>
 
                <Button
                  mode="contained"
                  dark={true}
                  buttonColor={AppColors.LOGO_COLOR}
                  onPress={handleSubmit(signUpAction)}
                  style={[
                    AppStyles.button,
                    {
                      marginHorizontal: scale(47),
                      borderRadius: scale(10),
                      marginTop : verticalScale(20)
                    },
                  ]}
                  contentStyle={AppStyles.button_content}
                  labelStyle={AppStyles.button_label}
                >
                  Transfer Now
                </Button>
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>
        <DialogLoadingIndicator visible={loading} />
      </RBSheet>
    </>
  );
};
export default BankDetailsSheet;

const styles = StyleSheet.create({
  headTextStyle: {
    fontSize: moderateScale(20),
    fontFamily: 'Roboto-Bold',
    color: AppColors.WHITE,
    textAlign: 'center',
  },
  headerView: { width: '100%', paddingVertical: verticalScale(20) },
  close_style: {
    position: 'absolute',
    right: scale(16),
    top: verticalScale(20),
  },
  section_title_style: {
    color: '#CFCFCF',
    fontSize: moderateScale(15),
    fontFamily: 'Roboto-Bold',
  },
  main_content_style: {
    flexDirection: 'column',
    gap: verticalScale(12),
    marginTop: verticalScale(9),
    marginHorizontal: scale(14),
  },
  info_content_style: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title_style: {
    color: '#E1D3BE',
    fontSize: moderateScale(13),
    fontFamily: 'Roboto-Regular',
  },
  value_style: {
    color: '#FDBD59',
    fontSize: moderateScale(13),
    fontFamily: 'Roboto-Bold',
  },
  text_form: {
    marginLeft: scale(5),
    marginRight: scale(5),
    color: AppColors.WHITE,
    fontFamily: "Roboto-Regular",
    fontSize: 15,
    marginVertical: 0,
  },
  input_flat: {
    marginLeft: scale(5),
    marginRight: scale(5),
    backgroundColor: AppColors.BG,
    marginTop : verticalScale(5)
  }
});
