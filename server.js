import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Check if API Key is loaded
if (!process.env.GEMINI_API_KEY) {
  console.error("❌ ERROR: GEMINI_API_KEY is missing in .env file");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post("/ask", async (req, res) => {
  try {
    const { prompt } = req.body;
    console.log("📩 Received prompt:", prompt);

    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    // Check if the AI returned text
    const replyText = response.text();
    
    console.log("🤖 AI Replied:", replyText); // Log successful reply
    res.json({ reply: replyText });

  } catch (error) {
    console.error("❌ Error generating response:", error);
    
    // Send the actual error message to the frontend so you can see it
    res.status(500).json({ 
      reply: "Error: " + (error.message || "Something went wrong on the server.") 
    });
  }
});

app.listen(3000, () => {
  console.log("✅ Server running at http://localhost:3000");
});
