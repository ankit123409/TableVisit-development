import { observer } from 'mobx-react-lite';
import {
  Dialog,
  Divider,
  Paragraph,
  Portal,
  Snackbar,
  Button,
  List,
} from 'react-native-paper';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import * as React from 'react';
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
  load,
  save,
  SELECTED_BOOKING,
  SELECTED_PLACE,
  SELECTED_SERVICE_RATE,
} from '../../utils/storage';
import { useStores } from '../../models';
import { ServiceApi } from '../../services/api';
import { foodMenuApi } from './foodMenuApi';
import { addfooddata, delfooddata } from '../../utils/Redux/Action';
import { useDispatch, useSelector } from 'react-redux';
import { activereservationApi } from '../active-reservation/activereservationApi';

export const FoodMenuScreen = (props:any)=> {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>([]);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [selectedServiceRate, setSelectedServiceRate] = useState<any>({});
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);

  const { serviceStore, tableSpendStore } = useStores();
  const { foodRates } = serviceStore;

  const [showDialog, setShowDialog] = useState<boolean>(false);
  const hideDialog = () => setShowDialog(false);

  const selector = useSelector((elem)=>elem)
  console.log("selector",selector)
  const{booking} =props?.route?.params

  const dispatch = useDispatch()
  // const[checkid,setCheckId]=useState(selector?.food?.map((elm) => elm.id))

  const[checkid,setCheckId]=useState(selector?.food?.map((elm) => elm.id))
  const[selecteItem,setsectetedItem]=useState()


//   useEffect(() => {
//     console.log("props",props?.route?.params?.item.place?.id)
//     async function fetchData() {
//       try {
//         setLoading(true);

//         const temp = await load(SELECTED_PLACE);
//         console.log("temp",temp)


//       // const result = await api.getFoodMenu(props?.route?.params?.item.place?.id);
//       // console.log("result",result)

//       const venueDetails = await serviceStore.getFoodMenu(props?.route?.params?.item.place?.id);
// console.log("props?.route?.params?.item.place?.id",venueDetails.rates)
//       //  let data =   await serviceStore.getRates(temp.id);
//           setData(venueDetails.rates);

//         const booking = await load(SELECTED_BOOKING);
//         if (booking) setSelectedBooking(booking);
//       } catch (e) {
//         console.warn(e);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchData().then();
//   }, []);

useEffect(()=>{
  getFoodMenu(props?.route?.params?.item)
console.log("booking",props?.route?.params?.onpress
  
)
},[])
const getFoodMenu=(id:any)=>{

  setLoading(true);
  let params={
    _path:id
  }
  foodMenuApi.getFoodMenu(params, (res: any) => {
    if (res) {
        setData(res);  
    }
  setLoading(false);

},(error:any)=>{
 
  setLoading(false);


})
}

  const request = () => {
    try {

      const params={
        _path:booking.id,
        venue_id:booking.venue_table_info?.venue_info_id,
        check_in:true,
        food_orders:[selecteItem],
      }
      activereservationApi.updateBooking(params, (res: any) => {
        if (res) {
          if(props?.route?.params?.onpress){
            props?.route?.params?.onpress()
          }
  }    
      setLoading(false);
    },(error:any)=>{
      setLoading(false);
    })
      
    } catch (e) {
      console.warn(e);
    } finally {
      hideDialog();
      // RootNavigation.navigate('chat');
    }
  };

  const showRequest = (id:any) => {
    setsectetedItem(id) 


    if(booking){
      console.log("helooo",booking)
      setShowDialog(true);
return

      
    }else{
      let checkdata = checkid?.includes(id?.id);

      if (checkdata === false) {
        let t = [...checkid];
        t.push(id?.id);
        setCheckId(t);
        dispatch(addfooddata(id))
        // dispatch(addfooddata(id))   
  
      } else {
        let data = checkid?.filter((elem) => elem !== id?.id);
        // dispatch(delfooddata(id));
        setCheckId(data);
      }
     

    }

  };

  const emptyComponent = () => {
    return (
      <List.Section
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: Dimensions.get('screen').height - 200,
        }}
      >
        <Paragraph
          style={[
            AppStyles.empty_text,
            AppStyles.mh15,
            { fontFamily: 'Roboto-Bold', fontSize: moderateScale(18) },
          ]}
        >
          Sorry we didn't find any results..
        </Paragraph>
      </List.Section>
    );
  };

  return (
    <>
      <ScreenBack unsafe={true} backgroundColor={AppColors.BG}>
        <FlatList
          style={{ marginBottom: 25 }}
          showsVerticalScrollIndicator={false}
          data={[...data]}
          keyExtractor={(item) => String(item.id)}
          ItemSeparatorComponent={() => {
            return <Divider style={AppStyles.items_divider} />;
          }}
          ListEmptyComponent={emptyComponent}
          renderItem={({ item, index }) => {

            let showIcon = checkid?.includes(item.id)
          
            return (
              <TouchableOpacity
                onPress={() => {
                  showRequest(item);
                }}
              >
                <View style={styles.venue_list_container}>
                  <View style={styles.column_wrap}>
                    <View style={styles.row_style}>
                      <Paragraph numberOfLines={1} style={[styles.title_style]}>
                        {item.name}
                      </Paragraph>
                      <Paragraph numberOfLines={1} style={[styles.price_style]}>
                        $ {item.price}
                      </Paragraph>
                      <List.Icon
                    {...props}
                    icon={showIcon ? "radiobox-marked" : 'radiobox-blank'}
                  />

                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </ScreenBack>
      <Portal>
        {showDialog && (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
            }}
          >
            <Dialog
              style={{ borderRadius: 5, backgroundColor: AppColors.LIGHTGRAY }}
              visible={showDialog}
              onDismiss={hideDialog}
            >
              {/*@ts-ignore*/}
              <Dialog.Title style={AppStyles.dialog_title}>
                REQUEST BY MESSAGE
              </Dialog.Title>
              <Dialog.Content>
                <View style={AppStyles.row_wrap}>
                  <View style={[AppStyles.content_start]}>
                    <Paragraph style={[styles.order_name_style]}>
                      {selecteItem?.name}
                    </Paragraph>
                  </View>
                  <View style={[AppStyles.content_end]}>
                    <Paragraph style={styles.order_price_style}>
                      $ {selecteItem?.price}  
                    </Paragraph>
                  </View>
                </View>
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
                  onPress={hideDialog}
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
                  onPress={ () =>  request()}
                >
                  Yes
                </Button>
              </Dialog.Actions>
            </Dialog>
          </View>
        )}
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
          Please reserve your table first..
        </Text>
      </Snackbar>
      <DialogLoadingIndicator visible={loading} />
    </>
  );
}

const styles = StyleSheet.create({
  venue_list_container: {
    marginLeft: scale(12),
    marginRight: scale(12),
    marginBottom: verticalScale(12),
    backgroundColor: '#282A2D',
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(12),
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    borderRadius: scale(5),
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
  row_style: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  price_style: {
    color: AppColors.LOGO_COLOR,
    fontSize: moderateScale(13),
    fontFamily: 'Roboto-Bold',
  },
  title_style: {
    color: AppColors.WHITE,
    fontSize: moderateScale(13),
    fontFamily: 'Roboto-Regular',
  },
  order_name_style: {
    color: AppColors.WHITE,
    fontSize: moderateScale(17),
    fontFamily: 'Roboto-Regular',
  },
  order_price_style: {
    color: AppColors.LOGO_COLOR,
    fontSize: moderateScale(14),
    textAlign: 'right',
    fontFamily: 'Roboto-Bold',
  },
});
