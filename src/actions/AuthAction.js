import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_RESET,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAIL,
  USER_LOGIN_RESET,
  USER_LOGOUT,
} from '../constraints/AuthConstraint';

import { ethers } from 'ethers';
import contract from '../abis/HealthCare.json';

export const register =
  (name, phone, gender, email, bloodGroup, address, dob) =>
  async (dispatch) => {
    try {
      dispatch({ type: USER_REGISTER_REQUEST });
      let data = [];
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const accounts = await provider.send('eth_requestAccounts', []);
        const TaskContract = new ethers.Contract(
          contract.networks[5777].address,
          contract.abi,
          signer
        );
        data = await TaskContract.addPatient(
          name,
          phone,
          email,
          dob,
          bloodGroup,
          address
        );
        const transactionReceipt = await data.wait();
        if (transactionReceipt.status !== 1) {
          dispatch({
            type: USER_REGISTER_FAIL,
            payload: { msg: 'Transaction failed' },
          });
        } else {
          alert('register successfully');
        }
        localStorage.setItem('account', accounts[0]);
        dispatch({
          type: USER_REGISTER_SUCCESS,
          payload: {
            success: true,
            userInfo: { account: accounts[0], name: name, role: 'Patient' },
            msg: 'Registartion success',
          },
        });
        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: {
            success: true,
            userInfo: { account: accounts[0], name: name, role: 'Patient' },
            msg: 'Login success',
          },
        });
      } else {
        dispatch({
          type: USER_REGISTER_FAIL,
          payload: {
            msg: 'Non-Ethereum browser detected. You should consider trying MetaMask!',
          },
        });
      }
    } catch (e) {
      // toast.warning(
      //   e.response && e.response.data.msg ? e.response.data.msg : e.message
      // );
      dispatch({
        type: USER_REGISTER_FAIL,
        payload: {
          error:
            e.response && !e.response.data.success
              ? e.response.data
              : e.message,
          success: false,
          msg: 'User Registration failed, server error',
        },
      });
      setTimeout(() => {
        dispatch({ type: USER_REGISTER_RESET });
      }, 5000);
      console.log(e.message);
    }
  };

export const login = () => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    let data = [];
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      const TaskContract = new ethers.Contract(
        contract.networks[5777].address,
        contract.abi,
        signer
      );
      data = await TaskContract.Login();
      localStorage.setItem('account', accounts[0]);
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: {
          success: true,
          userInfo: { account: accounts[0], name: data.name, role: data.role },
          msg: 'Login success',
        },
      });
      localStorage.setItem(
        'userInfo',
        JSON.stringify({
          account: accounts[0],
          name: data.name,
          role: data.role,
        })
      );
    } else {
      console.log("Ethereum object doesn't exist");
      dispatch({
        type: USER_LOGIN_FAIL,
        payload: {
          success: false,
          msg: 'Non-Ethereum browser detected. You should consider trying MetaMask!',
        },
      });
    }
  } catch (e) {
    // toast.warning(
    //   e.response && e.response.data.msg ? e.response.data.msg : e.message
    // );
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: {
        error:
          e.response && !e.response.data.success ? e.response.data : e.message,
        success: false,
        msg: 'User Login failed, server error',
      },
    });
    setTimeout(() => {
      dispatch({ type: USER_LOGIN_RESET });
    }, 5000);
  }
};

export const logout = () => async (dispatch) => {
  // signout();
  localStorage.removeItem('userInfo');
  await dispatch({ type: USER_LOGOUT });
  // await dispatch({ type: USER_PROFILE_DETAILS_RESET });
  // await dispatch({ type: USER_UPDATE_PROFILE_RESET });
};
