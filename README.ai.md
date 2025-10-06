# AI Assistant setup

1. Install dependencies:
   - Run `npm install` to ensure server dependencies (express) are installed.

2. Add environment variable:
   - Create a `.env` file at the repo root with:
     ```
     OPENAI_API_KEY=sk-...
     ```
   - Or set `OPENAI_API_KEY` in your shell environment.

3. Start the AI proxy:
   - Run `npm run start:ai` — this launches `server/index.js` which exposes `/api/ai` on port 5001 by default.

4. Start the frontend:
   - Run `npm run dev` (Vite). The frontend will POST questions to `/api/ai`. If running on a different port, make sure to proxy or set up CORS accordingly.

Notes:
- The proxy seeds requests with entries from `src/data/knowledgeBase.json`.
- Keep your OPENAI_API_KEY secret. Do not commit it to source control.