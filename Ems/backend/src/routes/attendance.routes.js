const router = require('express').Router();
const { bulkMarkAttendance, getDailyAttendance, getMonthlyAttendance, getEmployeeAttendance, getAllAttendance } = require('../controllers/attendance.controller');
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');

router.use(protect);

router.get('/all', getAllAttendance);
router.get('/daily', getDailyAttendance);
router.get('/monthly', getMonthlyAttendance);
router.get('/employee/:id', getEmployeeAttendance);
router.post('/bulk', authorize('admin', 'hr'), bulkMarkAttendance);

module.exports = router;
