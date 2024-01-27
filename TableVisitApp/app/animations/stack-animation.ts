import {
    HeaderStyleInterpolators,
    StackCardInterpolationProps,
    StackNavigationOptions,
    TransitionSpecs
} from "@react-navigation/stack";

export const horizontalAnimation: StackNavigationOptions = {
    gestureDirection: 'horizontal',
    transitionSpec: {
        open: TransitionSpecs.TransitionIOSSpec,
        close: TransitionSpecs.TransitionIOSSpec,
    },
    headerStyleInterpolator: HeaderStyleInterpolators.forFade,
    cardStyleInterpolator: ({
                                current,
                                layouts,
                            }: StackCardInterpolationProps) => {
        return {
            cardStyle: {
                transform: [
                    {
                        translateX: current.progress.interpolate({
                            inputRange: [0, 1],
                            outputRange: [layouts.screen.width, 0],
                        }),
                    },
                ],
            },
        };
    },
};

export const verticalAnimation: StackNavigationOptions = {
    gestureDirection: 'vertical',
    transitionSpec: {
        open: TransitionSpecs.TransitionIOSSpec,
        close: TransitionSpecs.TransitionIOSSpec,
    },
    header: () => {
        return null
    },
    headerStyleInterpolator: HeaderStyleInterpolators.forSlideUp,
    cardStyleInterpolator: ({
                                current,
                                layouts,
                            }: StackCardInterpolationProps) => {
        return {
            cardStyle: {
                transform: [
                    {
                        translateY: current.progress.interpolate({
                            inputRange: [0, 1],
                            outputRange: [layouts.screen.height, 0],
                        }),
                    },
                ],
            },
        };
    },
};

export const bookingPaymentAnimation: StackNavigationOptions = {
    gestureDirection: 'horizontal',
    transitionSpec: {
        open: TransitionSpecs.TransitionIOSSpec,
        close: TransitionSpecs.TransitionIOSSpec,
    },
    title: 'Tab & Payments',
    headerStyleInterpolator: HeaderStyleInterpolators.forFade,
    cardStyleInterpolator: ({
                                current,
                                layouts,
                            }: StackCardInterpolationProps) => {
        return {
            cardStyle: {
                transform: [
                    {
                        translateX: current.progress.interpolate({
                            inputRange: [0, 1],
                            outputRange: [layouts.screen.width, 0],
                        }),
                    },
                ],
            },
        };
    },
};
