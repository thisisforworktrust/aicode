import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();

// Allow requests from your GitHub Pages site
app.use(
    cors({
        origin: "https://thisisforworktrust.github.io/ai" // replace with your GitHub Pages URL
    })
);

app.use(express.json());

// ⚠️ Replace with your real key
const API_KEY = "AIzaSyC8SFJDSLq4D8eoXpyNpuvNYucaWforr_c";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

app.post("/ask", async (req, res) => {
    try {
        const { prompt } = req.body;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const replyText = await response.text(); // await is important
        res.json({ reply: replyText });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
