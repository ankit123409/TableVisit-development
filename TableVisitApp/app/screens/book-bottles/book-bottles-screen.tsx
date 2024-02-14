import { Button, Divider, List, Paragraph, Snackbar } from 'react-native-paper';
import * as React from 'react';
import { AppColors, AppStyles } from '../../theme';
import { DialogLoadingIndicator, Screen, ScreenBack } from '../../components';
import { FlatList, SafeAreaView, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { RootNavigation } from '../../navigators';
import { bookBottlesApi } from './bookBottlesApi';
import { useDispatch, useSelector } from 'react-redux';
import { addCartdata, delCartdata } from '../../utils/Redux/Action';
import { activereservationApi } from '../active-reservation/activereservationApi';
import { confirmApi } from '../confirm/confirmApi';

export const BookBottlesScreen = (props:any)=> {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>([]);
  const [showResponse, setShowResponse] = useState<boolean>(false);
  const selector = useSelector((elem)=>elem)
 const[isfromconfirm,Setconfirm]=useState(false)

  const[checkid,setCheckId]=useState( selector?.data?.map((elm) => elm.id))
// const[booking,setBooking]=useState()
  const dispatch = useDispatch()
const{booking} =props?.route?.params
  useEffect(() => {
    console.log("dattaatatatat",booking);
    getBottle(props?.route?.params?.item)
    Setconfirm(props?.route?.params?.isfromConfrim )
  }, []);
  const getBottle=(id)=>{
    console.log("id",id)
    // setBooking(props?.route?.params?.booking_id)

    setLoading(true);
    let params={
      _path:id
    }
    bookBottlesApi.getBottleMenu(params, (res: any) => {
      if (res) {
          setData(res);   
      }
    setLoading(false);

  },(error:any)=>{
    setLoading(false);
  })

  }

  const setSelected = (id: string) => {
    if(booking && !isfromconfirm){



      const params={
        _path:booking.id,
        venue_id:booking.venue_table_info?.venue_info_id || props.route?.params?.item,
        check_in:true,
        bottle_orders:[id?.id],
      }


      activereservationApi.updateBooking(params, (res: any) => {
        if (res) {
          console.log("ressssssssss",res)
          // setShowSnackbar(true);
          //     setIsDisabled(true);

  
  }
         
  
  
          // setPlace(res) 
        // }
      setLoading(false);
  
    },(error:any)=>{
     
      setLoading(false);
  
  
    })

    // console.log("heleoeooe")

    }else{
      let checkdata = checkid?.includes(id?.id);
      if (checkdata === false) {
        let t = [...checkid];
        t.push(id?.id);
        setCheckId(t);
        dispatch(addCartdata(id))   
  
      } else {
        let data = checkid?.filter((elem) => elem !== id?.id);
        dispatch(delCartdata(id));
        setCheckId(data);
      }
    }
   
   



    // let checkdata =checkid.includes(id.id)
    // if (checkdata == false){
    // let t = checkid
    // t.push(id?.id)
    // setCheckId(t)
    //   // dispatch(addCartdata(id))   
    // //  console.log("checkdata",checkdata)
     
    // }else {
    //   let data =checkid.filter(elem => elem !== id.id)
    //   console.log("sdbfcjsdjfd",data)
    //   dispatch(delCartdata(id))   
    //   setCheckId(data)

    // }

   
  };

  const add = () => {
  //   const params={
  //     _path:props?.route?.params?.booking_id,
  //     venue_id:props?.route?.params?.item,
  //     // check_in:true,
  //     bottle_orders:checkid?.map((item)=>item),


  //   }
  //   activereservationApi.updateBooking(params, (res: any) => {
  //     if (res) {
  //     setShowResponse(true);

  //       }
  //   setLoading(false);
  // },(error:any)=>{
  //   setLoading(false);
  // })



  const params={
    booking_id:booking.booking_id,
    paymentIntentId:booking?.paymentIntentId,
    bottle_orders:checkid?.map((item)=>item)
    

  }

  setLoading(true);
  confirmApi.AddBooking(params, (res: any) => {
    if (res) {
      setShowResponse(true);

      console.log("res",res)
      // setPlace(res) 
    }
  setLoading(false);

},(error:any)=>{
  // setHasError(true);
  // setErrorMessage(error?.message)
  setLoading(false);


})



    // try {
    //   setLoading(true);

    //   const selected = data.filter((x) => x.selected === true);

    //   selected.map(async (item) => {
    //     const obj = {
    //       table_id: selectedBooking.table_id,
    //       amount: item.rate,
    //       tax_amount: item.tax,
    //       quantity: 1,
    //       total_tax_amount: item.tax,
    //       total_amount: item.total_rate,
    //       service_id: item.service_id,
    //       booking_id: selectedBooking.id,
    //     };

    //     await tableSpendStore.add(obj);
    //   });

    //   setShowResponse(true);
    // } catch (e) {
    //   console.warn(e);
    // } finally {
    //   setLoading(false);
    // }
  };


  return (
    <>
      <ScreenBack unsafe={true} >
        <FlatList
        extraData={checkid}
          style={{ marginBottom: 25 }}
          showsVerticalScrollIndicator={false}
          data={[...data]}
          keyExtractor={(item) => String(item.id)}
          // ItemSeparatorComponent={() => {
          //   return <Divider style={AppStyles.items_divider} />;
          // }}
          renderItem={({ item, index }) => {
            let showIcon = checkid?.includes(item?.id)
            if(showIcon){
              // console.log("kdkhdk")
            }

            return (
              <List.Item
                right={() => (
                  <Paragraph style={AppStyles.service_rate_title}>
                    $ {item?.price}
                  </Paragraph>
                )}
                titleStyle={AppStyles.item_title}
                key={index}
                title={item?.name}
                left={(props) => (
                  <List.Icon
                    {...props}
                    icon={showIcon ? "radiobox-marked" : 'radiobox-blank'}
                  />
                )}
                onPress={ () => {
                  setSelected(item);
                }}
              />
            );
          }}
        />
      </ScreenBack>
      <DialogLoadingIndicator visible={loading} />
      {props?.route?.params?.booking  ?
      <SafeAreaView style={{ backgroundColor: AppColors.BG }}>
        <Button
          mode="contained"
          dark={true}
          buttonColor={AppColors.LOGO_COLOR}
          onPress={async () => {
            // console.log("helooo")
            await add();
          }}
          style={AppStyles.button_safe_nm}
          contentStyle={AppStyles.button_content}
          labelStyle={AppStyles.button_label}
        >
          ADD TO BOOKING
        </Button>
      </SafeAreaView> :null
      }
      <Snackbar
        wrapperStyle={AppStyles.snackbar_wrapper}
        style={AppStyles.snackbar_content}
        visible={showResponse}
        onDismiss={() => setShowResponse(false)}
        action={{
          label: 'OK',
          onPress: () => {
            RootNavigation.navigate('bottomNav');
          },
        }}
        duration={Snackbar.DURATION_MEDIUM}
      >
        <Text style={{ color: AppColors.BLACK, fontFamily: 'Roboto-Regular' }}>
          Your request has been sent. Thanks!
        </Text>
      </Snackbar>
    </>
  );
};
