"use client";
import { DispatchContext } from "@/app/context/authContext";
import { useContext } from "react";

export default function useAuthDispatch() {
  return useContext(DispatchContext);
}
