import {
  USER_PROFILE_DETAILS_REQUEST,
  USER_PROFILE_DETAILS_SUCCESS,
  USER_PROFILE_DETAILS_FAIL,
} from '../constraints/UserConstraint';

import { ethers } from 'ethers';
import contract from '../abis/HealthCare.json';

export const getUserProfileDetails = () => async (dispatch) => {
  try {
    dispatch({ type: USER_PROFILE_DETAILS_REQUEST });
    let data = {};
    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const TaskContract = new ethers.Contract(
        contract.networks[5777].address,
        contract.abi,
        signer
      );
      data = await TaskContract.getPatientProfile();
    }
    console.log('data', data);
    const { name, email, dob, bloodGroup, permanentAddress, history } = data;
    dispatch({
      type: USER_PROFILE_DETAILS_SUCCESS,
      payload: {
        user: { name, email, dob, bloodGroup, permanentAddress, history },
      },
    });
  } catch (e) {
    dispatch({
      type: USER_PROFILE_DETAILS_FAIL,
      payload: {
        error:
          e.response && !e.response.data.success ? e.response.data : e.message,
        success: false,
        msg: 'User profile fetching failed, server error',
      },
    });
  }
};

export const getDoctorProfileDetails = () => async (dispatch) => {
  try {
    dispatch({ type: USER_PROFILE_DETAILS_REQUEST });
    let data = {};
    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const TaskContract = new ethers.Contract(
        contract.networks[5777].address,
        contract.abi,
        signer
      );
      data = await TaskContract.getDoctorProfile();
    }
    console.log('data', data);
    const { name, email, location, patient_list, hospital, type_name } = data;
    dispatch({
      type: USER_PROFILE_DETAILS_SUCCESS,
      payload: {
        user: {
          name,
          email,
          location,
          patient_list,
          hospital,
          type: type_name,
        },
      },
    });
  } catch (e) {
    dispatch({
      type: USER_PROFILE_DETAILS_FAIL,
      payload: {
        error:
          e.response && !e.response.data.success ? e.response.data : e.message,
        success: false,
        msg: 'User profile fetching failed, server error',
      },
    });
  }
};

// export const updateUserProfile = (user) => async (dispatch) => {
//     try {
//         dispatch({ type: USER_UPDATE_PROFILE_REQUEST });
//         const token = getCookie("token");
//         const config = {
//             headers: {
//                 "login-token": token,
//             },
//         };
//         const { data } = await axios.patch("/user/ownprofile", user, config);
//         dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
//         toast.success(data.msg);
//         updateUser(data);
//     } catch (e) {
//         toast.success(
//             e.response && e.response.data.msg ? e.response.data.msg : e.message
//         );
//         dispatch({
//             type: USER_UPDATE_PROFILE_FAIL,
//             payload:
//                 e.response && !e.response.data.success ? e.response.data : e.message,
//         });
//     }
// };
