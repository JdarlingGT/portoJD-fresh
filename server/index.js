import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
app.use(cors());
app.use(express.json());

// Load local knowledge base (falls back to empty)
const kbPath = path.resolve('./src/data/knowledgeBase.json');
let knowledgeBase = { questions: [] };
try {
  const raw = fs.readFileSync(kbPath, 'utf8');
  knowledgeBase = JSON.parse(raw);
} catch (err) {
  console.warn('Could not load knowledge base:', err.message);
}

app.post('/api/ai', async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) return res.status(400).json({ error: 'question is required' });

    // Build a compact knowledge context from the local KB (limit size)
    const kbItems = (knowledgeBase.questions || []).slice(0, 10);
    const kbText = kbItems.map(q => `Q: ${q.question}\nA: ${q.answer}`).join('\n\n');

    const systemPrompt = `You are Hep, a helpful assistant for the website. Use the provided knowledge base to answer user questions concisely and politely. If the knowledge base does not contain the answer, either provide general guidance or acknowledge you don't know and offer to escalate.`;

    const messages = [
      { role: 'system', content: systemPrompt + (kbText ? `\n\nKnowledge base:\n${kbText}` : '') },
      { role: 'user', content: question }
    ];

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: 'OPENAI_API_KEY not set on server' });
    }

    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages,
        temperature: 0.2,
        max_tokens: 600
      })
    });

    const data = await resp.json();

    const assistantText =
      data?.choices?.[0]?.message?.content ??
      data?.choices?.[0]?.text ??
      JSON.stringify(data);

    return res.json({ answer: assistantText });
  } catch (err) {
    console.error('AI proxy error:', err);
    return res.status(500).json({ error: 'AI request failed', details: String(err) });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`AI proxy listening on http://localhost:${PORT}`);
});