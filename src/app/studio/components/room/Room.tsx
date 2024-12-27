import { Article } from "@/app/types";
import Illustration from "./Illustration";
import Stripe from "./Stripe";
import Background from "./Background";

type RoomProps = {
  articles: Article[];
  activeArticle: Article | null;
};
export default function Room({ articles, activeArticle }: RoomProps) {
  return (
    <div>
      {activeArticle ? (
        <>
          <Background imageUrl={activeArticle.image_url} />
          <Illustration
            image={activeArticle.image_url}
            activeArticle={activeArticle}
          />
          <Stripe activeArticle={activeArticle} articles={articles} />
        </>
      ) : null}
    </div>
  );
}
