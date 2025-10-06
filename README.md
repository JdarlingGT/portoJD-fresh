# Jacob Darling - Portfolio

This repository contains the source code for my personal portfolio website, built with React, Vite, TypeScript, and Tailwind CSS. The site features a modern design with interactive components, a comprehensive toolbox showcase, and Hep AI - an intelligent assistant inspired by IU football coach Terry Hoeppner.

## Features

- **Modern UI/UX**: Clean, professional design with smooth animations
- **Interactive Components**: Logo grid with filtering, theme switching, and microinteractions
- **Hep AI Assistant**: Intelligent chat assistant with personality and knowledge base
- **Responsive Design**: Optimized for all devices
- **Fast Performance**: Built with Vite for optimal loading speeds

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Build Tool**: Vite
- **Animations**: Framer Motion, GSAP
- **AI Integration**: OpenAI API with Express server
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- OpenAI API key (for Hep AI functionality)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/portoJD-fresh.git
   cd portoJD-fresh
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env
   # Edit .env and add your OpenAI API key
   ```

4. Start the development servers:

   **Terminal 1 - Frontend:**

   ```bash
   npm run dev
   ```

   **Terminal 2 - Hep AI Server:**

   ```bash
   npm run start:ai
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Hep AI Setup

Hep AI requires an OpenAI API key to function. The assistant features:

- **Personality**: Inspired by IU football coach Terry Hoeppner
- **Knowledge Base**: Portfolio information, IU trivia, leadership analogies
- **State Management**: Idle → Listening → Responding → Napping states
- **Voice Output**: Optional speech synthesis for responses

To enable Hep AI:

1. Get an OpenAI API key from [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Add it to your `.env` file:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start:ai` - Start Hep AI server
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── layout/         # Header, Footer, Navigation
│   ├── ui/            # Base UI components (HepChat, etc.)
│   └── sections/      # Page sections
├── data/              # JSON data files
│   ├── knowledgeBase.json    # Hep AI knowledge
│   ├── hep-persona.json      # Hep personality config
│   └── logos.json           # Logo data
├── pages/            # Route components
├── hooks/            # Custom React hooks
└── utils/            # Utility functions

server/               # Express server for AI API
public/              # Static assets
```

## Hep AI Features

### Knowledge Base

- Portfolio information and case studies
- IU football trivia and analogies
- Leadership and marketing insights
- Dynamic Q&A responses

### Personality Traits

- Optimistic and encouraging
- Direct but diplomatic communication
- Football analogies for business concepts
- Enthusiastic about creative challenges

### State Machine

- **Idle**: Waiting for interaction
- **Listening**: User is typing
- **Responding**: Processing and answering
- **Napping**: Auto-sleep after inactivity

## Deployment

The site is configured for Vercel deployment:

1. Push to your GitHub repository
2. Connect to Vercel
3. Add `OPENAI_API_KEY` environment variable in Vercel dashboard
4. Deploy

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is private and proprietary.
