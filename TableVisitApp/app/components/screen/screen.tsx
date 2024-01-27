import * as React from "react"
import { ImageBackground, KeyboardAvoidingView, Platform, ScrollView, StatusBar, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { ScreenProps } from "./screen.props"
import { isNonScrolling, offsets, presets } from "./screen.presets"
import { AppStyles } from "../../theme"

const isIos = Platform.OS === "ios"

function ScreenWithoutScrolling(props: ScreenProps) {
    const insets = useSafeAreaInsets()
    const preset = presets.fixed
    const style = props.style || {}
    const backgroundStyle = props.backgroundColor ? { backgroundColor: props.backgroundColor } : {}
    const insetStyle = { paddingTop: props.unsafe ? 0 : insets.top }

    return (
        <KeyboardAvoidingView
            style={[preset.outer, backgroundStyle]}
            behavior={isIos ? "padding" : undefined}
            keyboardVerticalOffset={offsets[props.keyboardOffset || "none"]}
        >
            <StatusBar barStyle={props.statusBar || "light-content"} />
            <View style={[preset.inner, style, insetStyle]}>{props.children}</View>
        </KeyboardAvoidingView>
    )
}

function ScreenWithScrolling(props: ScreenProps) {
    const insets = useSafeAreaInsets()
    const preset = presets.scroll
    const style = props.style || {}
    const backgroundStyle = props.backgroundColor ? { backgroundColor: props.backgroundColor } : {}
    const insetStyle = { paddingTop: props.unsafe ? 0 : insets.top }

    return (
        <KeyboardAvoidingView
            style={[preset.outer, backgroundStyle]}
            behavior={isIos ? "padding" : undefined}
            keyboardVerticalOffset={offsets[props.keyboardOffset || "none"]}
        >
            <StatusBar barStyle={props.statusBar || "light-content"} />
            <View style={[preset.outer, backgroundStyle, insetStyle]}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    style={[preset.outer, backgroundStyle]}
                    contentContainerStyle={[preset.inner, style]}
                    keyboardShouldPersistTaps={props.keyboardShouldPersistTaps || "handled"}
                >
                    {props.children}
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    )
}

function ScreenWithoutScrollingBack(props: ScreenProps) {
    const insets = useSafeAreaInsets()
    const preset = presets.fixedBack
    const style = props.style || {}
    const insetStyle = { paddingTop: props.unsafe ? 0 : insets.top }

    return (
        <ImageBackground source={require('../../screens/shared/screen.png')} style={AppStyles.container} resizeMode={'cover'}>
        <KeyboardAvoidingView
            style={[preset.outer]}
            behavior={isIos ? "padding" : undefined}
            keyboardVerticalOffset={offsets[props.keyboardOffset || "none"]}
        >
            <StatusBar barStyle={props.statusBar || "light-content"} />
            <View style={[preset.inner, style, insetStyle]}>{props.children}</View>
        </KeyboardAvoidingView>
        </ImageBackground>
    )
}

function ScreenWithScrollingBack(props: ScreenProps) {
    const insets = useSafeAreaInsets()
    const preset = presets.scrollBack
    const style = props.style || {}
    const insetStyle = { paddingTop: props.unsafe ? 0 : insets.top }

    return (
        <ImageBackground source={require('../../screens/shared/screen.png')} style={AppStyles.container} resizeMode={'cover'}>
            <KeyboardAvoidingView
                style={[preset.outer]}
                behavior={isIos ? "padding" : undefined}
                keyboardVerticalOffset={offsets[props.keyboardOffset || "none"]}
            >
                <StatusBar barStyle={props.statusBar || "light-content"} />
                <View style={[preset.outer, insetStyle]}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        style={[preset.outer]}
                        contentContainerStyle={[preset.inner, style]}
                        keyboardShouldPersistTaps={props.keyboardShouldPersistTaps || "handled"}
                    >
                        {props.children}
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        </ImageBackground>
    )
}

/**
 * The starting component on every screen in the app.
 *
 * @param props The screen props
 */
export function Screen(props: ScreenProps) {
    if (isNonScrolling(props.preset)) {
        return <ScreenWithoutScrolling {...props} />
    } else {
        return <ScreenWithScrolling {...props} />
    }
}

export function ScreenBack(props: ScreenProps) {
    if (isNonScrolling(props.preset)) {
        return <ScreenWithoutScrollingBack {...props} />
    } else {
        return <ScreenWithScrollingBack {...props} />
    }
}