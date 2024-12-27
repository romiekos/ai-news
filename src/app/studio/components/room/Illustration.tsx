import { useEffect, useState } from "react";

import { Article } from "@/app/types";

export default function Illustration({
  image,
  activeArticle,
}: {
  image: string;
  activeArticle: Article;
}) {
  const [illustration, setIllustration] = useState<string | null>(null);

  function checkImageSize(url: string) {
    const image = new Image();
    image.src = url;

    image.onload = () => {
      if (!image.width || image.width < 200) {
        setIllustration(null);
      } else {
        setIllustration(image.src);
      }
    };
  }
  useEffect(() => {
    setIllustration(null);
    checkImageSize(image);
  }, [image]);

  return (
    <div className="fixed right-12 w-1/2 h-[82%] top-8">
      {illustration ? (
        <img
          className="min-w-full min-h-full object-cover"
          src={illustration}
          alt="illustration"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-primary p-12 text-white text-center">
          <h1 className="text-6xl font-bold">{activeArticle.title}</h1>
        </div>
      )}
    </div>
  );
}
