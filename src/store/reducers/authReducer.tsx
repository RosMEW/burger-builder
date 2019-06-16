export type authState = {
    token: string;
    userId: string;
    error: string;
    loading: boolean;
    authRedirectPath: string;
};

type action = {
    type: string;
    token?: string;
    userId?: string;
    error?: string;
};

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
};

export const authReducer = (state = initialState, action: action) => {
    switch (action.type) {
        case 'AUTH_START':
            return { ...state, error: null, loading: true };
        case 'AUTH_SUCCESS':
            return {
                ...state,
                token: action.token,
                userId: action.userId,
                error: null,
                loading: false
            };
        case 'AUTH_LOGOUT':
            return { ...state, token: null, userId: null };
        case 'AUTH_FAIL':
            return { ...state, error: action.error, loading: false };

        default:
            return state;
    }
};
