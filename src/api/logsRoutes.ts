import { Router } from 'express';
import {
  addLog,
  fetchAllLogs,
  fetchMyLogs,
  fetchOneLog,
} from '../controllers/logsControllers';
import isAuth from '../middlewares/isAuth';

const router = Router();

router.get('/', isAuth, fetchMyLogs);
router.post('/', isAuth, addLog);

router.get('/all', fetchAllLogs);
router.get('/one/:id', fetchOneLog);

export default router;
