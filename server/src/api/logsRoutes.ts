import { Router } from 'express';
import { addLog, fetchMyLogs } from '../controllers/logsControllers';
import isAuth from '../middlewares/isAuth';

const router = Router();

router.route('/').get(isAuth, fetchMyLogs).post(isAuth, addLog);

export default router;
