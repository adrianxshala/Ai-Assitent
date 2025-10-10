// src/types/message.ts
export interface Message {
  id: string;
  content: string;
  created_at: string;
  role: "user" | "assistant";
}
