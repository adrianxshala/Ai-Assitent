# Adrian Assistant AI

A futuristic Matrix-style AI assistant built with Next.js, React, and Groq.

## Features

- 🤖 **Adrian Assistant AI** - Intelligent conversational AI
- 🌊 **Matrix Code Rain** - Dynamic background animation
- 🎨 **3D Robotic Interface** - Immersive Matrix-style design
- 📱 **Fully Responsive** - Works on all devices
- ⚡ **Real-time Chat** - Instant AI responses

## Deployment on Vercel

### Prerequisites

1. **Groq API Key**: Get your API key from [Groq Cloud Console](https://console.groq.com/keys)
2. **Supabase Account**: Sign up at [supabase.com](https://supabase.com) and create a new project
3. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)

### Environment Variables

Set these environment variables in your Vercel project:

```bash
GROQ_API_KEY=your_groq_api_key_here
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Supabase Setup

1. **Create a Supabase Project**:
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Wait for the database to be ready

2. **Create the Messages Table**:
   - Go to the SQL Editor in your Supabase dashboard
   - Run the SQL script from `supabase/schema.sql`:
   ```sql
   CREATE TABLE IF NOT EXISTS messages (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     content TEXT NOT NULL,
     role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);

   ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

   CREATE POLICY "Allow all operations on messages" ON messages
     FOR ALL
     USING (true)
     WITH CHECK (true);
   ```

3. **Get Your Supabase Credentials**:
   - Go to Project Settings → API
   - Copy your Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - Copy your anon/public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Deploy Steps

1. **Push to GitHub**:

   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Connect to Vercel**:

   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Add environment variables:
     - `GROQ_API_KEY`
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

3. **Deploy**:
   - Vercel will automatically build and deploy
   - Your app will be available at `https://your-project.vercel.app`

### Local Development

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Set up environment**:

   ```bash
   # Create .env.local file with:
   GROQ_API_KEY=your_groq_api_key_here
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Run development server**:

   ```bash
   npm run dev
   ```

4. **Open**: [http://localhost:3000](http://localhost:3000)

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **AI**: Groq Llama 3.3 70B Versatile
- **Database**: Supabase (PostgreSQL)
- **Icons**: Lucide React
- **Deployment**: Vercel

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── chat/route.ts      # Groq chat API
│   │   └── message/route.ts    # Supabase message storage API
│   ├── globals.css            # Global styles
│   ├── layout.tsx            # App layout
│   └── page.tsx              # Main component
└── lib/                      # Utility functions
```

## Features Explained

### Matrix Code Rain

- Canvas-based animation
- Responsive character sizing
- Performance optimized

### 3D Robot Avatar

- CSS 3D transforms
- Hover interactions
- Glowing effects

### Responsive Design

- Mobile-first approach
- Breakpoint optimizations
- Touch-friendly interface

## Troubleshooting

### Common Issues

1. **Groq API Key Error**:

   - Ensure `GROQ_API_KEY` is set in Vercel environment variables
   - Check API key is valid and has credits

2. **Supabase Connection Error**:

   - Ensure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set
   - Verify the messages table exists in your Supabase project
   - Check that Row Level Security policies are configured correctly

2. **Build Errors**:

   - Run `npm run lint` to check for code issues
   - Ensure all dependencies are installed

3. **Performance Issues**:
   - Matrix animation is optimized for modern browsers
   - Consider reducing animation complexity on slower devices

### Support

For issues or questions:

- Check the [Next.js documentation](https://nextjs.org/docs)
- Review [Vercel deployment guide](https://vercel.com/docs)
- Groq API documentation: [console.groq.com/docs](https://console.groq.com/docs)

## License

MIT License - feel free to use this project for your own AI assistant!
