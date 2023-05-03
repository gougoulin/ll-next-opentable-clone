"use client";

import SearchButton from "@/app/components/SearchButton";

const Hero = () => {
  return (
    <div className="bg-cyan-800">
      <div className="flex flex-row justify-center gap-4 py-4">
        <SearchButton buttonText="Find a table" />
      </div>
    </div>
  );
};
export default Hero;
