import Payment from '../models/Payment.js';
import Booking from '../models/Booking.js';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.PAYSTACK_SECRET_KEY;
const baseURL = process.env.PAYSTACK_BASE_URL;

export async function initializeTransactionService(bookingId, amount, email, paymentMethod, additionalData) {
    try {
        const response = await axios.post(
            `${baseURL}/transaction/initialize`,
            {
                amount: amount * 100,
                email,
                callback_url: `${process.env.APP_URL}/payments/verify?bookingId=${bookingId}`,
                metadata: {
                    bookingId,
                    paymentMethod,
                    ...additionalData
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${secretKey}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        if (response.status !== 200) {
            res.status(400).json({ message: response.data.message });
        }

        await Payment.createPayment({
            bookingId,
            amount,
            paymentMethod,
            reference: response.data.data.reference,
            status: 'pending'
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error(error.response?.data?.message || 'Payment initialization failed');
    }
}

export async function verifyTransactionService(reference) {
    try {
        const response = await axios.get(
            `${baseURL}/transaction/verify/${reference}`,
            {
                headers: {
                    Authorization: `Bearer ${secretKey}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const transaction = response.data.data;
        const payment = await Payment.findOne({ reference });

        if (!payment) {
            throw new Error('Payment not found');
        }

        payment.status = transaction.status === 'success' ? 'completed' : 'failed';
        await payment.save();

        if (payment.status === 'completed') {
            await Booking.findByIdAndUpdateBooking(payment.bookingId, {
                status: 'confirmed'
            });
        }

        return transaction;
    } catch (error) {
        console.log(error);
        throw new Error(error.response?.data?.message || 'Payment verification failed');
    }
}