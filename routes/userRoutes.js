import express from 'express'
import protect from '../middleware/authMiddleware.js';
import { createNewController,loginController,updateUserController,updatePasswordController,deleteUserController,getMyDetailsController } from '../controllers/userControllers.js';


const router = express.Router();

router.post('/register', createNewController)
router.post('/login', loginController)
router.get('/me', protect, getMyDetailsController)
router.patch('/me', protect, updateUserController)
router.patch('/me/password', protect, updatePasswordController)
router.delete('/me',protect, deleteUserController)

export default router