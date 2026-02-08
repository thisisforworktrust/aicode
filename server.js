import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Use a valid Gemini model
const model = genAI.getGenerativeModel({ model: "text-bison-001" });

app.post("/ask", async (req, res) => {
  try {
    const { prompt } = req.body;

    const result = await model.generateContent(prompt);

    // Safe way to extract text
    let replyText = "";
    if (result?.candidates?.length) {
      replyText = result.candidates.map(c => c.output).join("\n");
    } else if (result?.output) {
      replyText = result.output;
    }

    res.json({ reply: replyText });

  } catch (error) {
    console.error("Error generating AI response:", error);
    res.status(500).json({ error: "Error generating response" });
  }
});

app.listen(3000, () => {
  console.log("✅ Server running at http://localhost:3000");
});
