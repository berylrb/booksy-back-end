import { Router } from 'express'
import * as groupsCtrl from '../controllers/groups.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/', checkAuth, groupsCtrl.createGroup)
router.put('/:groupId/add-photo', checkAuth, groupsCtrl.addPhoto)

export { router }