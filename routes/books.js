import { Router } from 'express'
import * as booksCtrl from '../controllers/books.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

// ========== Public Routes ===========
router.get('/', booksCtrl.bsIndex)

// ========= Protected Routes ========= 
router.use(decodeUserFromToken)
router.get('/:id', checkAuth, booksCtrl.show)



export { router }