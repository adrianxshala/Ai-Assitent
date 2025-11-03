"use client";
import { useState, useEffect, useRef } from "react";
import { Send, Bot } from "lucide-react";
import { Message } from "@/types/message";
import { personalInfo } from "@/config/personal-info";

export default function Home() {
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Matrix code rain animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Matrix characters
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?";
    const charArray = chars.split("");

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = [];

    // Initialize drops
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * canvas.height;
    }

    const draw = () => {
      // Black background with slight transparency for trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#00FF41";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = charArray[Math.floor(Math.random() * charArray.length)];
        const x = i * fontSize;
        const y = drops[i];

        // Bright head of the stream
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText(char, x, y);

        // Green trail
        ctx.fillStyle = "#00FF41";
        ctx.fillText(char, x, y - fontSize);
        ctx.fillText(char, x, y - fontSize * 2);

        // Darker trail
        ctx.fillStyle = "#003B00";
        ctx.fillText(char, x, y - fontSize * 3);
        ctx.fillText(char, x, y - fontSize * 4);

        // Reset drop to top randomly
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i] += fontSize;
      }
    };

    const interval = setInterval(draw, 50);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  // Initialize loading state - no longer loading messages from database
  useEffect(() => {
    setIsLoadingMessages(false);
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Store the message content before clearing input
    const messageContent = input.trim();
    
    // Clear input field immediately for better UX
    setInput("");

    setIsTyping(true);
    try {
      // First, store the message in the database
      const messageRes = await fetch("/api/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: messageContent,
        }),
        credentials: "include",
      });

      if (!messageRes.ok) {
        console.warn("Failed to save message to database:", messageRes.status);
      } else {
        const messageData = await messageRes.json();
        console.log("Message saved successfully:", messageData);
        setMessages((prev) => [messageData.message, ...prev]);
      }

      // Then get AI response
      const chatRes = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: messageContent }),
      });

      if (!chatRes.ok) {
        throw new Error(`HTTP error! status: ${chatRes.status}`);
      }

      const chatData = await chatRes.json();
      if (chatData.error) {
        // Handle error - could show error message in UI
        console.error("Chat error:", chatData.error);
      } else {
        // Save assistant response to database
        const assistantRes = await fetch("/api/message", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: chatData.reply,
            role: "assistant",
          }),
          credentials: "include",
        });

        if (assistantRes.ok) {
          const assistantData = await assistantRes.json();
          // Add assistant message right after the user message (not at the beginning)
          setMessages((prev) => {
            // Find the index of the most recent user message
            const userMessageIndex = prev.findIndex(
              (msg) => msg.role === "user"
            );
            if (userMessageIndex !== -1) {
              // Insert assistant message after the user message
              const newMessages = [...prev];
              newMessages.splice(userMessageIndex + 1, 0, assistantData.message);
              return newMessages;
            } else {
              // If no user message found, just add at the beginning
              return [assistantData.message, ...prev];
            }
          });
        }
      }
    } catch (error) {
      console.error("Error:", error);
      // Error handling - could show error message in UI if needed
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      console.error("Chat error:", errorMessage);
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
      {/* Matrix code rain canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ background: "#000000" }}
      />

      {/* 3D Depth Layers */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8">
        {/* Layer 1: Distant holographic grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent"></div>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
            `,
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>

        {/* Layer 2: Main 3D interface */}
        <div
          className="relative w-full max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto"
          style={{ perspective: "1000px" }}
        >
          {/* 3D Robot Avatar */}
          <div
            className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="relative inline-block group">
              {/* 3D Robot Head */}
              <div
                className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 mx-auto mb-4 sm:mb-6 transition-transform duration-300 group-hover:scale-110"
                style={{
                  transform: "rotateX(15deg) rotateY(0deg)",
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Wireframe cube */}
                <div
                  className="absolute inset-0 border-2 border-green-400 opacity-60"
                  style={{
                    transform: "rotateX(45deg) rotateY(45deg)",
                    boxShadow: "0 0 20px #00FF41, inset 0 0 20px #00FF41",
                  }}
                ></div>

                {/* Robot face */}
                <div className="absolute inset-2 sm:inset-3 md:inset-4 flex items-center justify-center">
                  <Bot
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 text-green-400"
                    style={{
                      filter: "drop-shadow(0 0 10px #00FF41)",
                      textShadow: "0 0 20px #00FF41",
                    }}
                  />
                </div>

                {/* Glowing eyes */}
                <div
                  className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8 w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 bg-green-400 rounded-full animate-pulse"
                  style={{
                    boxShadow: "0 0 15px #00FF41",
                  }}
                ></div>
                <div
                  className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 bg-green-400 rounded-full animate-pulse"
                  style={{
                    boxShadow: "0 0 15px #00FF41",
                    animationDelay: "0.5s",
                  }}
                ></div>

                {/* Energy field */}
                <div
                  className="absolute -inset-4 sm:-inset-6 md:-inset-8 border border-green-400/30 rounded-full animate-spin"
                  style={{
                    animationDuration: "8s",
                    boxShadow: "0 0 30px #00FF41",
                  }}
                ></div>
                <div
                  className="absolute -inset-6 sm:-inset-8 md:-inset-12 border border-cyan-400/20 rounded-full animate-spin"
                  style={{
                    animationDuration: "12s",
                    animationDirection: "reverse",
                    boxShadow: "0 0 40px #00FFFF",
                  }}
                ></div>
              </div>

              {/* 3D Title */}
              <h1
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-green-400 mb-2 sm:mb-3 md:mb-4 transition-transform duration-300 group-hover:translateZ(20px)"
                style={{
                  textShadow: "0 0 20px #00FF41, 0 0 40px #00FF41",
                  fontFamily: "monospace",
                  transform: "translateZ(0px)",
                }}
              >
                {personalInfo.name.toUpperCase()} PORTFOLIO
              </h1>
              <p
                className="text-sm sm:text-base md:text-lg lg:text-xl text-cyan-400 font-mono"
                style={{
                  textShadow: "0 0 10px #00FFFF",
                  transform: "translateZ(10px)",
                }}
              >
                [{personalInfo.title.toUpperCase()}] • [AI ASSISTANT ACTIVE]
              </p>
            </div>
          </div>

          {/* 3D Chat Container */}
          <div
            className="relative bg-black/80 backdrop-blur-sm border border-green-400/50 rounded-2xl shadow-2xl transition-transform duration-300 hover:translateZ(20px)"
            style={{
              transform: "translateZ(0px)",
              boxShadow:
                "0 0 50px rgba(0, 255, 65, 0.3), inset 0 0 50px rgba(0, 255, 65, 0.1)",
            }}
          >
            {/* Holographic border effect */}
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                background:
                  "linear-gradient(45deg, transparent, rgba(0, 255, 65, 0.1), transparent)",
                animation: "hologram 3s linear infinite",
              }}
            ></div>

            {/* Messages Area */}
            <div className="h-48 sm:h-64 md:h-80 lg:h-96 overflow-y-auto p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 relative z-10">
              {/* Messages List */}
              {messages.length > 0 && (
                <div className="space-y-3">
                  {messages.map((msg, index) => (
                    <div
                      key={msg.id || index}
                      className={`flex ${
                        msg.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`${
                          msg.role === "user"
                            ? "bg-green-900/30 text-green-400 border-green-400/30"
                            : "bg-black/50 text-cyan-400 border-cyan-400/30"
                        } px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg max-w-[80%] sm:max-w-xs border transition-transform duration-300 hover:translateZ(10px)`}
                        style={{
                          textShadow:
                            msg.role === "user"
                              ? "0 0 10px #00FF41"
                              : "0 0 10px #00FFFF",
                          boxShadow:
                            msg.role === "user"
                              ? "0 0 20px rgba(0, 255, 65, 0.3)"
                              : "0 0 20px rgba(0, 255, 255, 0.3)",
                        }}
                      >
                        <p className="text-xs sm:text-sm font-mono">
                          {msg.content}
                        </p>
                        {msg.role === "user" && (
                          <p className="text-xs text-green-300 mt-1 font-mono">
                            {new Date(msg.created_at).toLocaleString()}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Loading State */}
              {isLoadingMessages && (
                <div className="flex items-center justify-center h-24 sm:h-32">
                  <div
                    className="text-green-400 font-mono text-sm sm:text-base"
                    style={{ textShadow: "0 0 10px #00FF41" }}
                  >
                    [LOADING_MATRIX_DATA]...
                  </div>
                </div>
              )}

              {/* Empty State */}
              {messages.length === 0 && !isLoadingMessages && !isTyping && (
                <div className="flex items-center justify-center h-24 sm:h-32">
                  <div className="text-center text-green-400 font-mono">
                    <div
                      className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto mb-2 text-green-400"
                      style={{ textShadow: "0 0 10px #00FF41" }}
                    >
                      <Bot />
                    </div>
                    <p
                      className="text-sm sm:text-base"
                      style={{ textShadow: "0 0 10px #00FF41" }}
                    >
                      Ask me anything about {personalInfo.name}&apos;s work...
                    </p>
                  </div>
                </div>
              )}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div
                    className="bg-black/50 text-cyan-400 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg border border-cyan-400/30"
                    style={{
                      textShadow: "0 0 10px #00FFFF",
                      boxShadow: "0 0 20px rgba(0, 255, 255, 0.3)",
                    }}
                  >
                    <div className="flex space-x-1">
                      <div
                        className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full animate-bounce"
                        style={{ boxShadow: "0 0 5px #00FFFF" }}
                      ></div>
                      <div
                        className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full animate-bounce"
                        style={{
                          animationDelay: "0.1s",
                          boxShadow: "0 0 5px #00FFFF",
                        }}
                      ></div>
                      <div
                        className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full animate-bounce"
                        style={{
                          animationDelay: "0.2s",
                          boxShadow: "0 0 5px #00FFFF",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 3D Input Area */}
            <div
              className="p-3 sm:p-4 md:p-6 border-t border-green-400/30 relative z-10"
              style={{
                background:
                  "linear-gradient(180deg, transparent, rgba(0, 255, 65, 0.05))",
              }}
            >
              <div className="flex gap-2 sm:gap-3">
                <div className="flex-1">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full bg-black/50 text-green-400 placeholder-green-400/50 border border-green-400/50 rounded-lg px-2 sm:px-3 md:px-4 py-2 sm:py-3 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent resize-none font-mono transition-all duration-300 text-sm sm:text-base"
                    style={{
                      textShadow: "0 0 5px #00FF41",
                      boxShadow: "0 0 20px rgba(0, 255, 65, 0.2)",
                    }}
                    placeholder="Ask about my skills, experience, or projects..."
                    rows={2}
                  />
                </div>
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isTyping}
                  className="bg-green-600 hover:bg-green-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-black px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-lg transition-all duration-300 flex items-center justify-center font-bold hover:scale-105"
                  style={{
                    boxShadow: "0 0 20px rgba(0, 255, 65, 0.5)",
                    textShadow: "0 0 5px #000000",
                  }}
                >
                  <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
              <p
                className="text-xs text-green-400/70 mt-2 font-mono"
                style={{ textShadow: "0 0 5px #00FF41" }}
              >
                [ENTER] TO SEND • [SHIFT+ENTER] FOR MULTILINE • 
                [PORTFOLIO AI ASSISTANT]
              </p>
            </div>
          </div>
        </div>

        {/* Layer 3: Floating UI panels */}
        <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-20">
          <div
            className="bg-black/50 border border-green-400/30 rounded-lg p-2 sm:p-3 font-mono text-green-400 text-xs transition-transform duration-300 hover:translateZ(10px)"
            style={{
              textShadow: "0 0 10px #00FF41",
              boxShadow: "0 0 20px rgba(0, 255, 65, 0.3)",
            }}
          >
            <div className="animate-pulse">[PORTFOLIO: ONLINE]</div>
            <div className="animate-pulse" style={{ animationDelay: "0.5s" }}>
              [{personalInfo.title.toUpperCase()}]
            </div>
            <div className="animate-pulse" style={{ animationDelay: "1s" }}>
              [AI ASSISTANT: ACTIVE]
            </div>
          </div>
        </div>

        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-20">
          <div
            className="bg-black/50 border border-cyan-400/30 rounded-lg p-2 sm:p-3 font-mono text-cyan-400 text-xs transition-transform duration-300 hover:translateZ(10px)"
            style={{
              textShadow: "0 0 10px #00FFFF",
              boxShadow: "0 0 20px rgba(0, 255, 255, 0.3)",
            }}
          >
            <div className="animate-pulse">[AI ASSISTANT: READY]</div>
            <div className="animate-pulse" style={{ animationDelay: "0.7s" }}>
              [STATUS: AVAILABLE]
            </div>
            <div className="animate-pulse" style={{ animationDelay: "1.2s" }}>
              [MODE: PORTFOLIO]
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes hologram {
          0% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.3;
          }
          100% {
            opacity: 0.1;
          }
        }
      `}</style>
    </div>
  );
}
