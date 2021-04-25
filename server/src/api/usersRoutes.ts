import { Router } from 'express';
import { loginUser, registerUser } from '../controllers/userControllers';

const router = Router();

router.get('/', registerUser);

router.post('/login', loginUser);

export default router;
