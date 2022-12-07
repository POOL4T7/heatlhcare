import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_REGISTER_RESET,
    USER_LOGIN_RESET,
} from "../constraints/AuthConstraint";

export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true };
        case USER_REGISTER_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                userInfo: action.payload.userInfo,
                msg: action.payload.msg,
            };
        case USER_REGISTER_FAIL:
            return {
                loading: false,
                error: action.payload.error,
                success: action.payload.success,
                msg: action.payload.msg,
            };
        case USER_REGISTER_RESET:
            return { loading: false, error: null };
        default:
            return state;
    }
};

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true };
        case USER_LOGIN_SUCCESS:
            return {
                loading: false,
                userInfo: action.payload.userInfo,
                success: action.payload.success,
                msg: action.payload.msg,
            };
        case USER_LOGIN_FAIL:
            return {
                loading: false,
                error: action.payload.error,
                success: action.payload.success,
                msg: action.payload.msg,
            };
        case USER_LOGIN_RESET:
            return { loading: false, error: null };
        case USER_LOGOUT:
            return {};
        default:
            return state;
    }
};