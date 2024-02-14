import { observer } from 'mobx-react-lite';
import * as React from 'react';
import {
  Button,
  Dialog,
  Divider,
  List,
  Paragraph,
  Portal,
  TextInput,
} from 'react-native-paper';
import {
  AppColors,
  AppStyles,
  moderateScale,
  scale,
  verticalScale,
} from '../../theme';
import { DialogLoadingIndicator, Screen, ScreenBack } from '../../components';
import { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { load, SELECTED_BOOKING } from '../../utils/storage';
import { useStores } from '../../models';
import { Controller, useForm } from 'react-hook-form';
import { emailPattern } from '../../utils/app-helper';
import Icon from 'react-native-paper/src/components/Icon';
import { guestListApi } from './guestListApi';

export const GuestListScreen = (props:any)=> {
  const [loading, setLoading] = useState<boolean>(false);
  const [booking, setBooking] = useState<any>({});
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const[isEdit,showIsEdit]=useState(false)

  const [data, setData] = useState([]);
  const { bookingGuestStore } = useStores();
  const { booking_guests } = bookingGuestStore;

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm({
    defaultValues: {
      id: 0,
      name: '',
      email: '',
    },
  });

  useEffect(() => {
    getGuestList(props?.route?.params?.booking)
  }, []);

  const getGuestList=(id)=>{

    const result=
    {
      booking_id:props?.route?.params?.booking
    }
  
    guestListApi.getGuestList(result, (res: any) => {
    if (res) {
      setData(res)
     
  
    }
},(error:any)=>{
  setLoading(false);
})


  }

  const add = async () => {

    try {
      setShowDialog(true);
    } catch (e) {
      console.warn(e);
    } finally {
      setLoading(false);
    }
  };

  const edit = async (guest: any) => {
    setLoading(true);
    showIsEdit(true)
    try {
      if (guest) {
        setValue('id', guest.id);
        setValue('name', guest.name, { shouldValidate: true });
        setValue('email', guest.email, { shouldValidate: true });
      }

      setShowDialog(true);
    } catch (e) {
      console.warn(e);
    } finally {
      setLoading(false);
    }
  };

  const save = async (data) => {
    setShowDialog(false);
    if(isEdit){

      const result=
    { email: data?.email,
      name:data?.name,
      booking_id:props?.route?.params?.booking,
      guest_id:data?.id
    }
    console.log("result",result)
    // console.log("")
  
    guestListApi.EditGuestList(result, (res: any) => {
    if (res) {
      reset({
        id: 0,
        name: '',
        email: '',
      });


      console.log("res",res)

    getGuestList(props?.route?.params?.booking)
     
  
    }
},(error:any)=>{
  setLoading(false);
})

    }else{

      const result=
    { email: data?.email,
      name:data?.name,
      booking_id:props?.route?.params?.booking
    }
  
    guestListApi.AddGuest(result, (res: any) => {
    if (res) {
      reset({
        id: 0,
        name: '',
        email: '',
      });


      console.log("res",res)

    getGuestList(props?.route?.params?.booking)
     
  
    }
},(error:any)=>{
  setLoading(false);
})

    }

    const result=
    { email: data?.email,
      name:data?.name,
      booking_id:props?.route?.params?.booking
    }
  
    guestListApi.AddGuest(result, (res: any) => {
    if (res) {
      reset({
        id: 0,
        name: '',
        email: '',
      });


      console.log("res",res)

    getGuestList(props?.route?.params?.booking)
     
  
    }
},(error:any)=>{
  setLoading(false);
})




    return

    try {
      await bookingGuestStore.save({
        guests: [
          {
            id: data.id,
            name: data.name,
            email: data.email,
            phone: '',
            comment: '',
            booking_id: booking.id,
            place_id: booking.place_id,
            table_id: booking.table_id,
          },
        ],
      });

      setValue('id', 0);
      setValue('name', '');
      setValue('email', '');

      await loadGuests(booking.id);
    } catch (e) {
      console.warn(e);
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id: number) => {
    console.log("isisis",id)
    setLoading(true);

    const result=
    { guest_id:id,
      booking_id:props?.route?.params?.booking
    }
  
    guestListApi.DeleteGuestList(result, (res: any) => {
    if (res) {
    setLoading(false);
    getGuestList(props?.route?.params?.booking)
    }
},(error:any)=>{
  setLoading(false);
})

  
  };


  const emptyComponent = () => {
    return (
      <List.Section>
        <View style={{display : "flex", flexDirection : "column", justifyContent : "center", alignItems : "center", marginTop : moderateScale(150)}}>
          <Image
            style={{ width: moderateScale(108), height : moderateScale(108), resizeMode: 'contain' }}
            source={require('../shared/empty.png')}
          />
        <Paragraph style={{ color: "#FDBD59", marginTop : moderateScale(15), fontWeight: "600", fontSize: moderateScale(30), lineHeight: moderateScale(30) }}>
          NO GUEST LIST
        </Paragraph>
        <Paragraph style={{ color: "#B1B1AF", paddingHorizontal : scale(10), marginTop : moderateScale(5), fontSize: moderateScale(17), lineHeight: moderateScale(20) }}>
          Your Guest List is empty,  Wherever you see
          this icon  + , tap on it to Add Guest List.
        </Paragraph>
        </View>
      </List.Section>
    );
  };

  return (
    <>
      <ScreenBack unsafe={true} backgroundColor={AppColors.BG}>
        <FlatList
          style={AppStyles.flat_container}
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.venue_list_container}>
                <View style={styles.column_wrap}>
                  <View>
                    <Paragraph numberOfLines={1} style={styles.guest_name}>
                      {item.name}
                    </Paragraph>
                  </View>
                  <View style={styles.right_content_style}>
                    <TouchableOpacity
                      onPress={async () => {
                        await edit(item);
                      }}
                    >
                      <Icon
                        color={'#B1B1AF'}
                        source="circle-edit-outline"
                        size={20}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={async () => {
                        await remove(item.id);
                      }}
                    >
                      <Icon
                        color={'#B1B1AF'}
                        source="trash-can-outline"
                        size={20}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          }}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={emptyComponent}
        ></FlatList>
      </ScreenBack>
      <SafeAreaView style={{ backgroundColor: AppColors.BG }}>
        <Button
          disabled={!booking || booking.is_past}
          mode="contained"
          dark={true}
          buttonColor={AppColors.LOGO_COLOR}
          style={AppStyles.button}
          contentStyle={AppStyles.button_content}
          labelStyle={AppStyles.button_label}
          onPress={add}
        >
          ADD
        </Button>
      </SafeAreaView>
      <Portal>
        <Dialog
          style={{ borderRadius: 5, backgroundColor: '#2D2D35' }}
          visible={showDialog}
          onDismiss={() => {
            setShowDialog(false);
          }}
        >
          {/*@ts-ignore*/}
          <Dialog.Title style={styles.dialog_title}>Add guest</Dialog.Title>
          <Dialog.Content>
            <List.Section>
              <Paragraph
                style={[
                  AppStyles.text_form_guest,
                  { fontFamily: 'Roboto-Regular' },
                ]}
              >
                Guest Name
              </Paragraph>
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
                    style={{
                      backgroundColor: '#2D2D35',
                    }}
                    textColor="white"
                    placeholder="Enter guest name"
                    value={value}
                    onChangeText={onChange}
                    underlineColor={AppColors.DIVIDER_GRAY}
                  />
                )}
                name="name"
              />
              {errors.name && (
                <Paragraph style={AppStyles.error_text}>
                  Please enter guest name.
                </Paragraph>
              )}
            </List.Section>
            <List.Section>
              <Paragraph
                style={[
                  AppStyles.text_form_guest,
                  { fontFamily: 'Roboto-Regular' },
                ]}
              >
                Guest Email
              </Paragraph>
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
                    mode="flat"
                    label={null}
                    style={{
                      backgroundColor: '#2D2D35',
                    }}
                    textColor="white"
                    placeholder="Enter guest email"
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
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              style={[
                AppStyles.button,
                {
                  borderRadius: scale(5),
                  backgroundColor: '#16181B',
                  margin: 0,
                },
              ]}
              contentStyle={{
                paddingVertical: verticalScale(0),
                width: scale(70),
              }}
              labelStyle={AppStyles.button_label}
              onPress={() => {
                setShowDialog(false);
              }}
            >
              Cancel
            </Button>
            <Button
              style={[
                AppStyles.button,
                {
                  borderRadius: 5,
                  backgroundColor: AppColors.LOGO_COLOR,
                  margin: 0,
                },
              ]}
              contentStyle={{
                paddingVertical: verticalScale(0),
                width: scale(70),
              }}
              labelStyle={AppStyles.button_label}
              onPress={handleSubmit(save)}
            >
              Save
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <DialogLoadingIndicator visible={loading} />
    </>
  );
};

const styles = StyleSheet.create({
  venue_list_container: {
    marginHorizontal: scale(12),
    marginBottom: verticalScale(12),
    backgroundColor: '#282A2D',
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(5),
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    borderRadius: scale(5),
  },
  column_wrap: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    padding: scale(10),
  },
  right_content_style: {
    flexDirection: 'row',
    gap: scale(8),
  },
  guest_name: {
    color: AppColors.WHITE,
    fontSize: moderateScale(13),
    fontFamily: 'Roboto-Regular',
    textAlign: 'left',
  },
  dialog_title: {
    fontSize: moderateScale(19),
    color: AppColors.WHITE,
    fontFamily: 'Roboto-Bold',
    textAlign: 'center',
  },
});
