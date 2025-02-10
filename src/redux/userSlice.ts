import { AnyAction, createSlice, Dispatch } from '@reduxjs/toolkit';

import { Client } from '../config';
import { apiRoutes } from '../constants/apiRoutes';
import { UserDetails } from '../common/interface/userDetails.interface';
import { SignIn, SignUp } from '../common/interface/signIn.interface';
import { enqueueSnackbar } from 'notistack';

export interface UserState {
  userDetails: any;
  isLoading: boolean;
  registrationSuccess: boolean;
  doesEmailExists: boolean;
  loginSuccess: boolean;
  logoutSuccess: boolean;
}

const initialState: UserState = {
  userDetails: {},
  isLoading: false,
  registrationSuccess: false,
  doesEmailExists: true,
  loginSuccess: false,
  logoutSuccess: false,
};

export const USER_DETAILS = 'userDetails';

export const LoggedInUser = createSlice({
  name: USER_DETAILS,
  initialState,
  reducers: {
    getUserDetails: (state, actions) => {
      state.userDetails = actions.payload;
    },
    updateLoading: (state, actions) => {
      state.isLoading = actions.payload;
    },
    registrationSuccess: (state, actions) => {
      state.registrationSuccess = actions.payload;
    },
    loginSuccess: (state, actions) => {
      state.loginSuccess = actions.payload;
    },
    logoutSuccess: (state, actions) => {
      state.logoutSuccess = actions.payload;
    },
    doesEmailExists: (state, actions) => {
      state.doesEmailExists = actions.payload;
    }
  }
});

export const { getUserDetails, updateLoading, registrationSuccess, doesEmailExists, loginSuccess, logoutSuccess } = LoggedInUser.actions;

export const userReducer = LoggedInUser.reducer;

export const registerUser = (userData: SignUp): any => {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      dispatch(updateLoading(true));
      const data = await Client.post(apiRoutes.signUp, userData);
      dispatch(registrationSuccess(data.data));
    } catch (err: any) {
      enqueueSnackbar(err?.response?.data?.message || err, {
        preventDuplicate: false,
        persist: false,
        variant: 'error'
      });
    } finally {
      dispatch(updateLoading(false));
    }
  };
};

export const loginUser = (userData: SignIn, deviceId: string): any => {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      dispatch(updateLoading(true));
      const data = await Client.post(apiRoutes.signIn, {
        ...userData,
        deviceId,
      });
      await localStorage.setItem('usertk', JSON.stringify(data?.data?.data?.accessToken?.token));
      const newToken = await localStorage.getItem('usertk');
      console.log('accessToken', data.data.data, JSON.parse(newToken ?? ''))
      dispatch(loginSuccess(true));
    } catch (err: any) {
      enqueueSnackbar(err?.response?.data?.message || err, {
        preventDuplicate: false,
        persist: false,
        variant: 'error'
      });
    } finally {
      dispatch(updateLoading(false));
    }
  };
};

export const logoutUser = (): any => {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      dispatch(updateLoading(true));
      const data = await Client.post(apiRoutes.signOut)
      localStorage.removeItem('usertk');
      dispatch(logoutSuccess(true));
    } catch (err: any) {
      enqueueSnackbar(err?.response?.data?.message || err, {
        preventDuplicate: false,
        persist: false,
        variant: 'error'
      });
    } finally {
      dispatch(updateLoading(false));
    }
  };
};

export const fetchUserDetails = (): any => {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      dispatch(updateLoading(true));
      const details = await Client.get(apiRoutes.userDetails);
      console.log(details.data)
      dispatch(getUserDetails(details?.data?.data));
    } catch (err: any) {
      enqueueSnackbar(err?.response?.data?.message || err, {
        preventDuplicate: false,
        persist: false,
        variant: 'error'
      });
    } finally {
      dispatch(updateLoading(false));
    }
  };
};

export const emailExists = (email: string): any => {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      dispatch(updateLoading(true));
      const data = await Client.get(`${apiRoutes.emailExists}?email=${email}`);
      dispatch(doesEmailExists(data?.data?.data?.isUserExist));
      if (data?.data?.data?.isUserExist) {
        throw new Error(data.data.message);
      }
    } catch (err: any) {
      enqueueSnackbar(err?.response?.data?.message || err, {
        preventDuplicate: false,
        persist: false,
        variant: 'error'
      });
    } finally {
      dispatch(updateLoading(false));
    }
  };
};
