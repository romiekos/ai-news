import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  const { text } = await request.json();
  const cleaupTranscript = text.replace(/[^a-zA-Z ]/g, "");
  const mp3 = await openai.audio.speech.create({
    model: "tts-1",
    voice: "nova",
    input: cleaupTranscript,
  });

  const buffer = await mp3.arrayBuffer();
  const blob = new Blob([buffer], { type: "audio/mpeg" });
  return new Response(blob);
}
