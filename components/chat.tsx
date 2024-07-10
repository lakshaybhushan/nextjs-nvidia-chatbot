"use client";
import { cn } from "@/lib/utils";
import { useChat } from "ai/react";
import { BsNvidia } from "react-icons/bs";
import { useRef, useEffect, useState, useCallback } from "react";
import { FaUserAstronaut } from "react-icons/fa";
import { IoLogoVercel } from "react-icons/io5";
import { marked } from "marked";
import ChatInput from "./chat-input";

export default function Chat() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit: originalHandleSubmit,
  } = useChat();

  const [model, setModel] = useState("llama3-8b-8192");

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      originalHandleSubmit(e, { options: { body: { model } } });
    },
    [originalHandleSubmit, model],
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

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
          model={model}
          setModel={setModel}
          inputRef={inputRef}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      </div>
    );
  }

  return (
    <div className="stretch mx-auto flex w-full max-w-xl flex-col py-[10rem] pt-24">
      {messages.map((m) => (
        <div
          key={m.id}
          className="mb-4 flex items-start whitespace-pre-wrap p-2">
          <div
            className={cn(
              "flex size-8 shrink-0 select-none items-center justify-center rounded-lg",
              m.role === "user"
                ? "border bg-background"
                : "border border-[#628f10] bg-[#74B202] text-primary-foreground",
            )}>
            {m.role === "user" ? <FaUserAstronaut /> : <BsNvidia />}
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: marked(m.content) }}
            className="prose prose-sm ml-6 dark:prose-invert prose-headings:m-0 prose-p:m-0 prose-blockquote:m-0 prose-pre:text-wrap prose-pre:bg-zinc-200 prose-pre:text-primary prose-ol:m-0 prose-ul:m-0 prose-img:m-0 dark:prose-pre:bg-zinc-900"
          />
        </div>
      ))}

      <ChatInput
        input={input}
        model={model}
        setModel={setModel}
        inputRef={inputRef}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
