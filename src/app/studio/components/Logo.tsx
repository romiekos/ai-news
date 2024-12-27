import Image from "next/image";

export default function Logo() {
  return (
    <div className="fixed top-4 left-4 flex flex-col items-center gap-2 p-4">
      <div style={{ background: "linear-gradient(145deg, #8d5881, transparent 30%)" }} className="fixed w-1/2 h-1/2 top-0 left-0 pointer-events-none opacity-70" />
      <Image src="logo.svg" alt="AI News" width={100} height={100} className="relative" />
    </div>
  );
}