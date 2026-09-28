const express = require('express');
const router = express.Router();
const {
  getHotspots,
  createHotspot,
  updateHotspot,
  deleteHotspot,
} = require('../controllers/hotspot.controller');
const { protect } = require('../middleware/auth.middleware');

router.get('/', protect, getHotspots);
router.post('/', protect, createHotspot);
router.put('/:id', protect, updateHotspot);
router.delete('/:id', protect, deleteHotspot);

module.exports = router;
