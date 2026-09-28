const express = require('express');
const router = express.Router();
const {
  getAlerts,
  createAlert,
  markAsRead,
} = require('../controllers/alert.controller');
const { protect } = require('../middleware/auth.middleware');

router.get('/', protect, getAlerts);
router.post('/', protect, createAlert);
router.put('/:id/read', protect, markAsRead);

module.exports = router;
