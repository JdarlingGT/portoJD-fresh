import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
app.use(cors());
app.use(express.json());

// Load knowledge base
const kbPath = path.resolve('./src/data/knowledgeBase.json');
let knowledgeBase = { questions: [] };
try {
  const raw = fs.readFileSync(kbPath, 'utf8');
  knowledgeBase = JSON.parse(raw);
} catch (err) {
  console.warn('Could not load knowledge base:', err.message);
}

// Load persona
const personaPath = path.resolve('./src/data/hep-persona.json');
let persona = {};
try {
  const raw = fs.readFileSync(personaPath, 'utf8');
  persona = JSON.parse(raw);
} catch (err) {
  console.warn('Could not load persona:', err.message);
}

// State management for Hep
let hepState = 'idle';
let lastActivity = Date.now();
let conversationHistory = [];

const updateHepState = (newState) => {
  hepState = newState;
  lastActivity = Date.now();
  console.log(`Hep state changed to: ${newState}`);
};

const getHepState = () => {
  const now = Date.now();
  const inactiveTime = now - lastActivity;

  // Auto-transition to napping after 30 seconds of inactivity
  if (inactiveTime > 30000 && hepState !== 'napping') {
    updateHepState('napping');
  }

  return hepState;
};

// Build comprehensive knowledge context
const buildKnowledgeContext = (question) => {
  const contexts = [];

  // Add portfolio information
  if (knowledgeBase.portfolio) {
    contexts.push(`Portfolio: ${knowledgeBase.portfolio.about}`);
    contexts.push(`Expertise: ${knowledgeBase.portfolio.expertise.join(', ')}`);
    contexts.push(`Case Studies: ${knowledgeBase.portfolio.caseStudies.join(', ')}`);
    contexts.push(`Tools: ${knowledgeBase.portfolio.tools.join(', ')}`);
  }

  // Add Q&A pairs
  if (knowledgeBase.questions) {
    knowledgeBase.questions.forEach(qa => {
      contexts.push(`Q: ${qa.question}\nA: ${qa.answer}`);
    });
  }

  // Add IU knowledge
  if (knowledgeBase.iuTrivia) {
    contexts.push(`IU Trivia: ${knowledgeBase.iuTrivia.join(' ')}`);
  }

  // Add analogies based on question content
  if (question.toLowerCase().includes('strategy') || question.toLowerCase().includes('marketing')) {
    if (knowledgeBase.iuPlaybook?.basketball) {
      const analogy = knowledgeBase.iuPlaybook.basketball[Math.floor(Math.random() * knowledgeBase.iuPlaybook.basketball.length)];
      contexts.push(`Marketing Analogy: ${analogy}`);
    }
  }

  if (question.toLowerCase().includes('team') || question.toLowerCase().includes('leadership')) {
    if (knowledgeBase.iuPlaybook?.leadership) {
      const analogy = knowledgeBase.iuPlaybook.leadership[Math.floor(Math.random() * knowledgeBase.iuPlaybook.leadership.length)];
      contexts.push(`Leadership Analogy: ${analogy}`);
    }
  }

  return contexts.slice(0, 15).join('\n\n'); // Limit context size
};

app.post('/api/ai', async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) return res.status(400).json({ error: 'question is required' });

    updateHepState('responding');

    // Build comprehensive knowledge context
    const kbText = buildKnowledgeContext(question);

    // Get personality traits
    const personality = persona.corePersonality || {};
    const communication = persona.communication || {};

    // Build system prompt with personality
    const systemPrompt = `You are Hep, a helpful AI assistant inspired by IU football coach Terry Hoeppner. You are ${personality.optimism ? 'optimistic' : 'professional'}, ${personality.directness ? 'direct' : 'diplomatic'}, and ${personality.analytical ? 'analytical' : 'intuitive'}.

Communication style: ${communication.tone || 'professional-approachable'}, ${communication.style || 'concise and actionable'}.
${communication.humorLevel > 0.5 ? 'Use appropriate humor, especially IU football references.' : 'Keep responses professional.'}

Key traits:
- Always be encouraging and supportive
- Use football analogies when relevant
- Be concise but thorough
- Show enthusiasm for marketing and technology challenges
- Reference IU heritage naturally

Use the provided knowledge base to answer questions accurately. If you don't know something, admit it and offer alternatives.`;

    // Add conversation history for context (last 3 exchanges)
    const recentHistory = conversationHistory.slice(-6);

    const messages = [
      { role: 'system', content: systemPrompt + (kbText ? `\n\nKnowledge base:\n${kbText}` : '') },
      ...recentHistory,
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
        temperature: 0.7,
        max_tokens: 800,
        presence_penalty: 0.1,
        frequency_penalty: 0.1
      })
    });

    const data = await resp.json();

    const assistantText =
      data?.choices?.[0]?.message?.content ??
      data?.choices?.[0]?.text ??
      "Woof! I couldn't get an answer right now.";

    // Update conversation history
    conversationHistory.push({ role: 'user', content: question });
    conversationHistory.push({ role: 'assistant', content: assistantText });

    // Keep only last 10 messages
    if (conversationHistory.length > 20) {
      conversationHistory = conversationHistory.slice(-20);
    }

    // Add personality-based response modifications
    let finalResponse = assistantText;

    // Add IU reference if appropriate
    if (question.toLowerCase().includes('excited') || question.toLowerCase().includes('enthusiastic')) {
      if (persona.responseTemplates?.iuReference) {
        const iuRef = persona.responseTemplates.iuReference[Math.floor(Math.random() * persona.responseTemplates.iuReference.length)];
        finalResponse += `\n\n${iuRef}`;
      }
    }

    updateHepState('idle');

    return res.json({
      answer: finalResponse,
      state: getHepState(),
      personality: {
        optimism: personality.optimism,
        enthusiasm: personality.footballEnthusiasm
      }
    });
  } catch (err) {
    console.error('AI proxy error:', err);
    updateHepState('idle');
    return res.status(500).json({ error: 'AI request failed', details: String(err) });
  }
});

// Get current Hep state
app.get('/api/hep/state', (req, res) => {
  res.json({
    state: getHepState(),
    lastActivity: lastActivity,
    conversationLength: conversationHistory.length
  });
});

// Reset Hep state
app.post('/api/hep/reset', (req, res) => {
  updateHepState('idle');
  conversationHistory = [];
  res.json({ success: true, state: 'idle' });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`AI proxy listening on http://localhost:${PORT}`);
});