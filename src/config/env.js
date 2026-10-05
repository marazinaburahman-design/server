import 'dotenv/config'

export const env = {
  port: Number(process.env.PORT) || 5000,
  geminiApiKey: process.env.GEMINI_API_KEY,
  geminiModel: process.env.GEMINI_MODEL || 'gemini-3.8-flash',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  rateLimitWindowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  rateLimitMax: Number(process.env.RATE_LIMIT_MAX) || 30,
  maxTextLength: Number(process.env.MAX_TEXT_LENGTH) || 20_000,
}

if (!env.geminiApiKey) {
  console.warn('Warning: GEMINI_API_KEY is not configured. /api/transform will return an error.')
}
