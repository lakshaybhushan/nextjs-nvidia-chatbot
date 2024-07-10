"use server";

import { createStreamableValue } from "ai/rsc";
import { CoreMessage, streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { rateLimit } from "@/lib/ratelimit";
import { headers } from "next/headers";

const nim = createOpenAI({
  // baseURL: "https://integrate.api.nvidia.com/v1",
  // apiKey: process.env.NVIDIA_NIM_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
});

export async function continueConversation(messages: CoreMessage[], model: string) {

  const ip = headers().get("x-forwarded-for") ?? "unknown";
  const isRateLimited = rateLimit(ip);

  if (isRateLimited) {
    console.log("Rate limited");
    throw new Error("Rate limited");
  }

  const result = await streamText({
    model: nim(model),
    messages,
    temperature: 0.8, // MUST
    topP: 0.7, // MUST
    maxTokens: 1024, // MUST
    // Otherwise, the model will not be able to generate a response
  });

  const stream = createStreamableValue(result.textStream);
  return stream.value;
}
