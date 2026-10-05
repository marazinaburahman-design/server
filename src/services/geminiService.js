import { GoogleGenAI } from '@google/genai'
import { env } from '../config/env.js'

const ai = env.geminiApiKey ? new GoogleGenAI({ apiKey: env.geminiApiKey }) : null

const SYSTEM_INSTRUCTION = `You are an AI text transformation assistant.
Follow the requested operation exactly.
Return only the transformed text. Do not add introductions, explanations, labels, quotes, or markdown unless the input itself requires them.`

const buildPrompt = ({ mode, text, tone, target }) => {
  switch (mode) {
    case 'summarize':
      return `Summarize the following text clearly while preserving its important meaning and key points. Keep it concise.\n\nTEXT:\n${text}`
    case 'rewrite':
      return `Rewrite the following text in a ${tone} tone. Preserve the original meaning and do not add facts.\n\nTEXT:\n${text}`
    case 'translate':
      return `Translate the following text into ${target}. Preserve the meaning, formatting, and tone as naturally as possible.\n\nTEXT:\n${text}`
    default:
      throw Object.assign(new Error('Unsupported transformation mode.'), { statusCode: 400 })
  }
}

export async function transformText({ mode, text, tone, target }) {
  if (!ai) {
    throw Object.assign(new Error('GEMINI_API_KEY is not configured on the server.'), { statusCode: 500 })
  }

  const response = await ai.models.generateContent({
    model: env.geminiModel,
    contents: buildPrompt({ mode, text, tone, target }),
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.3,
      maxOutputTokens: 2048,
    },
  })

  const output = response.text?.trim()
  if (!output) {
    throw Object.assign(new Error('Gemini returned an empty response.'), { statusCode: 502 })
  }

  return output
}
