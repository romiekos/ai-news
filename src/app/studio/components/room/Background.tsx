export default function Background({ imageUrl }: { imageUrl: string }) {
  return (
    <img
      src={imageUrl}
      alt={imageUrl}
      width={100}
      height={1000}
      className="fixed top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] w-screen h-screen scale-110 blur-[80px] opacity-50"
    />
  );
}
