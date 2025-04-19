import { initializeTransactionService, verifyTransactionService } from '../services/paymentService.js';
import { findByIdWithPopulate } from '../services/bookingService.js';
import { sendSms } from '../utils/sms.js';
import Booking from '../models/Booking.js';
import Room from '../models/Room.js';
import { formatDate } from '../utils/dateUtils.js';

export async function initializeCardPayment(req, res) {
    try {
        const { bookingId } = req.params;
        const { email } = req.body;

        const booking = await findById(bookingId)
            .populate('roomId');

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        const response = await initializeTransactionService(
            bookingId,
            booking.roomId.price.pricePerMonth,
            email,
            'card'
        );

        res.status(200).json({
            message: 'Payment initialized successfully',
            authorization_url: response.data.authorization_url,
            reference: response.data.reference
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export async function initializeMobileMoneyPayment(req, res) {
    try {
        const { bookingId } = req.params;
        const { email, phone, provider } = req.body;

        const booking = await findByIdWithPopulate(bookingId);

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        const response = await initializeTransactionService(
            bookingId,
            booking.roomId.price.pricePerMonth,
            email,
            'mobile_money',
            {
                phone,
                provider
            }
        );

        res.json({
            message: 'Payment initialized successfully',
            authorization_url: response.data.authorization_url,
            reference: response.data.reference,
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
}

export async function verifyPayment(req, res) {
    try {
        // const { reference } = req.query;
        const reference = req.query.reference;
        const bookingId = req.query.bookingId;
        const booking = await Booking.findOne({ _id: bookingId });
        const mobileNumber = booking.phoneNumber;
        const room = await Room.findOne({ _id: booking.roomId });
        const msg = `Room Booking Details: ${room.name} at ${room.address.location}, ${room.address.city} from ${formatDate(booking.checkIn)} to ${formatDate(booking.checkOut)} has been successfully booked.Thank you for choosing us!`;

        const transaction = await verifyTransactionService(reference);

        if (transaction.status === 'success') {
            sendSms(`${mobileNumber}`, msg);
        }

        res.json({
            status: transaction.status,
            message: transaction.gateway_response
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export async function handleWebhook(req, res) {
    const hash = crypto.createHmac('sha512', process.env.PAYSTACK_SECRET_KEY)
        .update(JSON.stringify(req.body))
        .digest('hex');

    if (hash !== req.headers['x-paystack-signature']) {
        return res.status(400).send('Invalid signature');
    }

    const event = req.body;

    switch (event.event) {
        case 'charge.success':
            await verifyTransactionService(event.data.reference);
            break;
        case 'transfer.failed':
            console.log('Transfer failed:', event.data.reference);
            break;
        default:
            console.log('Unhandled event:', event.event);
    }

    res.sendStatus(200);
}