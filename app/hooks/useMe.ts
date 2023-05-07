"use client";

import { Dispatch, useContext, useEffect } from "react";
import { authActions } from "@/app/reducer/authReducer";

export default function useMe(dispatch: Dispatch<any>) {
  useEffect(() => {
    const abortController = new AbortController();
    dispatch(authActions.loadingStart());
    fetch("/api/auth/me", {
      signal: abortController.signal,
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          return null;
        }
      })
      .then((data) => {
        console.log({data})
        if (data != null) {
          dispatch &&
            dispatch(
              authActions.signIn({
                email: data?.email,
                token: data?.token,
                firstName: data?.firstName,
              })
            );
        }
      })
      .catch((err) => {
        console.error(err.message);
      })
      .finally(() => {
        dispatch(authActions.loadingEnd());
      });
    return () => {
      abortController.abort("NavBar component is unmounted");
    };
  }, [dispatch]);
}
