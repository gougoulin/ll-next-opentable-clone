"use client";
import { ForwardedRef, forwardRef } from "react";
import ModalInput from "@/app/components/modal/ModalInput";

const PasswordInput = forwardRef(function PasswordInput(
  { placeholder }: { placeholder: string },
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <ModalInput
      ref={ref}
      type="password"
      placeholder={placeholder}
      className="w-full rounded border border-neutral-200 p-2 px-3"
    />
  );
});
export default PasswordInput;
