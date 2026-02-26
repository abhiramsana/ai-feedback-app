export default async function handler(req, res) {
  const { feedback } = req.body;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
          Analyze the feedback and return:
          1. Sentiment (Positive, Negative, Neutral)
          2. Key Points (bullet list)
          3. Action Suggestions (bullet list)
          `
        },
        { role: "user", content: feedback }
      ]
    })
  });

  const data = await response.json();
  res.status(200).json({ result: data.choices[0].message.content });
}
