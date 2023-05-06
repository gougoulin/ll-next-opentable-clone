import { Reducer } from "react";
import { User } from "@prisma/client";

export enum AuthReducerAction {
  SIGN_IN = "SIGN_IN",
  SIGN_OUT = "SIGN_OUT",
  LOADING_START = "LOADING_START",
  LOADING_END = "LOADING_END",
  ADD_ERROR = "ADD_ERROR",
  REMOVE_ERROR = "REMOVE_ERROR",
}

interface AuthDto {
  token: string;
  email: string;
  firstName: string;
}

// export type AuthStateAction =
//   | { type: AuthReducerAction.SIGN_IN; payload: AuthDto }
//   | { type: AuthReducerAction.SIGN_OUT }
//   | { type: AuthReducerAction.LOADING_START }
//   | {
//       type: AuthReducerAction.LOADING_END;
//     }
//   | {
//       type: AuthReducerAction.ADD_ERROR;
//       payload: string;
//     }
//   | { type: AuthReducerAction.REMOVE_ERROR };
export type AuthStateAction = {
  type: AuthReducerAction;
  payload?: any;
};

export const authActions = {
  loadingStart(): AuthStateAction {
    return { type: AuthReducerAction.LOADING_START };
  },
  loadingEnd(): AuthStateAction {
    return { type: AuthReducerAction.LOADING_END };
  },
  signIn(user: AuthDto): AuthStateAction {
    return { type: AuthReducerAction.SIGN_IN, payload: user };
  },
  signOut(): AuthStateAction {
    return { type: AuthReducerAction.SIGN_OUT };
  },
  addError(msg: string) {
    return { type: AuthReducerAction.ADD_ERROR, payload: msg };
  },
  removeError() {
    return {
      type: AuthReducerAction.REMOVE_ERROR,
    };
  },
};

export const initialState = {
  isLoading: false,
  user: null,
  error: null,
};

export interface AuthState {
  isLoading: boolean;
  user: AuthDto | null;
  error: string | null;
}

export const authReducer: Reducer<AuthState, AuthStateAction> = (state, action) => {
  switch (action.type) {
    case AuthReducerAction.SIGN_IN:
      return { isLoading: false, user: action.payload, error: null };
    case AuthReducerAction.SIGN_OUT:
      return initialState;
    case AuthReducerAction.LOADING_START:
      return { ...state, isLoading: true };
    case AuthReducerAction.LOADING_END:
      return { ...state, isLoading: false };
    case AuthReducerAction.ADD_ERROR:
      return { ...state, error: action.payload };
    case AuthReducerAction.REMOVE_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
};
