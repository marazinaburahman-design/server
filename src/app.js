import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import transformRoutes from './routes/transformRoutes.js'
import { errorHandler } from './middleware/errorHandler.js'

const app = express()

const corsOptions = {
  origin: 'https://src-weld-kappa.vercel.app',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  optionsSuccessStatus: 204,
}

app.use(helmet())

app.use(cors(corsOptions))
app.options('*', cors(corsOptions))

app.use(express.json({ limit: '100kb' }))

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api/transform', transformRoutes)

app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found.',
  })
})

app.use(errorHandler)

export default app