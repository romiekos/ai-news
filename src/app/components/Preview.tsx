"use client";
import Image from "next/image";
import Link from "next/link";

export function Preview() {
  return (
    <Link
      className="fixed flex items-center justify-center h-screen w-screen bg-tertiary z-50"
      href="/studio"
    >
      <div className="flex flex-col items-center justify-center gap-2">
        <Image src="logo.svg" alt="AI News" width={140} height={140} />
        <h2 className="uppercase text-4xl font-black mt-4 animate-pulse max-w-[140px]">Live will start soon</h2>
      </div>
    </Link>
  );
}
