export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const { pergunta } = req.body;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "Você é um garçom divertido de bar brasileiro." },
          { role: "user", content: pergunta }
        ]
      })
    });

    const data = await response.json();

    res.status(200).json({
      resposta: data.choices[0].message.content
    });

  } catch {
    res.status(500).json({
      resposta: "Erro na cozinha 😅"
    });
  }
}
