import Image from "next/image";

export default function Transition({ persist }: { persist: boolean }) {
  return (
    <div className={`fixed flex justify-center items-center top-0 left-0 bg-tertiary w-screen h-screen z-50 ${!persist ? "transitioning" : ""}`}>
      <Image src="/logo.svg" alt="transition" width={140} height={140} />
    </div>
  );
}
