import { GoogleGenerativeAI } from "@google/generative-ai";

let genAI = null;
if (process.env.GEMINI_API_KEY) {
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
}

export async function POST(req) {
  try {
    if (!genAI) {
      return Response.json(
        { error: "GEMINI_API_KEY Environment Variable is missing." },
        { status: 500 }
      );
    }

    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return Response.json({ error: "Invalid payload." }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const systemInstruction = 
      "You are a helpful and intelligent AI assistant. " +
      "You MUST always respond in Sinhala language script, no matter what language the user speaks in. " +
      "Provide clear, accurate, and culturally appropriate answers in Sinhala.";

    let promptText = systemInstruction + "\n\n";
    for (const msg of messages) {
      if (msg.role === "user") {
        promptText += `User: ${msg.content}\n`;
      } else {
        promptText += `Assistant: ${msg.content}\n`;
      }
    }
    promptText += "Assistant: ";

    const result = await model.generateContent(promptText);
    const responseText = result.response.text();

    return Response.json({ role: "bot", content: responseText });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return Response.json({ error: `Gemini API Error: ${error.message}` }, { status: 500 });
  }
}
