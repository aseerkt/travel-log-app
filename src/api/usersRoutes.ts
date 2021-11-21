import { Router } from 'express';
import {
  getAllUsers,
  getCurrentUser,
  loginUser,
  registerUser,
} from '../controllers/userControllers';
import isUser from '../middlewares/isUser';

const router = Router();

router.get('/', getAllUsers);
router.get('/me', isUser, getCurrentUser);
router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;
