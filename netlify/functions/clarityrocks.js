const OpenAI = require("openai");

exports.handler = async (event) => {
  try {
    const { rock, role, includeMilestones } = JSON.parse(event.body || "{}");

    if (!rock || !role) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing rock or role input." }),
      };
    }

    const prompt = `
You are a seasoned EOS Implementer helping a ${role} write a SMART Rock™ for the following goal: "${rock}".

Write it in SMART format:
- Specific
- Measurable
- Achievable
- Relevant
- Time-bound

${includeMilestones ? "Include 2-3 key milestones underneath it." : "Do not include milestones."}
Return it in plain text, no markdown or bullets.
`;

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
    });

    const message = completion.choices[0].message.content;

    return {
      statusCode: 200,
      body: JSON.stringify({ message }),
    };
  } catch (error) {
    console.error("Function error:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Function failed",
        details: error.message,
      }),
    };
  }
};
