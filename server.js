import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// FIXED: Use a Gemini model (Flash is fast and good for chat)
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post("/ask", async (req, res) => {
  try {
    const { prompt } = req.body;

    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    // FIXED: The SDK provides a .text() helper to get the answer safely
    const replyText = response.text();

    res.json({ reply: replyText });

  } catch (error) {
    console.error("Error generating AI response:", error);
    res.status(500).json({ error: "Error generating response" });
  }
});

app.listen(3000, () => {
  console.log("✅ Server running at http://localhost:3000");
});
