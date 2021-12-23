const router = require('express').Router()
const controller = require('../controller')

router.get('/', controller.activity.getAll)
router.get('/:id', controller.activity.getOne)
router.post('/', controller.activity.create)
router.patch('/:id', controller.activity.update)
router.delete('/:id', controller.activity.del)

module.exports = router;