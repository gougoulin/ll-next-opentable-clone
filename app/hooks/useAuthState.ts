"use client";
import { useContext } from "react";
import { AuthContext } from "@/app/context/authContext";
import { AuthState } from "@/app/reducer/authReducer";

export default function useAuthState() {
  return useContext<AuthState>(AuthContext);
}
