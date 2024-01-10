const router = require('express').Router()
const ctrls = require('../controllers/product.ctrl')
const { authenticate } = require('../middlewares/authenticate')

router.post('/', [authenticate], ctrls.createProduct)
router.get('/', ctrls.getProducts)


router.put('/:pid', [authenticate], ctrls.updateProduct)
router.delete('/:pid', [authenticate], ctrls.deleteProduct)
router.get('/:pid', ctrls.getProduct)


module.exports = router