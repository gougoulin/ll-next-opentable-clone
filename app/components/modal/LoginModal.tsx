"use client";
import ModalBase from "@/app/components/modal/ModalBase";
import EmailInput from "@/app/components/modal/EmailInput";
import PasswordInput from "@/app/components/modal/PasswordInput";
import { MouseEventHandler, useContext, useRef } from "react";
import { AuthContext, DispatchContext } from "@/app/context/authContext";
import { authActions } from "@/app/reducer/authReducer";
import { signIn } from "@/app/hooks/useAuth";
import validator from "validator";
import { useRouter } from "next/navigation";

export default function LoginModal() {
  const dispatch = useContext(DispatchContext);
  const { isLoading, error } = useContext(AuthContext);
  // ref to input fields
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
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
    const dto = {
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
    };
    if (!validator.isEmail(dto.email)) {
      dispatch(authActions.addError("Valid email is required"));
      return;
    }
    // remove current errors to prevent it from showing
    dispatch(authActions.removeError());
    dispatch(authActions.loadingStart());
    // before sending sign in request
    const user = await signIn(dto);
    // after loading
    dispatch(authActions.loadingEnd());
    if (user !== null) {
      dispatch(
        authActions.signIn({ email: user.email, token: user.token, firstName: user.firstName })
      );
      router.refresh();
    } else {
      dispatch(authActions.addError("Invalid email / password"));
    }
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
