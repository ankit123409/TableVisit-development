import { observer } from 'mobx-react-lite';
import {
  List,
  Avatar,
  TextInput,
  Button,
  Snackbar,
  Paragraph,
} from 'react-native-paper';
import {
  TouchableOpacity,
  View,
  Platform,
  Alert,
  StyleSheet,
  Text,
} from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { AppColors, AppStyles } from '../../theme';
import * as ImagePicker from 'expo-image-picker';
import { DialogLoadingIndicator, Screen, ScreenBack } from '../../components';
import { load, save, USER_DATA } from '../../utils/storage';
import { RootNavigation } from '../../navigators';
import { useStores } from '../../models';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Moment from 'moment';
import { useForm, Controller } from 'react-hook-form';
import { emailPattern } from '../../utils/app-helper';
import { onSignOut } from '../../utils/auth';
import { ApplicationContext } from '../../navigator2/main-router';
import { profileApi } from './profileApi';
import RNFS from 'react-native-fs';

export const ProfileScreen = observer(function ProfileScreen() {
  const { userStore, authStore, userProfileStore } = useStores();
  const { user } = authStore;
  const { profile } = userProfileStore;
  const { unsubscribe } = useContext(ApplicationContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      name: '',
      last_name: '',
      email: '',
    },
  });

  const [avatar, setAvatar] = useState(null);

  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  const [approved, setApproved] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState(null);
  const [governmentId, setGovernmentId] = useState(null);
  const [dob, setDob] = useState(null);
  const [loading, setLoading] = useState(true);
  const[defualtvalue,setDefultvalue]=useState()

  const [dobDate, setDobDate] = useState(new Date());
  const [pickerModal, setPickerModal] = useState(false);

  const { changeCurrentUser } = useContext(ApplicationContext);

  const handleConfirmDob = (date) => {
    setDobDate(date);
    setDob(Moment(date).format('MM-DD-YYYY'));
    setPickerModal(false);
  };
  useEffect(()=>{
getProfil()
  },[])
  const getProfil=()=>{
    setLoading(true);
    profileApi.getProfile({}, (res: any) => {
        if (res) {
          setValue('name', res.first_name);
                  setValue('last_name', res.last_name);
                  setValue('email', res.email);
                  if (user.dob) {
                    setDobDate(new Date(Moment(user.dob).format('YYYY/MM/DD')));
                    setDob(Moment(user.dob).format('MM-DD-YYYY'));
                  }
          // setValue()
          console.log("rseseses",res);
          
          
        }
      setLoading(false);

    },(error:any)=>{
     
      setLoading(false);
  
  
    })

  }

  // useEffect(() => {
  //   (async () => {
  //     if (Platform.OS !== 'web') {
  //       const { status } =
  //         await ImagePicker.requestMediaLibraryPermissionsAsync();
  //       if (status !== 'granted') {
  //         setSnackbarMessage(
  //           'Sorry, we need camera roll permissions to make this work!'
  //         );
  //       }
  //     }
  //   })();

  //   async function fetchData() {
  //     try {
  //       await reloadUser();
  //       if (user) {
  //         setValue('name', user.name === " " ? "" : user.name, { shouldValidate: true });
  //         setValue('last_name', user.last_name === " " ? "" : user.last_name, { shouldValidate: true });
  //         setValue('email', user.email, { shouldValidate: true });
  //         if (user.dob) {
  //           setDobDate(new Date(Moment(user.dob).format('YYYY/MM/DD')));
  //           setDob(Moment(user.dob).format('MM-DD-YYYY'));
  //         }
  //       }

  //       const result = await userProfileStore.getUserProfile();

  //       // if (result === 'unauthorized') {
  //       //   RootNavigation.navigate('sign_out');
  //       // }

  //       if (profile) {
  //         setGovernmentId(profile.government_id);
  //         setApproved(profile.approve_date && profile.approve_date.length > 0);
  //       }
  //     } catch (e) {
  //       console.warn(e);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   fetchData().then();
  // }, []);

  const pickAvatar = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.75,
    });


    console.log("cacelled", result)
    if (!result.canceled) {
      setAvatar(result);
    }
    else {
      avatar && setAvatar(avatar)
    }
  };

  const saveProfile = async (data) => {
    console.log("adscjdasbjfcds",avatar?.assets[0]?.uri)


    const formData = new FormData();

    formData.append('first_name', data.first_name);
formData.append('last_name', data.last_name);
formData.append('dob', Moment(new Date()).format('DD/MM/YYYY'));
// formData.append('email', data.email);

if (avatar?.assets[0]) {
  const fileUri = avatar.assets[0].uri;

  const fileData = await RNFetchBlob.fs.readFile(fileUri, 'base64')
  // Read the file as a buffer
 
  
  // Convert the buffer to a Blob and append it to the form data
  // const fileBlob = new Blob([fileBuffer], { type: avatar.assets[0].type });
  // formData.append('file', fileUri, avatar.assets[0].fileName);
}

    // formData.append('first_name', data.name);
    // formData.append('last_name', data.last_name);
    // formData.append('dob', Moment(new Date()).format('YYYY-MM-DD'));
    // formData.append('email', data.email);
    // formData.append('file', {
    //   uri: avatar?.assets[0]?.uri,
    //   type: 'image/jpeg', // Modify the type as needed
    //   name: avatar?.assets[0]?.fileName,
    // });
    // formData.append('file', 
    // uri: file?.assets?.[0]?.uri,
    //   type: 'image/jpeg', // Modify the type as needed
    //   name: file?.assets?.[0]?.fileName,);
    setLoading(true);
    
    profileApi.editProfile(formData, (res: any) => {
        if (res) {
          console.log("rseseses",res);
          getProfil()
          
          
        }
      setLoading(false);

    },(error:any)=>{
     
      setLoading(false);
  
  
    })
    return

    let params={
      first_name: data.name,
        last_name: data.last_name,
        dob: Moment(new Date()).format('YYYY-MM-DD'),
        email: data.email,

    }
    console.log("datata",params)


    try {
      let response = await userStore.update({
        
      });
return
      if (avatar) {
        response = await userStore.uploadAvatar(avatar);

        if (response.code !== 200) console.log(response.message);
      }

      if (response.code === 200) {
        const current = await reloadUser();

        if (current) changeCurrentUser(current);
      } else console.log(response.message);
    } catch (e) {
      console.warn(e);
    } finally {
      setLoading(false);
    }

    RootNavigation.goBack();
  };

  const openModal = () => {
    Alert.alert(
      'Delete account!',
      'Are you sure you want to Delete account?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'Yes', onPress: () => DeleteProfile() },
      ]
    );
  };

  const DeleteProfile = async () => {
    setLoading(true);
    const params={
      _path:5
    }
    profileApi.deleteProfile(params, (res: any) => {
      if (res) {
        console.log("rseseses",res);
        getProfil()
        
        
      }
    setLoading(false);

  },(error:any)=>{
   
    setLoading(false);


  })

 
  };

  const reloadUser = async () => {
    try {
      await authStore.getLoggedUser();

      if (user) {
        await save(USER_DATA, user);
        return user;
      }
    } catch (e) {
      console.warn(e);
    } finally {
    }

    return null;
  };

  return (
    <>
      <ScreenBack
        unsafe={true}
        style={AppStyles.screen_container}
        backgroundColor={AppColors.BG}
        preset={'scroll'}
      >
        <List.Section>
          <View style={{ alignItems: 'center', marginVertical: 10 }}>
            <TouchableOpacity onPress={pickAvatar}>
              <Avatar.Image
                size={100}
                style={AppStyles.user_avatar}
                source={
                  user?.avatar || avatar
                    ? {
                        uri: avatar
                          ? avatar?.assets?.[0]?.uri
                          : `https://tablevisit.s3.us-east-1.amazonaws.com/user/avatar/${user.avatar}`,
                      }
                    : require('../../screens/shared/app-logo.png')
                }
              />

              <Avatar.Icon
                size={40}
                color={AppColors.WHITE}
                style={styles.user_avatar_icon}
                icon={'camera-outline'}
              />
            </TouchableOpacity>
          </View>
        </List.Section>
        <List.Section style={styles.list_view_style}>
          <Paragraph style={styles.text_form}>First Name</Paragraph>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                textAlign={'left'}
                autoCapitalize={'none'}
                outlineColor={AppColors.DARK_GRAY}
                mode="outlined"
                textColor="white"
                placeholderTextColor={'#4D535B'}
                label={null}
                style={[
                  styles.input_flat,
                  {
                    backgroundColor: AppColors.DARK_GRAY,
                    height: 48,
                    borderRadius: 5,
                  },
                ]}
                placeholder="Enter your first name"
                value={value}
                onChangeText={onChange}
                underlineColor={AppColors.DIVIDER_GRAY}
              />
            )}
            name="name"
          />
          {errors.name && (
            <Paragraph style={AppStyles.error_text}>
              Please enter your first name.
            </Paragraph>
          )}
        </List.Section>
        <List.Section style={styles.list_view_style}>
          <Paragraph style={styles.text_form}>Last Name</Paragraph>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                textAlign={'left'}
                autoCapitalize={'none'}
                outlineColor={AppColors.DARK_GRAY}
                mode="outlined"
                textColor="white"
                placeholderTextColor={'#4D535B'}
                label={null}
                style={[
                  styles.input_flat,
                  {
                    backgroundColor: AppColors.DARK_GRAY,
                    height: 48,
                    borderRadius: 5,
                  },
                ]}
                placeholder="Enter your last name"
                value={value}
                onChangeText={onChange}
                underlineColor={AppColors.DIVIDER_GRAY}
              />
            )}
            name="last_name"
          />
          {errors.last_name && (
            <Paragraph style={AppStyles.error_text}>
              Please enter your last name.
            </Paragraph>
          )}
        </List.Section>
        <List.Section style={styles.list_view_style}>
          <Paragraph style={styles.text_form}>Email</Paragraph>
          <Controller
            control={control}
            rules={{
              required: true,
              pattern: emailPattern,
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                textAlign={'left'}
                autoCapitalize={'none'}
                outlineColor={AppColors.DARK_GRAY}
                mode="outlined"
                textColor="white"
                placeholderTextColor={'#4D535B'}
                label={null}
                style={[
                  styles.input_flat,
                  {
                    backgroundColor: AppColors.DARK_GRAY,
                    height: 48,
                    borderRadius: 5,
                  },
                ]}
                placeholder="Enter your email"
                value={value}
                onChangeText={onChange}
                underlineColor={AppColors.DIVIDER_GRAY}
                keyboardType={'email-address'}
              />
            )}
            name="email"
          />
          {errors.email && (
            <Paragraph style={AppStyles.error_text}>
              Please enter a valid email.
            </Paragraph>
          )}
        </List.Section>
        <List.Section style={styles.list_view_style}>
          <Paragraph style={styles.text_form}>Date of Birth</Paragraph>
          <TextInput
            disabled={true}
            textAlign={'left'}
            autoCapitalize={'none'}
            outlineColor={AppColors.DARK_GRAY}
            mode="outlined"
            placeholderTextColor={'#4D535B'}
            label={null}
            style={[
              styles.input_flat,
              {
                backgroundColor: AppColors.DARK_GRAY,
                height: 48,
                borderRadius: 5,
              },
            ]}
            placeholder="Enter your Birth date"
            value={dob}
            onTouchStart={() => {
              setPickerModal(true);
            }}
            textColor={AppColors.WHITE}
            underlineColor={AppColors.WHITE}
          />
          <DateTimePickerModal
            date={dobDate}
            isVisible={pickerModal}
            mode="date"
            onConfirm={handleConfirmDob}
            onCancel={() => {
              setPickerModal(false);
            }}
          />
        </List.Section>
        <List.Section>
          <View style={AppStyles.row_wrap}>
            <View style={AppStyles.content_start}>
              <Paragraph style={AppStyles.text_form}>Government ID</Paragraph>
            </View>
            <View style={AppStyles.content_end}>
              <TouchableOpacity
                onPress={() => RootNavigation.navigate('identity_verification')}
              >
                <Paragraph
                  style={[
                    AppStyles.text_form_logo_color,
                    { marginRight: 15, textDecorationLine: 'underline' },
                  ]}
                >
                  {approved ? 'Change' : 'Add'}
                </Paragraph>
              </TouchableOpacity>
            </View>
          </View>
          <TextInput
            disabled={true}
            textAlign={'left'}
            autoCapitalize={'none'}
            mode="flat"
            label={null}
            style={AppStyles.input_flat}
            placeholder="Government ID"
            value={governmentId}
            onChangeText={setGovernmentId}
            underlineColor={AppColors.DIVIDER_GRAY}
          />
        </List.Section>

        {/*<List.Section>
                    <Paragraph style={AppStyles.text_form}>Gender</Text>
                    <TextInput
                        textAlign={"left"}
                        autoCapitalize={'none'}
                        mode="flat"
                        label={null}
                        style={AppStyles.input_flat}
                        placeholder="Enter your Gender"
                        value={gender}
                        onChangeText={setGender}
                        underlineColor={AppColors.DIVIDER_GRAY}
                    />
                </List.Section>*/}
        <TouchableOpacity
          onPress={() => {
            openModal();
          }}
          style={{ marginBottom: 20, marginTop: 20 }}
        >
          <Paragraph
            style={{
              fontFamily: 'Roboto-Bold',
              fontSize: 15,
              color: 'red',
              textAlign: 'center',
            }}
          >
            Delete account
          </Paragraph>
        </TouchableOpacity>
        <List.Section>
          <Button
            mode="contained"
            dark={true}
            onPress={handleSubmit(saveProfile)}
            buttonColor={AppColors.LOGO_COLOR}
            style={[
              AppStyles.button,
              { marginHorizontal: 47, borderRadius: 10 },
            ]}
            contentStyle={AppStyles.button_content}
            labelStyle={[AppStyles.button_label, { fontSize: 20 }]}
          >
            Save
          </Button>
        </List.Section>
      </ScreenBack>
      <DialogLoadingIndicator visible={loading} />
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
          {snackbarMessage}
        </Text>
      </Snackbar>
    </>
  );
});

const styles = StyleSheet.create({
  text_form: {
    color: AppColors.WHITE,
    fontFamily: 'Roboto-Regular',
    fontSize: 15,
    marginVertical: 0,
  },
  input_flat: {
    backgroundColor: AppColors.BG,
  },
  list_view_style: {
    marginHorizontal: 16,
    flexDirection: 'column',
    gap: 5,
  },
  user_avatar_icon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: AppColors.LOGO_COLOR,
    tintColor: AppColors.WHITE,
  },
});
