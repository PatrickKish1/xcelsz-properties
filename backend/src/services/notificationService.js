import { messages } from '../config/twilio';
import { find } from '../models/Room';
import { find as _find } from '../models/Booking';

const sendSMS = async (phoneNumber, message) => {
    try {
        await messages.create({
            body: message,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phoneNumber
        });
    } catch (error) {
        console.error('SMS sending failed:', error);
    }
};

const checkAndSendNotifications = async () => {
    try {
        // Check for rooms becoming available
        const newlyAvailableRooms = await find({
            'availability.status': 'available',
            'availability.availableFrom': { $gte: new Date() }
        });

        for (const room of newlyAvailableRooms) {
            const bookings = await _find({ roomId: room._id })
                .populate('userId');

            for (const booking of bookings) {
                await sendSMS(
                    booking.userId.phoneNumber,
                    `Room ${room.name} is now available for booking!`
                );
            }
        }

        // Check for upcoming stay deadlines
        const upcomingBookings = await _find({
            checkIn: {
                $gte: new Date(),
                $lte: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
            }
        }).populate('userId').populate('roomId');

        for (const booking of upcomingBookings) {
            await sendSMS(
                booking.userId.phoneNumber,
                `Your stay at ${booking.roomId.name} is coming up in 3 days!`
            );
        }
    } catch (error) {
        console.error('Notification check failed:', error);
    }
};

export default {
    sendSMS,
    checkAndSendNotifications
};