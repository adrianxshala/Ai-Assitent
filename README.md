# Adrian Assistant AI

A futuristic Matrix-style AI assistant built with Next.js, React, and OpenAI.

## Features

- 🤖 **Adrian Assistant AI** - Intelligent conversational AI
- 🌊 **Matrix Code Rain** - Dynamic background animation
- 🎨 **3D Robotic Interface** - Immersive Matrix-style design
- 📱 **Fully Responsive** - Works on all devices
- ⚡ **Real-time Chat** - Instant AI responses

## Deployment on Vercel

### Prerequisites

1. **OpenAI API Key**: Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)

### Environment Variables

Set these environment variables in your Vercel project:

```bash
OPENAI_API_KEY=your_openai_api_key_here
```

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
   - Add environment variable: `OPENAI_API_KEY`

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
   cp .env.example .env.local
   # Edit .env.local with your OpenAI API key
   ```

3. **Run development server**:

   ```bash
   npm run dev
   ```

4. **Open**: [http://localhost:3000](http://localhost:3000)

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **AI**: OpenAI GPT-4o-mini
- **Icons**: Lucide React
- **Deployment**: Vercel

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── chat/route.ts      # OpenAI chat API
│   │   └── message/route.ts    # Message storage API
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

1. **OpenAI API Key Error**:

   - Ensure `OPENAI_API_KEY` is set in Vercel environment variables
   - Check API key is valid and has credits

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
- OpenAI API documentation: [platform.openai.com](https://platform.openai.com/docs)

## License

MIT License - feel free to use this project for your own AI assistant!
