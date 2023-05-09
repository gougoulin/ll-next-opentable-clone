"use client";
import { MouseEventHandler, useRef, useState } from "react";
import { Alert, CircularProgress } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";

export default function ReservationCard({
  slug,
  guests,
  bookingTime,
  restaurantId,
}: {
  slug: string;
  guests: number;
  bookingTime: string;
  restaurantId: string;
}) {
  const [errors, setErrors] = useState<string[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [complete, setComplete] = useState<boolean>(false);
  // refs
  const firstNameRef = useRef<null | HTMLInputElement>(null);
  const lastNameRef = useRef<null | HTMLInputElement>(null);
  const emailRef = useRef<null | HTMLInputElement>(null);
  const phoneRef = useRef<null | HTMLInputElement>(null);
  const occasionRef = useRef<null | HTMLInputElement>(null);
  const requestRef = useRef<null | HTMLInputElement>(null);
  const handleSubmit: MouseEventHandler<HTMLButtonElement> = (e) => {
    const errors: string[] = [];
    if (slug.length === 0) {
      throw new Error("Restaurant not found");
    }
    if (firstNameRef.current == null || firstNameRef.current.value.length === 0) {
      errors.push("First name is required");
    }
    if (lastNameRef.current == null || lastNameRef.current.value.length === 0) {
      errors.push("Last name is required");
    }
    if (emailRef.current == null || emailRef.current.value.length === 0) {
      errors.push("Email is required");
    }
    if (phoneRef.current == null || phoneRef.current.value.length === 0) {
      errors.push("Last name is required");
    }
    if (errors.length > 0) {
      setErrors(errors);
      return;
    }
    setErrors(null);
    setComplete(false);
    setLoading(true);
    fetch(`/api/restaurant/${slug}/reserve`, {
      method: "POST",
      body: JSON.stringify({
        guests: +guests,
        bookingEmail: emailRef?.current && emailRef?.current.value,
        bookingPhone: phoneRef?.current && phoneRef.current.value,
        bookingFirstName: firstNameRef?.current && firstNameRef.current.value,
        bookingLastName: lastNameRef?.current && lastNameRef?.current.value,
        bookingTime: dayjs(bookingTime).toString(),
        bookingRequest: requestRef?.current == null ? "" : requestRef.current.value,
        restaurantId,
      }),
    })
      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
          setErrors(null);
          setComplete(true);
        } else {
          setErrors([`${res.status} ${res.statusText}`]);
        }
        return res.json();
      })
      .then((data) => {
        // console.log(data);
      })
      .catch((err) => {
        setErrors([err.message]);
      });
  };
  return (
    <>
      <div className={"mb-10 mt-10 flex flex-row flex-wrap gap-4"}>
        <input
          ref={firstNameRef}
          placeholder="First name"
          className={"mb-4 w-full rounded border p-3 xl:w-[49%]"}
          type="text"
        />
        <input
          ref={lastNameRef}
          placeholder="Last name"
          className={"mb-4 w-full rounded border p-3 xl:w-[49%]"}
          type="text"
        />
        <input
          ref={emailRef}
          placeholder="Email"
          className={"mb-4 w-full rounded border p-3 xl:w-[49%]"}
          type="text"
        />
        <input
          ref={phoneRef}
          placeholder="Phone"
          className={"mb-4 w-full rounded border p-3 xl:w-[49%]"}
          type="text"
        />
        <input
          ref={occasionRef}
          placeholder="Occasion (optional)"
          className={"mb-4 w-full rounded border p-3 xl:w-[49%]"}
          type="text"
        />
        <input
          ref={requestRef}
          placeholder="Requests (optional)"
          className={"mb-4 w-full rounded border p-3 xl:w-[49%]"}
          type="text"
        />
        <div className="w-full">
          <button
            onClick={handleSubmit}
            type="submit"
            className={"text-bold w-full rounded border bg-red-500 p-3 text-white"}
          >
            {loading ? <CircularProgress size={16} color="inherit" /> : "Complete reservation"}
          </button>
        </div>
        <div className="flex w-full flex-col gap-1">
          {complete && <Alert severity="success">Success</Alert>}
          {errors &&
            errors.map((it) => {
              return (
                <Alert key={`${it}`} severity="error">
                  {it}
                </Alert>
              );
            })}
        </div>
      </div>
    </>
  );
}
