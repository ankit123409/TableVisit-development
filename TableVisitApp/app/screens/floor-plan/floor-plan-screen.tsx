import { observer } from 'mobx-react-lite';
import { FAB, Paragraph } from 'react-native-paper';
import { View, Image } from 'react-native';
import * as React from 'react';
import { AppColors, AppStyles } from '../../theme';
import { DialogLoadingIndicator, Screen, ScreenBack } from '../../components';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { load, SELECTED_PLACE } from '../../utils/storage';

export const FloorPlanScreen = observer(function FloorPlanScreen() {
  const [loading, setLoading] = useState<boolean>(false);
  const [place, setPlace] = useState<any>({});
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let temp = await load(SELECTED_PLACE);

        if (temp) setPlace(temp);
      } catch (e) {
        console.warn(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData().then(async () => {});

    return () => {};
  }, []);

  console.log('place', place?.floor_plan);
  return (
    <>
      <ScreenBack backgroundColor={AppColors.BG}>
        <View style={AppStyles.row_wrap}>
          <View style={AppStyles.wrapper}>
            <Paragraph style={AppStyles.title_center_small}>
              Floor Plan
            </Paragraph>
            <View style={AppStyles.view_pic}>
              <Image
                style={{ height: 500 }}
                resizeMode={'contain'}
                source={{
                  uri: place.floor_plan,
                }}
              />
            </View>
          </View>
        </View>

        <FAB
          style={AppStyles.fab_top}
          color={AppColors.WHITE}
          icon="close"
          small
          onPress={() => navigation.goBack()}
        />
      </ScreenBack>
      <DialogLoadingIndicator visible={loading} />
    </>
  );
});
