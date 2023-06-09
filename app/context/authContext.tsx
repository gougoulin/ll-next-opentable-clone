"use client";
import { createContext, useReducer, ReactNode, Dispatch } from "react";
import { authReducer, AuthState, AuthStateAction, initialState } from "@/app/reducer/authReducer";
import useMe from "@/app/hooks/useMe";

export const AuthContext = createContext<AuthState>(initialState);
export const DispatchContext = createContext<Dispatch<AuthStateAction> | null>(null);
const AuthContextWrapper = ({ children }: { children: ReactNode }) => {
  const [authState, dispatch] = useReducer(authReducer, initialState);
  useMe(dispatch);
  return (
    <AuthContext.Provider value={authState}>
      <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
    </AuthContext.Provider>
  );
};
export default AuthContextWrapper;
