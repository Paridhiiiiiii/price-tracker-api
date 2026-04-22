const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getProductHistory,
  getAllHistory
} = require('../controllers/priceHistoryController');

router.get('/', protect, getAllHistory);
router.get('/:productId', protect, getProductHistory);

module.exports = router;