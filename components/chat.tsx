"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { type CoreMessage } from "ai";
import Markdown from "react-markdown";
import { BsNvidia } from "react-icons/bs";
import ChatInput from "./chat-input";
import { readStreamableValue } from "ai/rsc";
import { FaUserAstronaut } from "react-icons/fa6";
import { IoLogoVercel } from "react-icons/io5";
import { continueConversation } from "../app/actions";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

export default function Chat() {
  const [messages, setMessages] = useState<CoreMessage[]>([]);
  const [input, setInput] = useState("");
  const [model, setModel] = useState("llama3-8b-8192");

  const handleModelChange = (newModel: string) => {
    setModel(newModel);
    setMessages([]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim().length === 0) return;

    const newMessages: CoreMessage[] = [
      ...messages,
      { content: input, role: "user" },
    ];

    setMessages(newMessages);
    setInput("");

    const result = await continueConversation(newMessages, model);

    for await (const content of readStreamableValue(result)) {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: content as string,
        },
      ]);
    }
  };

  if (messages.length === 0) {
    return (
      <div className="stretch mx-auto flex w-full max-w-xl flex-col items-center py-24">
        <h1 className="text-center text-5xl font-bold tracking-tighter">
          Nvidia NIM + Vercel AI SDK Chatbot Demo
        </h1>

        <div className="mt-6 flex items-center justify-center gap-4">
          <BsNvidia className="mr-4 size-20 text-[#74B202]" />
          <span className="text-8xl">+</span>
          <IoLogoVercel className="size-20" />
        </div>

        <ChatInput
          input={input}
          setInput={setInput}
          handleSubmit={handleSubmit}
          model={model}
          handleModelChange={handleModelChange}
        />
      </div>
    );
  }

  return (
    <div className="stretch mx-auto flex w-full max-w-xl flex-col py-[8rem] pt-24">
      {messages.map((m, i) => (
        <div key={i} className="items-strart mb-4 flex whitespace-pre-wrap p-2">
          <div
            className={cn(
              "flex size-8 shrink-0 select-none items-center justify-center rounded-lg",
              m.role === "user"
                ? "border bg-background"
                : "border border-[#628f10] bg-[#74B202] text-primary-foreground",
            )}>
            {m.role === "user" ? <FaUserAstronaut /> : <BsNvidia />}
          </div>
          <Markdown className="prose prose-sm ml-6 dark:prose-invert prose-headings:m-0 prose-p:m-0 prose-blockquote:m-0 prose-pre:text-wrap prose-pre:bg-zinc-200 prose-pre:text-primary prose-ol:m-0 prose-ul:m-0 prose-img:m-0 dark:prose-pre:bg-zinc-900">
            {m.content as string}
          </Markdown>
        </div>
      ))}

      <ChatInput
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
        model={model}
        handleModelChange={handleModelChange}
      />
    </div>
  );
}
