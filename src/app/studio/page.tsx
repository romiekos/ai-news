import Studio from "./components/Studio";
import Logo from "./components/Logo";
import Live from "./components/Live";

export default function StudioPage() {
  return (
    <div className="w-screen h-screen bg-tertiary fade-in">
      <Studio />
      <Logo />
      <Live />
    </div>
  );
}
