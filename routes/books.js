import { Router } from 'express'
import * as booksCtrl from '../controllers/books.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

// ========== Public Routes ===========
router.get('/', booksCtrl.bsIndex)

// ========= Protected Routes ========= 
router.use(decodeUserFromToken)
router.get('/:qKey', checkAuth, booksCtrl.show)
router.get('/:qKey/ratings', checkAuth, booksCtrl.getBookRatings)
router.post('/:qKey/reviews', checkAuth, booksCtrl.createReview)
router.get('/:qKey/reviews', checkAuth, booksCtrl.findReviewsByKey)




export { router }