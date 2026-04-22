const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  setAlert,
  getAlerts,
  checkAlerts,
  deleteAlert
} = require('../controllers/alertController');

router.post('/set', protect, setAlert);
router.get('/', protect, getAlerts);
router.get('/check', protect, checkAlerts);
router.delete('/:id', protect, deleteAlert);

module.exports = router;