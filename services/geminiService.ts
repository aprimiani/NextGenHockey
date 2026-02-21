import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';

let aiInstance: GoogleGenAI | null = null;

const getAi = () => {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined. Please set it in your environment variables.");
    }
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
};

export const sendMessageToGemini = async (
  history: { role: string; parts: { text: string }[] }[], 
  newMessage: string,
  language: 'en' | 'fr' = 'fr',
  leagueContext?: string
): Promise<string> => {
  try {
    const ai = getAi();
    const langInstruction = language === 'fr' 
      ? "IMPORTANT: Respond ONLY in French."
      : "Respond in English.";

    const dataContext = leagueContext 
      ? `\nCURRENT LEAGUE DATA (Real-time):\n${leagueContext}\nUse this data to answer specific questions about standings, schedules, or stats.`
      : "";

    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: `${SYSTEM_INSTRUCTION}\n${langInstruction}${dataContext}`,
      },
      history: history,
    });

    const result = await chat.sendMessage({
      message: newMessage,
    });

    return result.text || "I'm sorry, I couldn't process that request right now.";
  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    return "I'm having trouble connecting to the penalty box server. Please check your internet connection.";
  }
};