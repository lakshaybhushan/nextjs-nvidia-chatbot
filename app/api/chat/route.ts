import { streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";

export const maxDuration = 30;

const nim = createOpenAI({
  // baseURL: "https://integrate.api.nvidia.com/v1",
  // apiKey: process.env.NVIDIA_NIM_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    // model: nim("google/gemma-2-9b-it"),
    model: nim("llama3-8b-8192"),
    messages,
    temperature: 0.5,
    maxTokens: 512,
    topP: 0.7,
  });

  return result.toAIStreamResponse();
}
