import {
    AUTH_TOKEN,
    loadString,
    remove,
    saveString,
    SELECTED_BOOKING, SELECTED_CHAT_DATA,
    SELECTED_SERVICE_RATE,
    USER_DATA,
} from "./storage";
// @ts-ignore
import {DEFAULT_USER} from "@env"

export const onSignIn = (token) => {
    saveString(AUTH_TOKEN, token).then();
};

export const onSignOut = async () => {
    await remove(AUTH_TOKEN);
    // await remove(USER_LOCATION);
    await remove(USER_DATA);
    await remove(SELECTED_SERVICE_RATE);
    await remove(SELECTED_BOOKING);
    await remove(SELECTED_CHAT_DATA);
};

export const isSignedIn = () => {
    return new Promise((resolve, reject) => {
        loadString(AUTH_TOKEN)
            .then(x => {
                if (x !== null) {
                    resolve(x);
                } else {
                    resolve(null);
                }
            })
            .catch(ex => reject(ex));
    });
};
