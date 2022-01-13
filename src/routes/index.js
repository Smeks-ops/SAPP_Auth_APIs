import express from 'express';
import PublicAuthRoute from './public_system/auth';

const router = express.Router();

router.use(PublicAuthRoute);

export default router;
