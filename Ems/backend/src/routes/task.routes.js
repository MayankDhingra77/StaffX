const router = require('express').Router();
const { getAllTasks, getMyTasks, getTaskById, createTask, updateTask, updateTaskStatus, deleteTask } = require('../controllers/task.controller');
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');

router.use(protect);

router.get('/', getAllTasks);
router.get('/my', getMyTasks);
router.get('/:id', getTaskById);
router.post('/', authorize('admin', 'hr'), createTask);
router.put('/:id', authorize('admin', 'hr'), updateTask);
router.patch('/:id/status', updateTaskStatus);
router.delete('/:id', authorize('admin', 'hr'), deleteTask);

module.exports = router;
