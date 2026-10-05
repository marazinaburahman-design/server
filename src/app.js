import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { env } from './config/env.js'
import transformRoutes from './routes/transformRoutes.js'
import { errorHandler } from './middleware/errorHandler.js'

const app = express()

app.use(helmet())
app.use(cors({ origin: env.clientUrl }))
app.use(express.json({ limit: '100kb' }))

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api/transform', transformRoutes)

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found.' })
})

app.use(errorHandler)

export default app
