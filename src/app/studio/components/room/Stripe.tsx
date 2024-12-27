import { Article } from "@/app/types";

type StripeProps = {
  activeArticle: Article;
  articles: Article[];
};

export default function Stripe({ activeArticle, articles }: StripeProps) {
  return (
    <div className="fixed bottom-0 left-0 z-50">
      <div className="flex items-center bg-white py-3 px-6 w-full text-3xl gap-4">
        <h3 className="font-light uppercase max-w-[19vw] truncate">{activeArticle.source}</h3>
        <span>|</span>
        <p className="font-black text-nowrap max-w-[78vw] truncate">{activeArticle.title}</p>
      </div>
      <div className="bg-primary text-white text-nowrap p-3 overflow-hidden">
        <div className="flex scroll text-nowrap">
          {articles.map((article, index) => (
            <span className="flex gap-2 text-4xl font-black mx-[50px] min-w-fit uppercase" key={index}>
              <span className="font-light">{article.source}: </span>
              {article.title}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
