"use client";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import SearchButton from "@/app/components/SearchButton";

const Header = () => {
  return (
    <header>
      <div className="bg-gradient-to-r from-sky-900 to-cyan-700 py-16">
        <h2 className="mb-5 text-center text-4xl font-bold text-white">
          Find your table for any occasion
        </h2>
        <div className="flex flex-row justify-center gap-4">
          <div>
            {/*<input className="w-72 rounded py-3" type="date" />*/}
            {/*<input className="rounded py-3" type="time" />*/}
            {/*<select className="rounded-r py-3">*/}
            {/*  <option>2 people</option>*/}
            {/*</select>*/}
          </div>
          <SearchButton buttonText="Let's go" />
        </div>
      </div>
    </header>
  );
};
export default Header;
