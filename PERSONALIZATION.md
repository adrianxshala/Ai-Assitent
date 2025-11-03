# Personalization Guide

## How to Customize Your Portfolio AI

This AI assistant is now configured as your personal portfolio. To customize it for yourself, edit the file `src/config/personal-info.ts`.

### Step 1: Update Personal Information

Open `src/config/personal-info.ts` and update the following fields:

```typescript
export const personalInfo = {
  name: "AdrianXShala", // Your name
  title: "Ai Enhaced Full Stack Developer", // e.g., "Full Stack Developer", "Software Engineer"
  bio: "Jam një Full Stack Developer me fokus në Next.js, MERN Stack dhe integrimin e AI. Eksploroj teknologjitë moderne për të ndërtuar aplikacione inteligente dhe projekte që përdorin LLM, LangChain dhe Supabase.", // Short description about yourself

  skills: [
    "Next.js 15",
    "MERN Stack (MongoDB, Express, React, Node.js)",
    "TypeScript & JavaScript",
    "OpenAI API & LLM integration",
    "LangChain & AI agents",
    "Supabase (Auth, Database, Vector Store)",
    "REST & GraphQL APIs",
    "n8n automation & workflow integration"
  ],

   experience: "Kam përvojë duke ndërtuar aplikacione full-stack moderne, duke integruar AI për rekomandime inteligjente dhe agjentë autonom. Eksperienca ime përfshin projektim të sistemeve me LangChain dhe Supabase për AI-enhanced solutions.",/ Describe your experience level

    specialties: [
    "AI Agent Development",
    "Context-aware AI applications",
    "Prompt engineering & RAG (Retrieval-Augmented Generation)",
    "Automation & workflow optimization",
    "Full-stack app architecture with AI integration"
  ],

    personality: "AI im sillet si një mentor miqësor, drejt për drejt, me humor të lehtë dhe këshilla praktike. Gjithmonë sjell zgjidhje real-world dhe shembuj të qartë që mund të implementohen direkt në projekte." // AI personality description
};
```

### Step 3: What the AI Will Know

Once you update `personal-info.ts`, the AI will:

- Know your name, title, and bio
- Be aware of all your skills and specialties
- Understand your experience level
- Behave according to your personality description
- Answer questions about your work, skills, and capabilities
- Represent you professionally in conversations

### Step 4: Test Your Changes

After updating the personal information:

1. Restart your development server (`npm run dev`)
2. Ask the AI questions like:
   - "What are your skills?"
   - "Tell me about your experience"
   - "What projects have you worked on?"
   - "What technologies do you use?"

The AI will respond using the information you provided in `personal-info.ts`.

### Advanced Customization

You can also customize:

- **System Prompt**: Edit the system prompt in `src/app/api/chat/route.ts` to change how the AI behaves
- **UI Text**: Update text in `src/app/page.tsx` to match your branding
- **Max Tokens**: Adjust `max_tokens` in `src/app/api/chat/route.ts` for longer/shorter responses
- **Temperature**: Adjust `temperature` (0-1) for more creative (higher) or focused (lower) responses

### Tips

- Be specific about your skills and experience
- Include technologies you actually know well
- Keep the bio concise but informative
- Update regularly as you learn new technologies
- Test different questions to ensure the AI responds accurately
