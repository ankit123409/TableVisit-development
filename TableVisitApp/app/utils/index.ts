type ReducerAction<T extends keyof State> = {
    payload: State[T];
    type: T;
};

export type State = {
    // Login
    email: string;
    password: string;

    // Diagnostic
    txtObservations: string;
};

export function inputReducer<T extends keyof State>(
    state: State,
    action: ReducerAction<T>
) {
    switch (action.type) {
        case action.type:
            state[action.type] = action.payload;
            return {...state};
        default:
            return {...state};
    }
}
