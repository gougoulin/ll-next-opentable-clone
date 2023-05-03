"use client";
import { InputHTMLAttributes, forwardRef, ForwardedRef } from "react";

type ModalInputProps = {
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const ModalInput = forwardRef(function ModalInput(
  props: ModalInputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  // const {placeholder, className, type} = props;
  return (
    <div>
      <input ref={ref} {...props} />
      {/*<input ref={ref} type={type} placeholder={placeholder} className={className} />*/}
    </div>
  );
});
export default ModalInput;
