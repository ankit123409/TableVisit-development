import {observer} from "mobx-react-lite";
import * as React from "react";
import {AppColors, AppStyles} from "../../theme";
import {DialogLoadingIndicator, ScreenBack} from "../../components";
import {useEffect, useState} from "react";
import {Paragraph, Searchbar} from "react-native-paper";
import {View} from "react-native";

export const StaffTablesScreen = observer(function StaffTablesScreen() {
    const [loading, setLoading] = useState<boolean>(false);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        setLoading(true);

        async function fetchData() {
            try {
            } catch (e) {
                console.warn(e);
            } finally {
                setLoading(false);
            }
        }

        fetchData().then();

        return () => {
        }
    }, []);

    const search = async () => {
        setLoading(true);

        try {

        } catch (e) {
            console.warn(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <ScreenBack
                unsafe={true}
                style={AppStyles.screen_container}
                backgroundColor={AppColors.BG}
            >
                <Paragraph style={AppStyles.staff_page_title}>Tables</Paragraph>
                <Searchbar
                    autoCorrect={false}
                    autoCapitalize={"none"}
                    placeholderTextColor={AppColors.SEARCH_GRAY}
                    style={AppStyles.search_input}
                    textAlign={"left"}
                    placeholder={"Search tables or users.."}
                    iconColor={AppColors.LOGO_COLOR}
                    onChangeText={setSearchText}
                    value={searchText}
                    onEndEditing={search}
                />
                <View style={AppStyles.row}>
                    <Paragraph style={AppStyles.text_16}>Coming soon..</Paragraph>
                </View>
            </ScreenBack>

            <DialogLoadingIndicator
                visible={loading}
            />
        </>
    );
})
