"use client";
import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.log(error);
    return () => {};
  }, [error]);

  return (
    <div>
      <h2>Sorry, something goes wrong</h2>
      <div>
        <Link href="/">Return to home</Link>
      </div>
    </div>
  );
}
