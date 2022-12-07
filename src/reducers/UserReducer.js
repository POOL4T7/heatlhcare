import {
  USER_PROFILE_DETAILS_REQUEST,
  USER_PROFILE_DETAILS_SUCCESS,
  USER_PROFILE_DETAILS_FAIL,
  USER_PROFILE_DETAILS_RESET,
  // USER_UPDATE_PROFILE_REQUEST,
  // USER_UPDATE_PROFILE_SUCCESS,
  // USER_UPDATE_PROFILE_FAIL,
  // USER_UPDATE_PROFILE_RESET,
} from '../constraints/UserConstraint';

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_PROFILE_DETAILS_REQUEST:
      return { ...state, loading: true };
    case USER_PROFILE_DETAILS_SUCCESS:
      return {
        loading: false,
        success: true,
        user: action.payload.user,
        msg: action.payload.msg,
      };
    case USER_PROFILE_DETAILS_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload.error,
        msg: action.payload.msg,
      };
    case USER_PROFILE_DETAILS_RESET:
      return {
        user: {},
      };
    default:
      return state;
  }
};

// export const userUpdateProfileReducer = (state = {}, action) => {
//     switch (action.type) {
//         case USER_UPDATE_PROFILE_REQUEST:
//             return { ...state, loading: true };
//         case USER_UPDATE_PROFILE_SUCCESS:
//             return {
//                 loading: false,
//                 userInfo: action.payload.data,
//                 success: action.payload.success,
//                 msg: action.payload.msg,
//             };
//         case USER_UPDATE_PROFILE_FAIL:
//             return { loading: false, error: action.payload.msg };
//         case USER_UPDATE_PROFILE_RESET:
//             return { loading: false, error: null, success: null };
//         default:
//             return state;
//     }
// };
