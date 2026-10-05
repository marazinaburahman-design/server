import { Router } from 'express'
import { transformController } from '../controllers/transformController.js'
import { transformRateLimiter } from '../middleware/rateLimiter.js'

const router = Router()
router.post('/', transformRateLimiter, transformController)
export default router
