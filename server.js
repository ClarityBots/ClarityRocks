// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// OpenAI Configuration
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// POST /api/generate
app.post('/api/generate', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required.' });
    }

    const systemPrompt = `You are the AI Implementer+™ — a world-class AI coach trained in EOS®.
You help users write clear, effective SMART Rocks using these five principles:

1. Specific – Clear and unambiguous  
2. Measurable – You can track progress  
3. Achievable – Realistic and doable  
4. Relevant – Important to the business  
5. Time-bound – Has a deadline

Return only the formatted SMART Rock. Use **bold** section headings and paragraph spacing. End with a concise summary commitment.`;

    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      temperature: 0.7,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt },
      ],
    });

    const output = completion.data.choices[0].message.content;
    res.json({ result: output });

  } catch (error) {
    console.error('❌ Server error:', error);
    res.status(500).json({
      error: 'Server error',
      message: error.message,
    });
  }
});

// Start server
app.listen(port, () => {
  console.log(`🚀 ClarityRocks backend listening on port ${port}`);
});
