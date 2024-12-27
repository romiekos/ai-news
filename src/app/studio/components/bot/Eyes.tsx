import { useEffect, useState, useRef } from "react";

const emotions: {
  [key: string]: string;
} = {
  open: "o",
  close: "-",
  happy: "^",
  sad: "v",
  angry: ">",
  neutral: "<",
  surprised: "o",
  disgusted: "x",
  fearful: "X",
};
function Eye({ emotion }: { emotion: string }) {
  return (
    <div className="relative text-primary">
      {emotion === "open" ? (
        <div className="w-[38px] h-[48px] bg-primary translate-y-[20px] rounded-full"></div>
      ) : (
        emotions[emotion]
      )}
    </div>
  );
}

export function Eyes() {
  const [emotion, setEmotion] = useState("open");

  const blink = () => {
    setEmotion("close");
    setTimeout(() => {
      setEmotion("open");
    }, 300);
    setTimeout(() => {
      blink();
    }, Math.random() * 5000 + 1000);
  };

  const isInitied = useRef(false);
  useEffect(() => {
    if (!isInitied.current) {
      blink();
      isInitied.current = true;
    }
  }, []);

  return (
    <div className="absolute text-[120px] font-thin flex justify-between items-center top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/3 z-50 w-[240px]">
      <Eye emotion={emotion} />
      <Eye emotion={emotion} />
    </div>
  );
}
