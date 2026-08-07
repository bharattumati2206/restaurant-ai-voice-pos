export async function askGemini(prompt) {
  const provider =
    process.env.NEXT_PUBLIC_AI_PROVIDER?.toLowerCase() || "gemini";

  switch (provider) {
    case "gemini":
      return askGeminiProvider(prompt);

    case "openrouter":
      return askOpenRouter(prompt);

    case "groq":
      return askGroq(prompt);

    default:
      throw new Error(`Unsupported AI Provider: ${provider}`);
  }
}

/* -------------------------------------------------------------------------- */
/* GEMINI */
/* -------------------------------------------------------------------------- */

async function askGeminiProvider(prompt) {
  const model = process.env.NEXT_PUBLIC_GEMINI_MODEL || "gemini-3.6-flash";

  const response = await fetch("/api/gemini", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt, model }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error || "Gemini request failed");
  }

  return data.text;
}

/* -------------------------------------------------------------------------- */
/* OPENROUTER */
/* -------------------------------------------------------------------------- */

async function askOpenRouter(prompt) {
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3.3-8b-instruct:free",

        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    },
  );

  if (!response.ok) {
    throw new Error(await response.text());
  }

  const data = await response.json();

  return data.choices[0].message.content;
}

/* -------------------------------------------------------------------------- */
/* GROQ */
/* -------------------------------------------------------------------------- */

async function askGroq(prompt) {
  const model = process.env.NEXT_PUBLIC_GROQ_MODEL || "llama-3.3-70b-versatile";

  const response = await fetch("/api/groq", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt, model }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error || "Groq request failed");
  }

  return data.text;
}
