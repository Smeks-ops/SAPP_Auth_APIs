import express from 'express';
import AuthRoute from './auth_system/auth';

const router = express.Router();

router.use(AuthRoute);

export default router;
