import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config({
    path: "../../.env"
});


const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-lite",
    contents: "Say Hello"
});

console.log(response.text);

console.log(response.text);