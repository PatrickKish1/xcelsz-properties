import express, { json } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './config/database.js';
import roomRoutes from './routes/roomRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import { initCronJobs } from './utils/cronJobs.js';

dotenv.config();

const app = express();

connectDB();

app.use(json());

// CORS
const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 200,
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

app.use(cors(corsOptions));

app.use('/api/v1/rooms', roomRoutes);
app.use('/api/v1/bookings', bookingRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/payments', paymentRoutes);

// Initialize cron jobs
initCronJobs();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app;