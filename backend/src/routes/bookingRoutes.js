import { Router } from 'express';
const router = Router();
import { createBooking } from '../controllers/bookingController.js';

router.post('/', createBooking);

export default router;