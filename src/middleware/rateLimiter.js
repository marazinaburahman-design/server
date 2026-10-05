import rateLimit from 'express-rate-limit'
import { env } from '../config/env.js'

export const transformRateLimiter = rateLimit({
  windowMs: env.rateLimitWindowMs,
  limit: env.rateLimitMax,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { message: 'Too many transform requests. Please wait and try again.' },
})
