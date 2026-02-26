module.exports = async function (req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { feedback } = req.body;

    if (!feedback) {
      return res.status(400).json({ error: "No feedback provided" });
    }

    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
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
            content: "Analyze the feedback and return: Sentiment, Key Points, and Action Suggestions."
          },
          { role: "user", content: feedback }
        ]
      })
    });

    const data = await openaiResponse.json();

    if (!data.choices) {
      return res.status(500).json({ error: data });
    }

    return res.status(200).json({
      result: data.choices[0].message.content
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
