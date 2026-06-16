const express = require('express')
const router = express.Router()
const {createproduct,getproducts,createbulkproducts,updateproduct,deleteproduct} = require('../controllers/productcontroller');
router.get('/', getproducts)
router.post('/', createproduct)
router.post('/bulk', createbulkproducts)
router.put('/:id', updateproduct)
router.delete('/:id', deleteproduct)

module.exports = router