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
import { Button, Dialog, Portal } from 'react-native-paper';
import { table_details_types, useStores } from '../../models';
import { load } from '../../utils/storage';
import { DialogLoadingIndicator } from '../../components';

const details = {
  name: 'VIP Table 2',
  booking: {
    date: moment(),
    confirmation_code: '#AJS&(*(*',
    status: 'paid',
    booking_total: '$ 50.00',
  },
  payment: {
    table_cost: '# 33.00',
    gratuity: '$ 0.00',
    amount_pay: '$ 50.00',
  },
  table_cost: {
    fries: '$ 5.00',
    rolles: '$ 15.00',
    wings: '$ 13.00',
  },
};

const TableStaffDetailSheet = ({
  isVisible,
  setIsVisible,
  setIsCloseConfirm,
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

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const result = await staffTableSpendStore.getTableBookingDetail({
          booking_id: isVisible.data.booking_id,
          place_id: isVisible.data.place_id,
          table_id: isVisible.data.table_id,
        });
        setTableDetails(result.table_spends);
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
                <Text style={styles.headTextStyle}>{details.name}</Text>
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
                  gap: verticalScale(23),
                }}
              >
                <View>
                  <Text style={styles.section_title_style}>
                    Booking Information
                  </Text>
                  <View style={styles.main_content_style}>
                    <View style={styles.info_content_style}>
                      <Text style={styles.title_style}>Date</Text>
                      <Text style={styles.value_style}>
                        {moment(tableDetails?.book_date).format('DD MMM YYYY')}
                      </Text>
                    </View>
                    <View style={styles.info_content_style}>
                      <Text style={styles.title_style}>Confirmation code</Text>
                      <Text style={styles.value_style}>
                        {tableDetails?.confirmation_code}
                      </Text>
                    </View>
                    <View style={styles.info_content_style}>
                      <Text style={styles.title_style}>Status</Text>
                      <Text style={styles.value_style}>
                        {tableDetails?.booking_status}
                      </Text>
                    </View>
                    <View style={styles.info_content_style}>
                      <Text style={styles.title_style}>Booking Total</Text>
                      <Text style={styles.value_style}>
                        $ {tableDetails?.spent_amount}
                      </Text>
                    </View>
                  </View>
                </View>
                <View>
                  <Text style={styles.section_title_style}>
                    Payment Details
                  </Text>
                  <View
                    style={[
                      styles.main_content_style,
                      {
                        backgroundColor: '#282A2D',
                        marginHorizontal: 0,
                        padding: scale(15),
                        borderRadius: scale(5),
                        borderColor: '#2E3034',
                      },
                    ]}
                  >
                    <View style={styles.info_content_style}>
                      <Text style={styles.title_style}>Table Cost</Text>
                      <Text style={styles.value_style}>
                        {tableDetails?.spent_amount}
                      </Text>
                    </View>
                    <View style={styles.info_content_style}>
                      <Text style={styles.title_style}>Gratuity</Text>
                      <Text style={styles.value_style}>
                        {tableDetails?.gratuity_amount ?? '$ 0.00'}
                      </Text>
                    </View>
                    <View
                      style={{
                        borderTopColor: '#2E3034',
                        borderTopWidth: verticalScale(1),
                      }}
                    />
                    <View style={styles.info_content_style}>
                      <Text
                        style={[
                          styles.title_style,
                          {
                            fontSize: moderateScale(15),
                            fontFamily: 'Roboto-Bold',
                          },
                        ]}
                      >
                        Amount to pay
                      </Text>

                      <Text
                        style={[
                          styles.value_style,
                          { fontSize: moderateScale(15) },
                        ]}
                      >
                        {tableDetails?.total_amount}
                      </Text>
                    </View>
                  </View>
                </View>
                <Button
                  mode="contained"
                  dark={true}
                  buttonColor={AppColors.LOGO_COLOR}
                  onPress={async () => {
                    sheetRef.close();
                    setIsCloseConfirm({
                      visible: true,
                      booking_id: isVisible.data.booking_id,
                    });
                  }}
                  style={[
                    AppStyles.button,
                    {
                      marginHorizontal: scale(47),
                      borderRadius: scale(10),
                    },
                  ]}
                  contentStyle={AppStyles.button_content}
                  labelStyle={AppStyles.button_label}
                >
                  Close Tab
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
export default TableStaffDetailSheet;

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
});
