// Use this import if you want to use "env.js" file
// const {API_URL, STORAGE_URL} = require("../../config/env")
// Or just specify it directly like this:
// const API_URL = "http://table-visit.southcentralus.cloudapp.azure.com"
// const STORAGE_URL = "http://table-visit.southcentralus.cloudapp.azure.com"

// const API_URL = "http://table-visit.southcentralus.cloudapp.azure.com"
// const STORAGE_URL = "http://table-visit.southcentralus.cloudapp.azure.com"

// @ts-ignore
// import {API_URL, STORAGE_URL} from "@env"

/**
 * The options used to configure the API.
 */
export const API_URL="P"  
export const STORAGE_URL="";
export interface ApiConfig {
    /**
     * The URL of the api.
     */
    url: string

    /**
     * The URL of the storage.
     */
    storage: string

    /**
     * Milliseconds before we timeout the request.
     */
    timeout: number
}

/**
 * The default configuration for the app.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
    url: API_URL|| "",
    storage: STORAGE_URL || "",
    timeout: 100000,
}
 

