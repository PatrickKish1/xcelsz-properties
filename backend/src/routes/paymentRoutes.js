import { Router } from 'express';
import { initializeCardPayment, initializeMobileMoneyPayment, verifyPayment, handleWebhook } from '../controllers/paymentController.js';
const router = Router();

router.post('/card/:bookingId', initializeCardPayment);
router.post('/mobile-money/:bookingId', initializeMobileMoneyPayment);
router.get('/verify', verifyPayment);
router.post('/webhook', handleWebhook);

export default router;