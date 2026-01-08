
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const evaluateStartupIdea = async (
  idea: string, 
  userData: any, 
  onProgress: (chunk: string) => void
) => {
  const ai = getAI();
  const model = 'gemini-3-pro-preview';
  
  const prompt = `
    User Profile: ${JSON.stringify(userData)}
    
    Startup Idea: ${idea}
    
    Perform a deep Perplexity-style research and evaluation. 
    1. Research existing competitors.
    2. Analyze their success/failure reasons.
    3. Calculate current success probability.
    4. Propose an improved version of the idea if applicable.
    5. Mention Flareonix Tech Team if complex tech is required.
    
    Provide your final analysis in a clear, highly detailed format.
  `;

  try {
    const result = await ai.models.generateContentStream({
      model,
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: [{ googleSearch: {} }],
        temperature: 0.7,
      },
    });

    let fullText = '';
    let sources: any[] = [];

    for await (const chunk of result) {
      const c = chunk as GenerateContentResponse;
      const text = c.text || '';
      fullText += text;
      onProgress(text);
      
      // Extract grounding metadata if available in the final chunks
      const candidate = c.candidates?.[0];
      if (candidate?.groundingMetadata?.groundingChunks) {
        sources = candidate.groundingMetadata.groundingChunks;
      }
    }

    return { fullText, sources };
  } catch (error) {
    console.error("Evaluation error:", error);
    throw error;
  }
};

export const chatWithAssistant = async (message: string, history: any[]) => {
  const ai = getAI();
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: "You are the Flareonix Support Assistant. You help users navigate the Flareonix platform, understand startup readiness metrics, and explain how to use the evaluation tool. If someone asks for tech help, suggest Flareonix Tech & Marketing teams.",
    }
  });

  const response = await chat.sendMessage({ message });
  return response.text;
};
