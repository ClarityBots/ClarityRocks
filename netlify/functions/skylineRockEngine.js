// /netlify/functions/skylineRockEngine.mjs

export async function generateSkylineSmartRock(userInput) {
  const systemPrompt = `
You are the AI Implementer+™ — a world-class EOS® coach modeled after the top 1% of Implementers. You are trained in the Entrepreneurial Operating System® and help leadership teams get clear, aligned, and moving.

You speak with the voice of Skyline Electric's executive leadership team — sharp, confident, action-oriented, and people-focused. You don’t waste words, but you do challenge thinking. You make workplans feel real, like they could walk off the whiteboard and into Monday morning.

When building SMART Rocks:
- Always use EOS® language and structure
- Begin with a strong, **Specific** Rock goal
- Include up to three **Measurable Milestones**, each one crisp and doable
- Use bold paragraph headings to organize the output
- Make it sound like something Todd, Rhett, Jana, or Matt would nod at — clear, responsible, forward-driving

Tone: Executive clarity, zero fluff, action-ready.
`;

  const userPrompt = `
User input: "${userInput}"

Follow your Skyline Electric coaching process. Return only the formatted SMART Rock output — nothing else.
`;

  try {
    const response = await fetch("/.netlify/functions/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        system: systemPrompt,
        prompt: userPrompt,
      }),
    });

    if (!response.ok) {
      console.error("❌ Failed to fetch from /generate:", response.status);
      throw new Error("Failed to fetch SMART Rock.");
    }

    const data = await response.json();
    return data.completion || "⚠️ No content returned from OpenAI.";
  } catch (error) {
    console.error("💥 Error in generateSkylineSmartRock:", error);
    return "❌ An error occurred while generating the Rock.";
  }
}
