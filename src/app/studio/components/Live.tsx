export default function Live() {
  return (
    <div className="fixed top-8 right-12 flex items-center gap-3 bg-primary p-4">
      <span className="w-5 h-5 bg-white rounded-full animate-pulse"></span>
      <p className="uppercase text-4xl font-black text-white">Live</p>
    </div>
  );
}
