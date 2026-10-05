export function errorHandler(error, req, res, next) {
  const status = Number(error.statusCode) || 500
  const isRateLimit = error.status === 429 || error.statusCode === 429

  if (status >= 500) {
    console.error(error)
  }

  if (isRateLimit) {
    return res.status(429).json({ message: 'Too many requests. Please wait and try again.' })
  }

  if (status === 429) {
    return res.status(429).json({ message: 'The AI provider is rate-limiting requests. Please try again shortly.' })
  }

  return res.status(status).json({
    message: status >= 500 ? 'The server could not complete the request.' : error.message,
  })
}
