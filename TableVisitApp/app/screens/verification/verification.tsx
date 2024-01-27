import { observer } from "mobx-react-lite";
import * as React from "react";
import { AppColors, AppStyles, scale, verticalScale } from "../../theme";
import { DialogLoadingIndicator, ScreenBack } from "../../components";
import { useEffect, useState } from "react";
import { Dimensions, Image, Text } from "react-native";
import { WebView } from "react-native-webview";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import {
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { AuthApi } from "../../services/api";
import { RootNavigation } from "../../navigators";
import {
  load,
  REGISTRATION_DATA,
  USER_EMAIL,
  USER_PHONE,
} from "../../utils/storage";
import { useStores } from "../../models";
import { Snackbar } from "react-native-paper";

export const Verification = observer(function Verification() {
  const api = new AuthApi();
  const [loading, setLoading] = useState<boolean>(true);
  const [otp, setOtp] = useState<string>("");
  const [seconds, setSeconds] = useState(30);
  const [isMessage, setIsMessage] = useState({
    visible: false,
    message: "",
  });

  const { authStore } = useStores();

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [seconds]);

  const verifyOTP = async (otp: string) => {
    setLoading(true);
    const email = await load(USER_EMAIL);

    let auth_data = { email: email, otp: otp };
    const auth_result = await api.verifyOTP(auth_data);
    if (auth_result.kind == "ok") {
      alert("Verification Done Successfully");
      RootNavigation.navigate("sign_in");
    } else {
      alert(auth_result?.message);
    }
    setLoading(false);
  };

  const handleSendOtp = async () => {
    const data = await load(REGISTRATION_DATA);

    const result = await authStore.getSignUp({
      name: data.name,
      last_name: data.last_name,
      email: data.email,
      password: data.password,
      socialType: "",
      device_key: data.device_key,
    });

    if (result && result.code === 200) {
      setIsMessage({
        message: "Otp sent successfully",
        visible: true,
      });
      setSeconds(30);
    }
  };

  return (
    <>
      <ScreenBack
        unsafe={true}
        style={AppStyles.screen_container}
        backgroundColor={AppColors.BG}
      >
        <View
          style={{
            padding: 30,
            paddingBottom: 1,
            justifyContent: "center",
            alignSelf: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <Image
            style={{
              height: verticalScale(100),
              width: scale(100),
              marginBottom: verticalScale(20),
            }}
            source={require("../shared/table-logotipo.png")}
          />
          <Text style={{ color: "white", lineHeight: 23 }}>
            Thank You for creating account.
          </Text>
          <Text style={{ color: "white", lineHeight: 23 }}>
            Verification code has been send on the email address.
          </Text>
          <Text style={{ color: "white", lineHeight: 23 }}>
            Please enter code below and verify yourself.
          </Text>
          <OTPInputView
            code={otp}
            style={{
              width: "70%",
              height: 100,
              alignSelf: "center",
              alignItems: "center",
            }}
            selectionColor="white"
            placeholderTextColor="white"
            pinCount={4}
            onCodeChanged={(code) => setOtp(code)}
            autoFocusOnLoad
            codeInputFieldStyle={{
              width: 30,
              height: 45,
              borderWidth: 0,
              borderBottomWidth: 1,
            }}
            codeInputHighlightStyle={{
              borderColor: "#03DAC6",
            }}
            onCodeFilled={(code) => {
              verifyOTP(code);
            }}
          />
          <TouchableOpacity
            onPress={() => {
              verifyOTP(otp);
            }}
          >
            <Text style={{ color: "white", marginTop: 10 }}>Verify OTP</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              RootNavigation.navigate("sign_in");
            }}
          >
            <Text style={{ color: "white", marginTop: 10 }}>
              Go to login page
            </Text>
          </TouchableOpacity>
          {seconds === 0 ? (
            <TouchableOpacity onPress={handleSendOtp}>
              <Text
                style={{ color: "white", marginTop: 10, fontWeight: "bold" }}
              >
                Resend OTP
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity>
              <Text
                style={{ color: "white", marginTop: 10, fontWeight: "bold" }}
              >
                Resend OTP in 00:{seconds}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScreenBack>
      <Snackbar
        wrapperStyle={AppStyles.snackbar_wrapper}
        style={AppStyles.snackbar_content}
        visible={isMessage.visible}
        onDismiss={() =>
          setIsMessage({
            message: "",
            visible: false,
          })
        }
        action={{
          label: "OK",
          onPress: () => {},
        }}
        duration={Snackbar.DURATION_MEDIUM}
      >
        <Text style={{ color: AppColors.BLACK, fontFamily: "Roboto-Regular" }}>
          {isMessage.message}
        </Text>
      </Snackbar>
      <DialogLoadingIndicator visible={loading} />
    </>
  );
});