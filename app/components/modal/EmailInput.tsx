"use client";
import ModalInput from "@/app/components/modal/ModalInput";
import { ForwardedRef, forwardRef } from "react";

const EmailInput = forwardRef(function EmailInput(
  props: unknown,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <ModalInput
      ref={ref}
      type="email"
      placeholder="Email"
      className="w-full rounded border border-neutral-200 p-2 px-3"
    />
  );
});
export default EmailInput;
