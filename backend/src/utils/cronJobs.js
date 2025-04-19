import cron from 'node-cron';
import Booking from '../models/Booking.js';
import { sendSms } from './sms.js';
import { formatDate } from './dateUtils.js';

export const checkRentDueNotifications = async () => {
    try {
        // Find bookings where rent is due in 3 days
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const threeDaysFromNow = new Date();
        threeDaysFromNow.setDate(today.getDate() + 3);
        threeDaysFromNow.setHours(0, 0, 0, 0);

        const upcomingRentDue = await Booking.findUpcomingRentDue({
            checkOut: {
                $gte: today,
                $lte: threeDaysFromNow
            },
            status: 'confirmed'
        });

        for (const booking of upcomingRentDue) {
            const dueDate = formatDate(booking.checkOut);
            const message = `Your rent of GHS ${booking.roomId.price.pricePerMonth} for ${booking.roomId.name} is due on ${dueDate}. Please ensure timely payment to avoid any inconvenience.`;
            await sendSms(
                booking.userId.phoneNumber,
                message
            );
        }
    } catch (error) {
        console.error('Error sending rent due notifications:', error);
    }
};

// Schedule the cron job to run every day at Midnight
export const initCronJobs = () => {
    cron.schedule('0 0 * * *', async () => {
        console.log('Running rent due notifications check...');
        await checkRentDueNotifications();
    });
};
