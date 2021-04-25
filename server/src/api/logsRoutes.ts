import { Router } from 'express';
import { addLog, fetchAllLogs } from '../controllers/logsControllers';

const router = Router();

router.route('/').get(fetchAllLogs).post(addLog);

export default router;
