const router = require('express').Router()
const controller = require('../controller')
const cacheMiddleware = require('../config/cacheMiddleware')

router.get('/', controller.todo.getAll)
router.get('/:id', cacheMiddleware(30), controller.todo.getOne)
router.post('/', cacheMiddleware(30), controller.todo.create)
router.patch('/:id', controller.todo.update)
router.delete('/:id', controller.todo.del)

module.exports = router;