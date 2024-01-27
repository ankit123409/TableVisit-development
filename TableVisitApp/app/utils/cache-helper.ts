/*
CacheManager
Get the local image from a remote URI

import {CacheManager} from "react-native-expo-image-cache";

const {uri} = this.props;
const path = await CacheManager.get(uri).getPath();
// if path is undefined, the image download has failed
You can also clear the local cache:

    import {CacheManager} from "react-native-expo-image-cache";

await CacheManager.clearCache();*/
