# Personalization Guide

## How to Customize Your Portfolio AI

This AI assistant is now configured as your personal portfolio. To customize it for yourself, edit the file `src/config/personal-info.ts`.

### Step 1: Update Personal Information

Open `src/config/personal-info.ts` and update the following fields:

```typescript
export const personalInfo = {
  name: "Your Name", // Your name
  title: "Your Title", // e.g., "Full Stack Developer", "Software Engineer"
  bio: "Your bio...", // Short description about yourself

  skills: [
    "Skill 1", // List your technical skills
    "Skill 2",
    // Add more skills...
  ],

  experience: "Your experience...", // Describe your experience level

  specialties: [
    "Specialty 1", // What you specialize in
    "Specialty 2",
    // Add more specialties...
  ],

  personality: "How you want AI to behave...", // AI personality description
};
```

### Step 2: Customize Example

Here's an example for a Full Stack Developer:

```typescript
export const personalInfo = {
  name: "John Doe",
  title: "Enhanced Full Stack Developer",
  bio: "Experienced Full Stack Developer specializing in modern web technologies, AI integration, and cloud solutions. Passionate about building scalable, efficient, and user-friendly applications.",

  skills: [
    "React & Next.js",
    "TypeScript/JavaScript",
    "Node.js & Express",
    "Python & Django",
    "PostgreSQL & MongoDB",
    "AWS & Docker",
    "AI/ML Integration",
    "UI/UX Design",
  ],

  experience:
    "5+ years of experience in full stack development with expertise in modern frameworks, cloud deployment, and AI technologies.",

  specialties: [
    "Building responsive web applications",
    "Integrating AI capabilities into applications",
    "Optimizing performance and scalability",
    "Creating intuitive user experiences",
    "Full stack architecture design",
    "Cloud infrastructure setup",
  ],

  personality:
    "Professional, friendly, and knowledgeable. Help visitors understand your skills and experience while maintaining a helpful and approachable tone. Be enthusiastic about projects and technologies.",
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
