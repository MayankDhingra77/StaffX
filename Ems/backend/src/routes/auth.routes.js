const router = require('express').Router();
const { login, register, getMe, logout, changePassword } = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');
const { body } = require('express-validator');
const { validate } = require('../middleware/validation.middleware');

const loginValidation = [
  body('email').isEmail().withMessage('Valid email required').normalizeEmail(),
  body('password').notEmpty().withMessage('Password required'),
  validate,
];

const registerValidation = [
  body('name').trim().notEmpty().withMessage('Name required'),
  body('email').isEmail().withMessage('Valid email required').normalizeEmail(),
  body('password').isLength({ min: 3 }).withMessage('Password must be at least 3 characters'),
  validate,
];

router.post('/login', loginValidation, login);
router.post('/register', protect, authorize('admin'), registerValidation, register);
router.get('/me', protect, getMe);
router.post('/logout', protect, logout);
router.put('/change-password', protect, [
  body('currentPassword').notEmpty().withMessage('Current password required'),
  body('newPassword').isLength({ min: 3 }).withMessage('New password must be at least 3 characters'),
  validate,
], changePassword);

module.exports = router;
