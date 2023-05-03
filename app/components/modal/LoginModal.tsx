"use client";
import ModalBase from "@/app/components/modal/ModalBase";
import EmailInput from "@/app/components/modal/EmailInput";
import PasswordInput from "@/app/components/modal/PasswordInput";
import { MouseEventHandler, useContext, useRef } from "react";
import { AuthContext, DispatchContext } from "@/app/context/authContext";
import { authActions } from "@/app/reducer/authReducer";
import { signIn } from "@/app/hooks/useAuth";

export default function LoginModal() {
  const dispatch = useContext(DispatchContext);
  const { isLoading, error } = useContext(AuthContext);
  // ref to input fields
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  // modal main content
  const mainContent = (
    <>
      <EmailInput ref={emailInputRef} />
      <PasswordInput placeholder="Password" ref={passwordInputRef} />
    </>
  );
  // footer element
  const footer = <></>;
  // event handlers
  const onSubmit: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (dispatch == null) throw new Error("dispatch is not defined");
    if (emailInputRef.current == null) return;
    if (passwordInputRef.current == null) return;
    if (emailInputRef.current.value === "") {
      dispatch(authActions.addError("Email is required") as any);
      return;
    }
    if (passwordInputRef.current.value === "") {
      dispatch(authActions.addError("Password is required") as any);
      return;
    }
    // remove current errors to prevent it from showing
    dispatch(authActions.removeError());
    dispatch(authActions.loadingStart());
    // before sending sign in request
    const user = await signIn({
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
    });
    // after loading
    dispatch(authActions.loadingEnd());
    if (user !== null) dispatch(authActions.signIn({ email: user.email, token: user.token }));
  };
  return (
    <ModalBase
      isLocked={false}
      isLoading={isLoading}
      errorMsg={error}
      primaryTitle="log in"
      secondaryTitle="log into your account"
      buttonText="log in"
      controlButtonText="log in"
      formButtonText="log in"
      mainContent={mainContent}
      footer={footer}
      onSubmit={onSubmit}
    />
  );
}
