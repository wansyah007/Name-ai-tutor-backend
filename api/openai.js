export default async function handler(req, res) {
  const { system, user } = req.body;

  try {
    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
        temperature: 0.3,
      }),
    });

    const data = await r.json();
    res.status(200).json({ reply: data.choices?.[0]?.message?.content || "Tiada jawapan." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
