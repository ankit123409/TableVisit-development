import {observer} from "mobx-react-lite";
import * as React from "react";
import {AppColors, AppStyles} from "../../theme";
import {DialogLoadingIndicator, ScreenBack} from "../../components";
import {useEffect, useState} from "react";
import {Dimensions} from "react-native";
import {WebView} from "react-native-webview";

export const TermsScreen = observer(function TermsScreen() {
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchData() {
            try {
            } catch (e) {
                console.warn(e);
            } finally {
            }
        }

        fetchData().then();

        return () => {
        }
    }, []);

    return (
        <>
            <ScreenBack
                unsafe={true}
                style={AppStyles.screen_container}
                backgroundColor={AppColors.BG}
            >
                <WebView
                    onLoadEnd={() => {
                        setLoading(false)
                    }}
                    containerStyle={{width: Dimensions.get("window").width, backgroundColor: AppColors.BG}}
                    source={{uri: 'https://tablevisit.com/user-terms/'}}
                />
            </ScreenBack>

            <DialogLoadingIndicator
                visible={loading}
            />
        </>
    );
})
