function Chick() {
  return <div className="w-3 h-3 bg-primary opacity-50 rounded-full"></div>;
}

export default function Chicks() {
  return (
    <div className="absolute text-[120px] font-thin flex justify-between items-center top-[55%] left-1/2 -translate-x-1/2 z-50 w-[320px]">
      <Chick />
      <Chick />
    </div>
  );
}
