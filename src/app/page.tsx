"use client";
import { useState } from "react";
import { Send, Bot, User } from "lucide-react";

export default function Home() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setIsTyping(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      if (data.error) {
        setResponse(`Error: ${data.error}`);
      } else {
        setResponse(data.reply);
      }
    } catch (error) {
      console.error("Error:", error);
      setResponse(
        `Error: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Dark futuristic background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>

      {/* Animated circuit pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ff88_1px,transparent_1px),linear-gradient(to_bottom,#00ff88_1px,transparent_1px)] bg-[size:32px_32px] opacity-10 animate-pulse"></div>

      {/* Matrix-style rain effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,255,136,0.1)_50%,transparent_100%)] animate-pulse"></div>

      {/* Glowing energy orbs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
      <div
        className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full filter blur-3xl opacity-25 animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full filter blur-3xl opacity-20 animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

      {/* Scanning lines */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent h-1 animate-pulse"></div>
      <div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/5 to-transparent w-1 animate-pulse"
        style={{ animationDelay: "0.5s" }}
      ></div>

      <main className="relative flex flex-col items-center justify-center min-h-screen p-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500 blur-2xl opacity-60 animate-pulse"></div>
              <div
                className="absolute inset-0 bg-cyan-500 blur-xl opacity-40 animate-pulse"
                style={{ animationDelay: "0.5s" }}
              ></div>
              <Bot
                className="relative w-20 h-20 text-emerald-400 drop-shadow-2xl"
                strokeWidth={1.5}
              />
              <div
                className="absolute -inset-4 border border-emerald-500/30 rounded-full animate-spin"
                style={{ animationDuration: "8s" }}
              ></div>
              <div
                className="absolute -inset-2 border border-cyan-500/20 rounded-full animate-spin"
                style={{
                  animationDuration: "12s",
                  animationDirection: "reverse",
                }}
              ></div>
            </div>
          </div>
          <h1 className="text-7xl font-black bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4 drop-shadow-2xl tracking-tight">
            Adrian's AI Assistant
          </h1>
          
        </div>

        {/* Chat Container */}
        <div className="relative w-full max-w-4xl">
          {/* Outer glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 rounded-3xl blur-lg opacity-30 animate-pulse"></div>
          <div
            className="absolute -inset-2 bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 rounded-3xl blur-xl opacity-20 animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>

          {/* Main container */}
          <div className="relative backdrop-blur-2xl bg-black/40 rounded-3xl border border-emerald-500/30 shadow-2xl overflow-hidden">
            {/* Animated border */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-blue-500/20 rounded-3xl animate-pulse"></div>
            <div className="absolute inset-[1px] bg-black/60 rounded-3xl"></div>
            {/* Messages Display */}
            <div className="relative min-h-[500px] max-h-[600px] overflow-y-auto p-8 space-y-6">
              {/* Holographic overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 via-transparent to-cyan-500/5 pointer-events-none"></div>
              {response && (
                <>
                  {/* User Message */}
                  <div className="flex justify-end items-start gap-4 animate-in slide-in-from-right duration-500">
                    <div className="relative max-w-[75%]">
                      <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl blur-sm opacity-30"></div>
                      <div className="relative bg-gradient-to-r from-emerald-900/40 to-cyan-900/40 backdrop-blur-xl rounded-2xl rounded-tr-sm p-5 border border-emerald-500/40 shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-2xl"></div>
                        <p className="relative text-emerald-100 text-sm leading-relaxed font-mono tracking-wide">
                          {input}
                        </p>
                      </div>
                    </div>
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center relative shadow-2xl">
                      <div className="absolute inset-0 bg-emerald-400 rounded-full blur-lg opacity-60 animate-pulse"></div>
                      <User className="relative w-5 h-5 text-black font-bold" />
                    </div>
                  </div>

                  {/* AI Response */}
                  <div className="flex justify-start items-start gap-4 animate-in slide-in-from-left duration-500">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center relative shadow-2xl">
                      <div className="absolute inset-0 bg-purple-400 rounded-full blur-lg opacity-60 animate-pulse"></div>
                      <div
                        className="absolute -inset-2 border border-purple-500/30 rounded-full animate-spin"
                        style={{ animationDuration: "3s" }}
                      ></div>
                      <Bot className="relative w-5 h-5 text-white" />
                    </div>
                    <div className="relative max-w-[75%]">
                      <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-sm opacity-30"></div>
                      <div className="relative bg-gradient-to-r from-purple-900/40 to-pink-900/40 backdrop-blur-xl rounded-2xl rounded-tl-sm p-5 border border-purple-500/40 shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl"></div>
                        <p className="relative text-purple-100 text-sm leading-relaxed font-mono tracking-wide">
                          {response}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {!response && (
                <div className="flex items-center justify-center h-[500px] text-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-blue-500/20 blur-2xl"></div>
                    <div className="relative">
                      <div className="relative mb-8">
                        <div className="absolute inset-0 bg-emerald-500 blur-xl opacity-40 animate-pulse"></div>
                        <Bot
                          className="relative w-24 h-24 text-emerald-400/60 mx-auto drop-shadow-2xl"
                          strokeWidth={1}
                        />
                        <div
                          className="absolute -inset-4 border border-emerald-500/20 rounded-full animate-spin"
                          style={{ animationDuration: "6s" }}
                        ></div>
                      </div>
                      <div className="space-y-3">
                        <p className="text-emerald-300/70 text-xl font-mono tracking-wider">
                          [INITIALIZING_NEURAL_PROTOCOL]
                        </p>
                        <p className="text-emerald-400/50 text-sm font-mono tracking-[0.2em]">
                          AWAITING QUANTUM INPUT SIGNAL...
                        </p>
                        <div className="flex justify-center gap-2 mt-4">
                          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                          <div
                            className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"
                            style={{ animationDelay: "0.3s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"
                            style={{ animationDelay: "0.6s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {isTyping && (
                <div className="flex justify-start items-start gap-4 animate-in slide-in-from-left duration-500">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center relative shadow-2xl">
                    <div className="absolute inset-0 bg-purple-400 rounded-full blur-lg opacity-60 animate-pulse"></div>
                    <div
                      className="absolute -inset-2 border border-purple-500/30 rounded-full animate-spin"
                      style={{ animationDuration: "2s" }}
                    ></div>
                    <Bot className="relative w-5 h-5 text-white" />
                  </div>
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-sm opacity-30"></div>
                    <div className="relative bg-gradient-to-r from-purple-900/40 to-pink-900/40 backdrop-blur-xl rounded-2xl rounded-tl-sm p-5 border border-purple-500/40 shadow-2xl">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl"></div>
                      <div className="relative flex gap-2">
                        <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-3 h-3 bg-pink-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="w-3 h-3 bg-purple-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="relative p-8 bg-gradient-to-r from-black/60 via-gray-900/40 to-black/60 backdrop-blur-xl border-t border-emerald-500/30">
              {/* Animated border */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-blue-500/10"></div>
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent animate-pulse"></div>

              <div className="relative flex gap-4">
                <div className="flex-1 relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl blur-sm opacity-30"></div>
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="relative w-full bg-black/60 text-emerald-100 placeholder-emerald-400/50 border border-emerald-500/40 rounded-2xl px-6 py-5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/70 resize-none transition-all duration-500 font-mono tracking-wide shadow-2xl backdrop-blur-xl"
                    placeholder="[ENTER_QUANTUM_COMMAND]..."
                    rows={3}
                  />
                </div>
                <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 rounded-3xl blur-lg opacity-40 animate-pulse"></div>
                  <button
                    onClick={sendMessage}
                    disabled={!input.trim() || isTyping}
                    className="relative flex-shrink-0 w-16 h-16 bg-gradient-to-br from-emerald-500 to-cyan-600 hover:from-emerald-400 hover:to-cyan-500 disabled:from-gray-700 disabled:to-gray-800 disabled:cursor-not-allowed rounded-3xl flex items-center justify-center transition-all duration-500 hover:scale-110 active:scale-95 shadow-2xl hover:shadow-emerald-500/50 group"
                  >
                    <div className="absolute inset-0 bg-emerald-400 rounded-3xl blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
                    <Send className="relative w-6 h-6 text-black font-bold drop-shadow-lg" />
                  </button>
                </div>
              </div>
              <div className="relative mt-4 text-center text-emerald-400/60 text-xs font-mono tracking-[0.2em]">
                [ENTER] TO TRANSMIT • [SHIFT+ENTER] FOR MULTILINE •
                [QUANTUM_SYNC_ACTIVE]
              </div>
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="relative mt-8 flex items-center justify-center gap-4 text-emerald-400/70 text-sm font-mono">
          <div className="relative flex items-center gap-2">
            <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50"></div>
            <div
              className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div
              className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 blur-sm"></div>
            <span className="relative tracking-[0.3em] font-bold">
              [QUANTUM_NETWORK_ONLINE]
            </span>
          </div>
          <div className="relative flex items-center gap-2">
            <div
              className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"
              style={{ animationDelay: "1.5s" }}
            ></div>
            <div
              className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"
              style={{ animationDelay: "2s" }}
            ></div>
            <div
              className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50"
              style={{ animationDelay: "2.5s" }}
            ></div>
          </div>
        </div>
      </main>
    </div>
  );
}
