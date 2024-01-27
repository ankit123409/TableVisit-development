import {load, loadString, save, saveString, SELECTED_DATE, SELECTED_PLACE} from "./storage";
import {Share} from "react-native";
import ImageEditor from '@react-native-community/image-editor';
import * as FileSystem from 'expo-file-system';

export const currencyCode = () => {
    return "$ ";
};

export const currencyFormat = (num) => {
    return currencyCode() + parseFloat(num).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

export const saveSelectedVenue = async (venue) => {
    await save(SELECTED_PLACE, venue);
};

export const loadSelectedVenue = async () => {
    return await load(SELECTED_PLACE);
};

export const saveSelectedDate = async (date: string) => {
    await saveString(SELECTED_DATE, date);
};

export const loadSelectedDate = async () => {
    return await loadString(SELECTED_DATE);
};

export const onShare = async (place) => {
    try {
        const result = await Share.share({
            message: `${place.name} by Table Visit. The Future of NightLife.`
            // 'Table Visit. The Future of NightLife',
        });
        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                // shared with activity type of result.activityType
            } else {
                // shared
            }
        } else if (result.action === Share.dismissedAction) {
            // dismissed
        }
    } catch (error) {
        alert(error.message);
    }
};

export async function resizeImage(uri: string, width: number, height: number) {
    let wanted_max_size = 500;
    let raw_width = width;
    let raw_height = height;

    let ratio = raw_width / raw_height;
    let wanted_width = wanted_max_size;
    let wanted_height = wanted_max_size / ratio;

    if (raw_height > raw_width) {
        wanted_width = wanted_max_size * ratio;
        wanted_height = wanted_max_size;
    }

    return await ImageEditor.cropImage(uri,
        {
            offset: {x: 0, y: 0},
            size: {width: width, height: height},
            displaySize: {width: wanted_width, height: wanted_height},
            resizeMode: 'contain',
        }).then((resized) => {
        return resized;
    }).catch((e) => {
        console.log(e);
        return uri;
    });
}

export const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

export const getFileInfo = async (fileURI: string) => {
    const fileInfo = await FileSystem.getInfoAsync(fileURI)
    return fileInfo
}

export const isLessThanTheMB = (fileSize: number, smallerThanSizeMB: number) => {
    const isOk = fileSize / 1024 / 1024 < smallerThanSizeMB
    return isOk
}
