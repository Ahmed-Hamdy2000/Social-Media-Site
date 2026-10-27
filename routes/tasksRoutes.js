import express from 'express'
import protect from '../middleware/authMiddleware.js';
import opsOnly from '../middleware/opsMiddleware.js';
import userOrderOnly from '../middleware/codeMiddleware.js'
import {newTaskController,editTaskController,deleteTaskController,getAllTasksController,getTaskByIdController} from '../controllers/taskControllers.js'

const router = express.Router();

router.post('/new',protect, newTaskController)
router.get('/all',protect, getAllTasksController)
router.get('/:id',protect, getTaskByIdController)
router.patch('/:id',protect, opsOnly, editTaskController)
router.delete('/:id',protect, opsOnly, deleteTaskController)

export default router