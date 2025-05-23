import express from 'express';
import { login, register, changePassword } from '../controllers/authController.js';
const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/change-password', changePassword);
export default router;