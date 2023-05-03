"use client";
import { RefObject } from "react";
import ModalInput from "@/app/components/modal/ModalInput";

const ConfirmPasswordInput = ({ ref }: { ref: RefObject<HTMLInputElement> }) => {
  return (
    <ModalInput
      ref={ref}
      type="password"
      placeholder="Confirm password"
      className="w-full rounded border border-neutral-200 p-2 px-3"
    />
  );
};
export default ConfirmPasswordInput;
