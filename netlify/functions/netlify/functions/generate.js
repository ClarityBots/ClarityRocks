import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async (req, res) => {
  try {
    const { system, prompt } = req.body;

    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        { role: "system", content: system },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
    });

    const result = completion.data.choices[0].message.content;
    res.status(200).json({ completion: result });
  } catch (error) {
    console.error("OpenAI error:", error.message);
    res.status(500).json({ error: "Something went wrong." });
  }
};