"use server";

import { createStreamableValue } from "ai/rsc";
import { CoreMessage, streamText } from "ai";
import { openai, createOpenAI } from "@ai-sdk/openai";

const nim = createOpenAI({
  // baseURL: "https://integrate.api.nvidia.com/v1",
  // apiKey: process.env.NVIDIA_NIM_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
});


export async function continueConversation(messages: CoreMessage[], model:string) {

  const result = await streamText({
    model: nim(model),
    messages,
  });

  const stream = createStreamableValue(result.textStream);
  return stream.value;
}
