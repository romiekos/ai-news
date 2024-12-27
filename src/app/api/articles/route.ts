import { OpenAI } from "openai";
import { devArticles } from "@/app/utils/dev";
import { NextResponse } from "next/server";

import { Article } from "@/app/types";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const dynamic = "force-dynamic";

const topics = {
  gpt: "GPT|LLM|LLMs|Anthropic|OpenAI|Gemini|Claude|Ollama|Meta",
  science: "Science|Brain|Neuroscience|Genetics|Biology|Medicine|Evolution",
  ai: "Artificial intelligence|Machine learning|AI|ML|LLM|LLMs",
  art: "Generative AI|Generative art|AI art|Artificial art|Creativity AI",
  future:
    "Future of AI|AI safety|AI ethics|AI policy|AI regulation|AI governance",
};

type Theme = keyof typeof topics;

const themeKeys = Object.keys(topics);

const getPrompt = (url: string) => `
Based on the article at ${url}, please provide:

A concise summary of the key points (3-5 sentences).
A news script for a brief segment (approximately 30-45 seconds when read aloud), including:

The main facts and developments
Any relevant quotes or statistics
Context or implications, if applicable

Exclude introductory greetings and concluding remarks. Focus solely on delivering the essential information in a clear, engaging manner suitable for a news broadcast. Just start right away with the main facts and developments.
`;

async function fetchArticles(): Promise<Article[]> {
  const articles: Article[] = [];
  const promiseArticles: Promise<any>[] = [];

  themeKeys.forEach(async (theme) => {
    const topic = topics[theme as Theme];
    const shuffleTopics = topic.split("|").sort(() => Math.random() - 0.5).join("|");
    const response = fetch(
      `https://api.thenewsapi.com/v1/news/top?language=en&api_token=${process.env.NEWS_API_KEY}&search=${shuffleTopics}`
    ).then(async (result) => {
      const response = await result.json();
      response.data.forEach((article: Article) => {
        articles.push(article);
      });
      return response;
    });
    promiseArticles.push(response);
  });
  await Promise.all(promiseArticles);
  return articles;
}

const summarizeArticle = async (url: string) => {
  if (!url) return "";
  const prompt = getPrompt(url);
  const response = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "gpt-3.5-turbo",
  });

  const aiResponse = response.choices[0].message.content;
  return aiResponse;
};

async function summarizeArticles(articles: Article[]) {
  const summariesPromise: Promise<any>[] = [];
  articles.forEach(async (article) => {
    const summary = summarizeArticle(article.url).then((summary) => {
      if (summary) {
        article.summary = summary;
      }
    });
    summariesPromise.push(summary);
  });
  await Promise.all(summariesPromise);
  return articles;
}

export async function GET() {
  if (process.env.NODE_ENV === "development") {
    await Promise.resolve((resolve: any) => setTimeout(() => resolve(), 3000));
    return NextResponse.json({ data: devArticles }, { status: 201 });
  }
  try {
    const articles = await fetchArticles();
    const summarizedArticles = await summarizeArticles(articles);

    if (summarizedArticles.length) {
      return NextResponse.json({ data: summarizedArticles }, { status: 201 });
    }
    return NextResponse.json({ data: [] }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ data: [] }, { status: 500 });
  }
}
