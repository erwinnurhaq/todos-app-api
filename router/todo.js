const router = require('express').Router()
const controller = require('../controller')

router.get('/', controller.todo.getAll)
router.get('/:id', controller.todo.getOne)
router.post('/', controller.todo.create)
router.patch('/:id', controller.todo.update)
router.delete('/:id', controller.todo.del)

module.exports = router;