import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { env } from './config/env.js'
import transformRoutes from './routes/transformRoutes.js'
import { errorHandler } from './middleware/errorHandler.js'

const app = express()

const corsOptions = {
  origin: 'https://src-bhhell1mve-abdur-rahman7.vercel.app',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}

app.use(helmet())

// CORS
app.use(cors(corsOptions))

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