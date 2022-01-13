import express from 'express';
import Auth from '../../controllers/public_system/auth';
import checkUserToken, { checkResetPasswordToken } from '../../middlewares/checkToken';

const router = express.Router();

router.post('/signup', Auth.createUser);

router.post('/login', checkUserToken, Auth.Login);

router.post('/forgot/password', Auth.ForgotPassword);

router.patch('/password/reset', checkResetPasswordToken, Auth.UpdatePassword);

router.get('/me', checkUserToken, Auth.Profile);

export default router;
