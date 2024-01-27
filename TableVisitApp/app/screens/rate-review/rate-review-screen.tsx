import {observer} from 'mobx-react-lite';
import {Avatar, Button, List, TextInput, Paragraph} from 'react-native-paper';
import {View} from 'react-native';
import * as React from 'react';
import {AppColors, AppStyles} from '../../theme';
import {DialogLoadingIndicator, Screen, ScreenBack} from '../../components';
import {useEffect, useState} from 'react';
import {load, SELECTED_PLACE, USER_DATA} from '../../utils/storage';
import StarRating from 'react-native-star-rating-widget';
import {useStores} from '../../models';
import {RootNavigation} from '../../navigators';

export const RateReviewScreen = observer(function RateReviewScreen() {
  const [user, setUser] = useState<any>({});
  const [place, setPlace] = useState<any>({});
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);

  const {ratingStore} = useStores();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      try {
        let user_data = await load(USER_DATA);

        if (user_data) setUser(user_data);

        let temp_place = await load(SELECTED_PLACE);

        if (temp_place) {
          await setPlace(temp_place);
        }
      } catch (e) {
        console.warn(e);
      } finally {
        setLoading(false);
      }
    }

    fetchData().then();
  }, []);

  const rate = async () => {
    setLoading(true);
    try {
      await ratingStore.add({
        rating: rating,
        place_id: place.id,
        review: reviewText,
      });
    } catch (e) {
      console.warn(e);
    } finally {
      setLoading(false);

      RootNavigation.goBack();
    }
  };

  return (
    <>
      <ScreenBack
        unsafe={true}
        style={AppStyles.screen_container}
        backgroundColor={AppColors.BG}>
        <List.Section>
          <View style={[AppStyles.row, {marginVertical: 10}]}>
            <View style={[AppStyles.content_start, {flex: 1}]}>
              <Avatar.Image
                size={42}
                source={{uri: user.avatar}}
                style={[AppStyles.user_avatar]}
              />
            </View>
            <View style={[AppStyles.content_start, {flex: 4}]}>
              <Paragraph style={[AppStyles.text_16, {marginVertical: 10}]}>
                {user.name} {user.last_name}
              </Paragraph>
            </View>
          </View>
        </List.Section>
        <List.Section>
          <View style={[AppStyles.row_wrap]}>
            <View style={AppStyles.wrapper}></View>
            <View>
              <StarRating
                starSize={42}
                rating={rating}
                onChange={setRating}
                color={AppColors.LOGO_COLOR}
                enableSwiping={false}
                minRating={1}
                enableHalfStar={false}
              />
            </View>
            <View style={AppStyles.wrapper}></View>
          </View>
        </List.Section>
        <List.Section>
          <View style={[AppStyles.row, {marginVertical: 10}]}>
            <TextInput
              style={AppStyles.input_special}
              underlineColor={AppColors.DIVIDER_GRAY}
              textAlign={'left'}
              autoCapitalize={'none'}
              mode="flat"
              multiline={true}
              placeholder={'Share your experience to help others..'}
              label={null}
              value={reviewText}
              onChangeText={setReviewText}
            />
          </View>
        </List.Section>
        <List.Section>
          <Button
            mode="contained"
            dark={true}
            buttonColor={AppColors.LOGO_COLOR}
            style={AppStyles.button}
            contentStyle={AppStyles.button_content}
            labelStyle={AppStyles.button_label}
            onPress={async () => {
              await rate();
            }}>
            SEND
          </Button>
        </List.Section>
      </ScreenBack>
      <DialogLoadingIndicator visible={loading} />
    </>
  );
});
