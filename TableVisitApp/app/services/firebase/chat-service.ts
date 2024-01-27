/*import firebase from 'firebase';

import {
    FIREBASECONFIG_APIKEY,
    FIREBASECONFIG_AUTHDOMAIN,
    FIREBASECONFIG_DATABASEURL,
    FIREBASECONFIG_PROJECTID,
    FIREBASECONFIG_STORAGEBUCKET,
    FIREBASECONFIG_MESSAGINGSENDERID
} from "@env"*/

// https://medium.com/@phylypo/react-native-simple-chat-with-firebase-and-giftedchat-f7dbdff2883a
// https://snack.expo.dev/@samauch/simple-chat-with-avatar
// class ChatService {
/*private booking: string;

constructor() {
    if (!firebase.apps.length) { //avoid re-initializing
        firebase.initializeApp({
            apiKey: FIREBASECONFIG_APIKEY,
            authDomain: FIREBASECONFIG_AUTHDOMAIN,
            databaseURL: FIREBASECONFIG_DATABASEURL,
            projectId: FIREBASECONFIG_PROJECTID,
            storageBucket: FIREBASECONFIG_STORAGEBUCKET,
            messagingSenderId: FIREBASECONFIG_MESSAGINGSENDERID
        });
    } else {
        console.log("firebase apps already running...")
    }
}*/

/*login = async (user, success_callback, failed_callback) => {
    console.log("logging in");
    const output = await firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(success_callback, failed_callback);
    console.log(output);
}*/

/*observeAuth = () =>
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

onAuthStateChanged = user => {
    if (!user) {
        try {
            this.login(user, null, null).then();
        } catch ({message}) {
            console.log("Failed:" + message);
        }
    } else {
        console.log("Reusing auth...");
    }
};*/

/*createAccount = async (user) => {
    firebase.auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then(function () {
            console.log("created user successfully. User email:" + user.email + " name:" + user.name);
            let current_user = firebase.auth().currentUser;
            current_user.updateProfile({displayName: user.name})
                .then(function () {
                    console.log("Updated displayName successfully. name:" + user.name);
                    alert("User " + user.name + " was created successfully. Please login.");
                }, function (error) {
                    console.warn("Error update displayName.");
                });
        }, function (error) {
            console.error("got error:" + typeof (error) + " string:" + error.message);
            alert("Create account failed. Error: " + error.message);
        });
}*/

/*uploadImage = async uri => {
    console.log('got image to upload. uri:' + uri);
    try {
        const response = await fetch(uri);
        const blob = await response.blob();
        const ref = firebase
            .storage()
            .ref('avatar')
            .child(uuid.v4());
        const task = ref.put(blob);

        return new Promise((resolve, reject) => {
            task.on(
                'state_changed',
                () => {
                    /!* noop but you can track the progress here *!/
                },
                reject /!* this is where you would put an error callback! *!/,
                () => resolve(task.snapshot.downloadURL)
            );
        });
    } catch (err) {
        console.log('uploadImage try/catch error: ' + err.message); //Cannot load an empty url
    }
}*/

/*updateAvatar = (url) => {
    //await this.setState({ avatar: url });
    let current_user = firebase.auth().currentUser;
    if (current_user != null) {
        current_user.updateProfile({photoURL: url})
            .then(function () {
                console.log("Updated avatar successfully. url:" + url);
                alert("Avatar image is saved successfully.");
            }, function (error) {
                console.warn("Error update avatar.");
                alert("Error update avatar. Error:" + error.message);
            });
    } else {
        console.log("can't update avatar, user is not login.");
        alert("Unable to update avatar. You must login first.");
    }
}*/

/*onLogout = user => {
    firebase.auth().signOut().then(function () {
        console.log("Sign-out successful.");
    }).catch(function (error) {
        console.log("An error happened when signing out");
    });
}*/

/*get uid() {
    return (firebase.auth().currentUser || {}).uid;
}*/

/*set channel(booking) {
    this.booking = booking;
}

get channel() {
    return this.booking;
}

get ref() {
    return firebase.database().ref(this.channel);
}

parse = snapshot => {
    const {timestamp: numberStamp, text, user} = snapshot.val();
    const {key: id} = snapshot;
    const {key: _id} = snapshot; //needed for gifted chat
    const timestamp = new Date(numberStamp);

    const message = {
        id,
        _id,
        timestamp,
        text,
        user,
    };
    return message;
};

refOn = callback => {
    this.ref
        .limitToLast(20)
        .on('child_added', snapshot => callback(this.parse(snapshot)));
}

get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
}

send = messages => {
    for (let i = 0; i < messages.length; i++) {
        const {text, user} = messages[i];
        const message = {
            text,
            user,
            createdAt: this.timestamp,
        };
        this.ref.push(message);
    }
};

refOff() {
    this.ref.off();
}*/
// }

/*onImageUpload = async () => {
    const { status: cameraRollPerm } = await Permissions.askAsync(
        Permissions.CAMERA_ROLL
    );
    try {
        // only if user allows permission to camera roll
        if (cameraRollPerm === 'granted') {
            console.log('choosing image granted...');
            let pickerResult = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3],
            });
            console.log(
                'ready to upload... pickerResult json:' + JSON.stringify(pickerResult)
            );

            var wantedMaxSize = 150;
            var rawheight = pickerResult.height;
            var rawwidth = pickerResult.width;

            var ratio = rawwidth / rawheight;
            var wantedwidth = wantedMaxSize;
            var wantedheight = wantedMaxSize/ratio;
            // check vertical or horizontal
            if(rawheight > rawwidth){
                wantedwidth = wantedMaxSize*ratio;
                wantedheight = wantedMaxSize;
            }
            console.log("scale image to x:" + wantedwidth + " y:" + wantedheight);
            let resizedUri = await new Promise((resolve, reject) => {
                ImageEditor.cropImage(pickerResult.uri,
                    {
                        offset: { x: 0, y: 0 },
                        size: { width: pickerResult.width, height: pickerResult.height },
                        displaySize: { width: wantedwidth, height: wantedheight },
                        resizeMode: 'contain',
                    },
                    (uri) => resolve(uri),
                    () => reject(),
                );
            });
            let uploadUrl = await firebaseSvc.uploadImage(resizedUri);
            await this.setState({ avatar: uploadUrl });
            console.log(" - await upload successful url:" + uploadUrl);
            console.log(" - await upload successful avatar state:" + this.state.avatar);
            await firebaseSvc.updateAvatar(uploadUrl); //might failed
        }
    } catch (err) {
        console.log('onImageUpload error:' + err.message);
        alert('Upload image error:' + err.message);
    }
};*/

/*const chatService = new ChatService();
export default chatService;*/
