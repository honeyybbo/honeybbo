
import { GoogleGenAI } from "@google/genai";
import { PROFILE } from "./constants.ts";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

const SYSTEM_INSTRUCTION = `
You are the personal AI assistant for Jee Eom (엄지), a renowned senior welfare and well-aging expert.
Your goal is to answer questions from visitors about her career, education, and expertise based ONLY on the following profile data.
Be professional, warm, and helpful. Use a respectful tone (Honorifics in Korean).

Profile Data:
${JSON.stringify(PROFILE, null, 2)}

If the user asks something not in the profile, kindly state that you only have information regarding her professional profile but can help with questions about her career milestones, certifications, and research topics.
`;

export const askGemini = async (userMessage: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userMessage,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
    return response.text || "죄송합니다. 답변을 생성하는 중에 오류가 발생했습니다.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "연결 상태가 불안정합니다. 잠시 후 다시 시도해주세요.";
  }
};
