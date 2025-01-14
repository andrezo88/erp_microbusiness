import express from 'express'
import { userRoutes } from './user.routes.ts'
import { loginRoutes } from './login.routes.ts'
import { auth } from '../middleware/auth.middleware.ts'
import { companyRoutes } from './company.routes.ts'
import { productRoutes } from './product.routes.ts'
import { stockRoutes } from './stock.routes.ts'
import { orderRoutes } from './order.routes.ts'

const router = express.Router()

router.use('/user', userRoutes)
router.use('/login', loginRoutes)
router.use('/company', auth, companyRoutes)
router.use('/product', auth, productRoutes)
router.use('/stock', auth, stockRoutes)
router.use('/order', auth, orderRoutes)
export { router }