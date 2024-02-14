// import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import axios, { AxiosResponse } from 'axios';
import { AUTH_TOKEN, loadString } from '../../utils/storage';
import { onSignIn } from '../../utils/auth';
import { RootNavigation } from '../../navigators';
export type METHOD = "post" | "get" | "put" | "delete" | "patch"
const key = require("../../../key.json")
export interface Response<T> {

    data: T,
    status?: number,
    success?: number,
    message: string,
    error: [string],
    error_code: any
}

interface Config {
    baseUrl?: string,
    params?: any,
    endPoint: string,
    method?: METHOD,
    headers?: any,
    tokenRequired?: boolean;

}


export default async <T>(apiConfigs: Config,
    onSuccess: (res:any) => void,
    onFailure: (error: any, errorCode?: number) => void) => {
    const aipToken = await loadString(AUTH_TOKEN);
    console.log("aipToken",aipToken)
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const currentDate = new Date().getTime()
    let endpoint = apiConfigs.endPoint;
    const params: any = apiConfigs.params || {};
    const method: METHOD = apiConfigs.method || "post"
    const dataDogAttr: any = {}
    const baseURL = apiConfigs.baseUrl 

  
  

    const purgeAuth =()=>{
        onSignIn("")
          RootNavigation.navigate("sign_in");
   }


    // }
    if (null) {
        // Utils.showErrorToast('Please check your internet connection.')
        onFailure('')
        // onFailure('Please check your internet connection.')
    } else {

        if (params._path != undefined) {
            endpoint = `${endpoint}/${params._path}`
            delete params._path;
        }

        let headers: any = {
            // Authorization:  aipToken || "",

            Authorization: `Bearer ${aipToken}`  || "",
         
        }

        if (apiConfigs.headers) {
            headers = { ...headers, ...apiConfigs.headers }
        }

        if (params._parts) {
            // delete headers['Content-Type'];
            headers = {
                ...headers,
                // "Content-Type": 'multipart/form-data'
                'content-type': 'application/json'
            }
        }

        if (params._parts) {
            headers = {
                ...headers,
                'Content-Type': 'multipart/form-data'
            }
        }

        // console.log(`------------------Api Params of ${endpoint}-------------------`)
        console.log('ApiUrl ------------------->>>>>>>>>>>>.', baseURL + endpoint)
        console.log('Params ------------------->>>>>>>>>>>>.', params)

        // console.log("Token", token.commonReducer.storeToken);
        // console.log("apiKey", company_uuid);
        // console.log("header", headers);
        // console.log("method", method);
        // console.log("Params")
        // console.log(JSON.stringify(params));
        // console.log('--------------------------------------------------------------')
        let screen = ""


        // try {
        //     const route = getRoute()

        //     if (route) {

        //         screen = route.name
        //     }
        // } catch (e) {

        //     console.log("Error", e)
        // }
        let config: any = {
            baseURL: baseURL,
            timeout: 60000,
            headers: headers,
            cancelToken: source.token,
            
        }
        console.log("--------------------------------////","ScreenName ====>", screen,"////----------------------------------------");
        

      

        let request: Promise<any>

        switch (method) {
            case "post":
                request = axios.post(endpoint, params, config)
                break;
            case "get":
                config.params = params 
                request = axios.get(endpoint, config)
                break;
            case "delete":
                config.params = params 
                request = axios.delete(endpoint, config)
                break;
            case "put":
                request = axios.put(endpoint, params, config)
                break;
            case "patch":
                request = axios.patch(endpoint, params, config)
                break;
        }
        request.then(async (response: AxiosResponse<Response<T>>) => {
            // logger('------------------ Response-------------------')
            // logger(baseURL + endpoint + '\n Response', JSON.stringify(response.data.data));
            // logger('---------------------------------------------')

         //   console.log("\n\n\nresponse\n\n\n", JSON.stringify(response.data), "\n\n\n\n");
         //   console.log("Response Status", response.status, "\n\n\n\n");

            if (response) {

                console.log("res123333",response.data.status)

                
                let message = response?.data?.message || ""
                if (response.status == 200 || response.status == 201 || response.status == 202) {
                   console.log(`------------------ Response of ${endpoint} -------------------`,response.data)
                   console.log(JSON.stringify(response.data))
                //    console.log('--------------------------------------------------------------',response)

                    // if (response.data.status == 1 || response.data.success == 1 || response.data.success) {
                        try {
                         
                       
                            onSuccess(response.data.data || response.data)

                           

                        } catch (err) {
                            console.log('#Endpoint' + "Error--------->>>>", endpoint+err);
                            if (err) {
                                // dataDogAttr.errorMsg = err.toString()
                            }
                            onFailure(response.data.error )
                        }

                    // } else {
                      
                    //     const error: any = typeof response.data.error == "string" ?
                    //         response.data?.error: response.data?.message


                    //     if (response.data.error_code == 401) {
                    //         if (error) {
                    //         }
                    //         onFailure('Session expired')
                    //     //  purgeAuth();
                    //         // reset("Splash");
                    //     }
                    //     else {

                    //         if (error) {
                    //             dataDogAttr.errorMsg = error.toString()
                    //             // DataDog.i("Error", dataDogAttr)
                    //         }
                    //         onFailure(error && typeof (error) === "string" ? error : response?.data?.error|| 'Something went wrong')
                    //     }
                    // }

                } else if (response.status == 401) {

                    // DataDog.i("Error", dataDogAttr)
                    onFailure('Session expired')
                    purgeAuth();
                    // reset("Splash");

                } else {
                    // onFailure(error && typeof (error) === "string" ? error : 'Something went wrong')
                    const error: any = response?.data?.message;
                    // console.log("--------------", error)
                    // console.log('#Endpoint', endpoint);
                    onFailure(error && typeof (error) === "string" ? error : message || 'Something went wrong')
                }
            } else {
                // console.log('#Endpoint', endpoint);
                onFailure('Something went wrong')
            }
        }).catch(error => {
            console.log(`------------------ Error of ${endpoint} -------------------`)
            console.log(JSON.stringify(error));

            if (error) {
                if (error.response) {
                    console.log('Error', error.response.data);

                    switch (error.response.status) {

                        case 401:
                            console.log('1111111', error.response.data);
                            onFailure('Session expired')
                            purgeAuth();
                            // reset("Splash");
                            /* if (error.response.statusText == 'Unauthorized') {
                                purgeAuth();
                                reset("Splash");
                            } */
                            break;
                        default:
                            // onFailure('Something went wrong')
                            // dataDogAttr.errorMsg = error.message
                            onFailure(error.response.data)
                            break;
                    }
                } else if (error.message) {
                    console.log('#Endpoint', endpoint);
                 
                    onFailure(error.response.data)
                }
            } else {
                // DataDog.e("Error", dataDogAttr)
                console.log('#Endpoint', endpoint);
                onFailure('Something went wrong')
            }
        })
    }

    return source
}



