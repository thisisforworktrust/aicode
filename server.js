import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
app.use(cors());
app.use(express.json());

// PASTE YOUR KEY HERE DIRECTLY (replace "AIza...")
// Do not keep this permanently, but do it now to fix the error.
const API_KEY = "AIzaSyC8SFJDSLq4D8eoXpyNpuvNYucaWforr_c"; 

const genAI = new GoogleGenerativeAI(API_KEY);

// Try "gemini-1.5-flash" first. If that fails, change this to "gemini-pro"
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post("/ask", async (req, res) => {
  try {
    const { prompt } = req.body;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const replyText = response.text();
    res.json({ reply: replyText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
