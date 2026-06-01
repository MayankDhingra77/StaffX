const router = require('express').Router();
const { getAllActivities } = require('../controllers/activity.controller');
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');

router.use(protect);
router.get('/', authorize('admin', 'hr'), getAllActivities);

module.exports = router;
