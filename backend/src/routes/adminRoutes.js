import express from 'express';
import { authenticateAdmin } from '../middleware/auth.js';
import { getDashboard, getRevenueStats } from '../controllers/adminController.js';
import { getAllBookings, getRoomBookings, getBookingById } from '../controllers/bookingController.js';
import { createRoom, updateRoom, deleteRoom } from '../controllers/roomController.js';
import { getAllUsers } from '../controllers/userController.js';
import uploadMultiple from '../services/imageUpload.js';

const router = express.Router();

router.use(authenticateAdmin);

router.get('/dashboard', getDashboard);
router.get('/bookings', getAllBookings);
router.get('/bookings/:id', getBookingById);
router.get('/users', getAllUsers);
router.get('/revenue', getRevenueStats);
router.post('/rooms', uploadMultiple, createRoom);
router.put('/rooms/:id', uploadMultiple, updateRoom);
router.delete('/rooms/:id', deleteRoom);
router.get('/rooms/:id/bookings', getRoomBookings);

export default router;