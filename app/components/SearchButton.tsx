"use client";
import { useRef } from "react";
import { useRouter } from "next/navigation";

const SearchButton = ({ buttonText }: { buttonText: string }) => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSearch = () => {
    if (inputRef.current != null && inputRef.current.value !== "") {
      let q = inputRef.current.value;
      router.push(`/search?q=${q.toLowerCase()}`);
      inputRef.current.value = "";
    }
  };
  return (
    <>
      <div>
        <input ref={inputRef} className="min-w-[300px] rounded px-2 py-3" type="text" />
      </div>
      <div>
        <button onClick={handleSearch} className="rounded bg-red-600 px-8 py-3 text-white">
          {buttonText}
        </button>
      </div>
    </>
  );
};
export default SearchButton;
