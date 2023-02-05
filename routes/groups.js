import { Router } from 'express'
import * as groupsCtrl from '../controllers/groups.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/', checkAuth, groupsCtrl.createGroup)
router.get('/', checkAuth, groupsCtrl.index)
router.get('/:groupId', checkAuth, groupsCtrl.show)
router.put('/:groupId', checkAuth, groupsCtrl.update)
router.put('/:groupId/join', checkAuth, groupsCtrl.joinGroup)
router.put('/:groupId/leave', checkAuth, groupsCtrl.leaveGroup)
router.put('/:groupId/books/:bookId', checkAuth, groupsCtrl.addBook)
router.delete('/:groupId', checkAuth, groupsCtrl.delete)
router.put('/:groupId/add-photo', checkAuth, groupsCtrl.addPhoto)

export { router }