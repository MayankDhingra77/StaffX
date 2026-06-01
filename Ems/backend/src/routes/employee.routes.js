const router = require('express').Router();
const {
  getAllEmployees, getEmployeeById, createEmployee,
  updateEmployee, deleteEmployee, rateEmployee,
} = require('../controllers/employee.controller');
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');
const { body } = require('express-validator');
const { validate } = require('../middleware/validation.middleware');

const empValidation = [
  body('name').trim().notEmpty().withMessage('Name required'),
  body('email').isEmail().withMessage('Valid email required'),
  body('department').notEmpty().withMessage('Department required'),
  body('role').notEmpty().withMessage('Role required'),
  body('salary').isNumeric().withMessage('Salary must be a number'),
  body('joiningDate').notEmpty().withMessage('Joining date required'),
  validate,
];

router.use(protect);

router.get('/', getAllEmployees);
router.get('/:id', getEmployeeById);
router.post('/', authorize('admin', 'hr'), empValidation, createEmployee);
router.put('/:id', authorize('admin', 'hr'), updateEmployee);
router.delete('/:id', authorize('admin'), deleteEmployee);
router.put('/:id/rate', authorize('admin', 'hr'), [
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be 1-5'),
  validate,
], rateEmployee);

module.exports = router;
