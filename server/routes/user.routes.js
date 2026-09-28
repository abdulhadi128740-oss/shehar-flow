const express = require('express');
const router = express.Router();
const {
  getUsers,
  createUser,
  updateUserRole,
  deleteUser,
} = require('../controllers/user.controller');
const { protect, adminOnly } = require('../middleware/auth.middleware');

router.use(protect, adminOnly);

router.get('/', getUsers);
router.post('/', createUser);
router.put('/:id/role', updateUserRole);
router.delete('/:id', deleteUser);

module.exports = router;
