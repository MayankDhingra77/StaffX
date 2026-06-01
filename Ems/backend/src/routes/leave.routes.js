const router = require('express').Router();
const { getAllLeaves, getMyLeaves, applyLeave, updateLeaveStatus, cancelLeave } = require('../controllers/leave.controller');
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');

router.use(protect);

router.get('/', authorize('admin', 'hr'), getAllLeaves);
router.get('/my', getMyLeaves);
router.post('/', applyLeave);
router.put('/:id/status', authorize('admin', 'hr'), updateLeaveStatus);
router.delete('/:id', cancelLeave);

module.exports = router;
