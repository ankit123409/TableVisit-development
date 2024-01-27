import * as Font from "expo-font"

export const initFonts = async () => {
    // Refer to ./assets/fonts/custom-fonts.md for instructions.
    // ...
    // Welcome back! Just uncomment this and replace/append with your font file names!
    // ⬇
    // await Font.loadAsync({
    //   Montserrat: require("./Montserrat-Regular.ttf"),
    //   "Montserrat-Regular": require("./Montserrat-Regular.ttf"),
    // })

    await Font.loadAsync({
        "Roboto-Bold": require("../../../assets/fonts/Roboto-Bold.ttf"),
        "Roboto-Light": require("../../../assets/fonts/Roboto-Light.ttf"),
        "Roboto-Medium": require("../../../assets/fonts/Roboto-Medium.ttf"),
        "Roboto-Regular": require("../../../assets/fonts/Roboto-Regular.ttf"),
        "Roboto": require("../../../assets/fonts/Roboto-Regular.ttf"),

        "Material Design Icons": require("../../../assets/fonts/MaterialCommunityIcons.ttf"),
        "MaterialCommunityIcons": require("../../../assets/fonts/MaterialCommunityIcons.ttf"),
        "Zocial": require("../../../assets/fonts/Zocial.ttf"),
    })
}
