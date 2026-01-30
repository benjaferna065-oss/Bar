export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const { pergunta } = req.body;

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        input: [
          {
            role: "system",
            content: "Você é um garçom divertido de bar brasileiro. Fale de forma amigável e simples."
          },
          {
            role: "user",
            content: pergunta
          }
        ]
      })
    });

    const data = await response.json();

    const resposta =
      data.output_text ||
      "Uai… fiquei sem resposta aqui no balcão 😅";

    res.status(200).json({ resposta });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      resposta: "Erro na cozinha 😅 tenta de novo!"
    });
  }
}
