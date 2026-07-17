"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "ai/react";
import { AgentSelector } from "./AgentSelector";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/app/lib/utils";
import {
  Send,
  Bot,
  User,
  Loader2,
  Sparkles,
  Shield,
} from "lucide-react";
import { getAgentById } from "@/app/lib/agents";

export function ChatInterface() {
  const [selectedAgent, setSelectedAgent] = useState("orion");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/chat",
      body: { agentId: selectedAgent },
    });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const agent = getAgentById(selectedAgent);

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-4">
      {/* Agent Sidebar */}
      <div className="hidden w-64 shrink-0 flex-col rounded-lg border border-border bg-surface lg:flex">
        <div className="border-b border-border p-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-cyan" />
            <span className="text-xs font-bold text-slate-200">
              AI Agent Console
            </span>
          </div>
          <p className="mt-1 text-[10px] font-mono text-slate-600">
            Multi-agent intelligence orchestration
          </p>
        </div>
        <AgentSelector
          selectedAgent={selectedAgent}
          onSelect={setSelectedAgent}
        />
        <div className="mt-auto border-t border-border p-3">
          <div className="rounded-md bg-surface-elevated/50 p-2.5">
            <p className="text-[10px] font-mono text-slate-500">
              ACTIVE: {agent?.codename}
            </p>
            <p className="mt-1 text-[10px] text-slate-600">
              {agent?.description}
            </p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex flex-1 flex-col rounded-lg border border-border bg-surface">
        {/* Chat Header */}
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="flex items-center gap-2">
            <Bot className="h-4 w-4 text-cyan" />
            <span className="text-xs font-bold text-slate-200">
              {agent?.name} ({agent?.codename})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-3 w-3 text-emerald-400" />
            <span className="text-[10px] font-mono text-emerald-400">
              ENCRYPTED
            </span>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 px-4">
          <div className="space-y-4 py-4">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-slate-600">
                <Bot className="h-12 w-12 mb-4 opacity-20" />
                <p className="text-sm font-mono">
                  {agent?.name} is ready for intelligence queries
                </p>
                <p className="mt-1 text-xs text-slate-700">
                  Ask about crisis analysis, threat assessment, or resource deployment
                </p>
              </div>
            )}
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {message.role === "assistant" && (
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-cyan/10">
                    <Bot className="h-4 w-4 text-cyan" />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg px-3 py-2",
                    message.role === "user"
                      ? "bg-cyan/10 text-slate-200"
                      : "bg-surface-elevated text-slate-300"
                  )}
                >
                  <p className="text-xs leading-relaxed whitespace-pre-wrap">
                    {message.content}
                  </p>
                  {message.role === "assistant" && (
                    <div className="mt-1.5 flex items-center gap-2 border-t border-border pt-1.5">
                      <span className="text-[9px] font-mono text-slate-600">
                        {agent?.codename}
                      </span>
                      <span className="text-slate-700">|</span>
                      <span className="text-[9px] font-mono text-cyan/60">
                        CONF: 94%
                      </span>
                    </div>
                  )}
                </div>
                {message.role === "user" && (
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-surface-elevated">
                    <User className="h-4 w-4 text-slate-400" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center gap-2 text-slate-600">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-xs font-mono">
                  {agent?.codename} analyzing...
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="border-t border-border p-3">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              value={input}
              onChange={handleInputChange}
              placeholder={`Query ${agent?.name}...`}
              className="flex-1 rounded-md border border-border bg-abyss px-3 py-2 text-xs text-slate-200 placeholder:text-slate-600 focus:border-cyan/30 focus:outline-none focus:ring-1 focus:ring-cyan/20"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="flex items-center gap-1.5 rounded-md bg-cyan/10 px-3 py-2 text-xs font-mono text-cyan transition-all hover:bg-cyan/20 disabled:opacity-50"
            >
              <Send className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">SEND</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
