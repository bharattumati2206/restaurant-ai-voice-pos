export async function askGemini(prompt) {
  const response = await fetch("/api/gemini", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  if(!response.ok) {
    throw new Error("Failed to contact Gemini API");
  }

  const data = await response.json();
  return data.text;
}