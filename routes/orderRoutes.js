import express from 'express'
import protect from '../middleware/authMiddleware.js'
import opsOnly from '../middleware/opsMiddleware.js'

import { getAllOrders,getOrderDetails } from '../controllers/orderControllers.js'

const router = express.Router()


router.get("/all", protect, getAllOrders)
router.get("/:number", protect, getOrderDetails)


export default router