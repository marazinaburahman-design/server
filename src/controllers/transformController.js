import { transformText } from '../services/geminiService.js'
import { env } from '../config/env.js'

const MODES = new Set(['summarize', 'rewrite', 'translate'])
const TONES = new Set(['Simple', 'Professional', 'Friendly', 'Funny'])
const TARGETS = new Set(['Tamil', 'English'])

export async function transformController(req, res, next) {
  try {
    const { mode, text, tone, target } = req.body ?? {}

    if (!MODES.has(mode)) {
      return res.status(400).json({ message: 'Mode must be summarize, rewrite, or translate.' })
    }

    if (typeof text !== 'string' || !text.trim()) {
      return res.status(400).json({ message: 'Text is required.' })
    }

    if (text.length > env.maxTextLength) {
      return res.status(413).json({ message: `Text is too long. Maximum length is ${env.maxTextLength.toLocaleString()} characters.` })
    }

    if (mode === 'rewrite' && !TONES.has(tone)) {
      return res.status(400).json({ message: 'A valid rewrite tone is required.' })
    }

    if (mode === 'translate' && !TARGETS.has(target)) {
      return res.status(400).json({ message: 'A valid target language is required.' })
    }

    const output = await transformText({ mode, text: text.trim(), tone, target })
    return res.json({ output })
  } catch (error) {
    next(error)
  }
}
