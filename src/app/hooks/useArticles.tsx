"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { Article } from "@/app/types";

export function useArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [areArticlesLoading, setAreArticlesLoading] = useState(false);
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  const fetchArticles = async () => {
    setAreArticlesLoading(true);
    const response = await fetch("/api/articles");
    const { data } = await response.json();
    setArticles(data);
    setActiveArticle(data[0]);
    setAreArticlesLoading(false);
  };

  let isFetching = useRef(false);
  useEffect(() => {
    if (isFetching.current) return;
    isFetching.current = true;
    fetchArticles();
  }, []);

  const updateArticleAudioById = (id: string, audio: Blob) => {
    setArticles((prevArticles) => {
      const updatedArticles = prevArticles.map((article) =>
        article.uuid === id ? { ...article, audio } : article
      );
      return updatedArticles;
    });
  };

  const today = useRef(new Date().getDay());

  const setNextActiveArticle = () => {
    const currentDay = new Date().getDay();
    if (currentDay !== today.current) {
      today.current = currentDay;
      fetchArticles();
      return;
    }
    setActiveArticle((prevArticle) => {
      const nextIndex =
        articles.findIndex((article) => article.uuid === prevArticle?.uuid) + 1;
      return articles[nextIndex] ?? articles[0];
    });
  };

  const isArticleLast = useMemo(() => {
    return (
      activeArticle?.uuid &&
      activeArticle?.uuid === articles?.[articles.length - 1]?.uuid
    );
  }, [activeArticle, articles]);

  return {
    articles,
    activeArticle,
    isArticleLast,
    areArticlesLoading,
    setActiveArticle,
    updateArticleAudioById,
    setNextActiveArticle,
  };
}
