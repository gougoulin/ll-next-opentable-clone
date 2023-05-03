"use client";
import Image from "next/image";
import Link from "next/link";
import LoginModal from "@/app/components/modal/LoginModal";
import SignUpModal from "@/app/components/modal/SignUpModal";
import { AuthContext } from "@/app/context/authContext";
import { useContext } from "react";

const NavBar = () => {
  const ctx = useContext(AuthContext);
  return (
    <div className="flex flex-row items-center justify-between py-2 pl-8 pr-4">
      <div className="text-lg font-bold">
        <Link href="/">
          <Image src="/assets/imgs/opentable-logo.svg" width={150} height={50} alt="OpenTable" />
        </Link>
      </div>
      <div className="flex flex-row items-center gap-4 text-sm">
        {ctx.user?.token ? <span>{ctx.user?.email}</span> : <LoginModal />}
        {ctx.user ? (
          <button className="rounded border border-red-500 p-2 px-3 text-red-500">Sign out</button>
        ) : (
          <SignUpModal />
        )}
      </div>
    </div>
  );
};
export default NavBar;
