const router = require('express').Router()
const controller = require('../controller')
const cacheMiddleware = require('../config/cacheMiddleware')

router.get('/', controller.activity.getAll)
router.get('/:id', cacheMiddleware(30), controller.activity.getOne)
router.post('/', cacheMiddleware(30), controller.activity.create)
router.patch('/:id', controller.activity.update)
router.delete('/:id', controller.activity.del)

module.exports = router;