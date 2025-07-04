const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.handler = async function (event, context) {
  try {
    const { prompt } = JSON.parse(event.body);

    if (!prompt) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Prompt is required." }),
      };
    }

    const systemPrompt = `
You are the AI Implementer+™ — a world-class EOS® coach.
When a user provides a business goal, return a structured SMART Rock with these keys:

{
  "specific": "",
  "measurable": "",
  "achievable": "",
  "relevant": "",
  "timeBound": "",
  "commitment": ""
}

Only return valid JSON. No markdown, no explanations — just the object.
Each value should be 1–3 sentences long and easy to read.
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      temperature: 0.5,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt },
      ],
    });

    const raw = completion.choices[0].message.content;

    // Try parsing raw JSON content from GPT
    let result;
    try {
      result = JSON.parse(raw);
    } catch (err) {
      throw new Error("OpenAI returned malformed JSON.");
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ result }),
    };
  } catch (error) {
    console.error("❌ generate.js error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Server error",
        message: error.message,
      }),
    };
  }
};
