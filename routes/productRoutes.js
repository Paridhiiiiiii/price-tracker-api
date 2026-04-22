const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getProducts,
  addProduct,
  getProduct,
  deleteProduct
} = require('../controllers/productController');

router.get('/', protect, getProducts);
router.post('/add', protect, addProduct);
router.get('/:id', protect, getProduct);
router.delete('/:id', protect, deleteProduct);

module.exports = router;