
export const ENV_LIVE = "live"
export const ENV_LOCAL = "local"




export const appConfig = {

    // CURRENT_ENV: ENV_LIVE

    CURRENT_ENV: ENV_LOCAL
}

export const baseUrls: any = {

    // live: "https://api.bizworkhq.com/api/",
    // // local: "http://192.168.1.135:5009/api"
    // local: "http://192.168.42.40:5009/api"

}

export const APP_BASE_URL: any = baseUrls[appConfig.CURRENT_ENV]
