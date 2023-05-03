"use client";
import ModalBase from "@/app/components/modal/ModalBase";
import PasswordInput from "@/app/components/modal/PasswordInput";
import EmailInput from "@/app/components/modal/EmailInput";
import { useRef, MouseEventHandler } from "react";
import ConfirmPasswordInput from "@/app/components/modal/ConfirmPasswordInput";
import ModalInput from "@/app/components/modal/ModalInput";

const SignUpModal = () => {
  // input fields references
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const confirmPasswordInputRef = useRef<HTMLInputElement>(null);
  const firstNameInputRef = useRef<HTMLInputElement>(null);
  const lastNameInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const cityInputRef = useRef<HTMLInputElement>(null);
  // modal main content
  const mainContent = (
    <>
      <div className="flex flex-row justify-between gap-1">
        <input
          ref={firstNameInputRef}
          type="text"
          placeholder="First name"
          className="w-[49%] rounded border border-neutral-200 p-2 px-3"
        />
        <input
          ref={lastNameInputRef}
          type="text"
          placeholder="Last name"
          className="w-[49%] rounded border border-neutral-200 p-2 px-3"
        />
      </div>
      <EmailInput ref={emailInputRef} />
      <PasswordInput ref={passwordInputRef} placeholder="Password" />
      <PasswordInput ref={confirmPasswordInputRef} placeholder="Confirm password" />
      <div className="flex flex-row justify-between gap-1">
        <input
          ref={phoneInputRef}
          type="text"
          placeholder="Phone"
          className="w-[49%] rounded border border-neutral-200 p-2 px-3"
        />
        <input
          ref={cityInputRef}
          type="text"
          placeholder="City"
          className="w-[49%] rounded border border-neutral-200 p-2 px-3"
        />
      </div>
    </>
  );
  // modal footer
  const footer = <></>;
  // handlers
  const handleSubmit: MouseEventHandler<HTMLButtonElement> = (e): void => {
    // prevent default behaviour
    e.preventDefault();
    e.stopPropagation();
    // prepare data to send
    const token = "token";
    const body = {
      email: emailInputRef.current?.value,
      password: passwordInputRef.current?.value,
      repeatPassword: confirmPasswordInputRef.current?.value,
      firstName: firstNameInputRef.current?.value,
      lastName: lastNameInputRef.current?.value,
      phone: phoneInputRef.current?.value,
      city: cityInputRef.current?.value,
    };
    // sending data
    fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (res.status === 201) {
          console.log("success");
        }
        return res.json();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ModalBase
      primaryTitle="sign up"
      secondaryTitle="create your account"
      mainContent={mainContent}
      footer={footer}
      buttonText="sign up"
      controlButtonText="sign up"
      formButtonText="sign up"
      onSubmit={handleSubmit}
    />
  );
};
export default SignUpModal;
