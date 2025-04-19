import Booking from '../models/Booking.js';
import User from '../models/User.js';
import Room from '../models/Room.js';
import { validateEmail, validatePhoneNumber } from '../utils/validators.js';
import { formatDate } from '../utils/dateUtils.js';

export async function createBooking(req, res) {
    try {

        const { firstName, lastName, email, phoneNumber, roomId, checkIn, checkOut } = req.body;

        if (!firstName || !lastName || !email || !phoneNumber || !roomId || !checkIn || !checkOut) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (!validateEmail(email)) {
            return res.status(400).json({ message: 'Invalid email address' });
        }

        if (!validatePhoneNumber(phoneNumber)) {
            return res.status(400).json({ message: 'Invalid phone number' });
        }

        const room = await Room.findById(roomId);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }

        const overlappingBookings = await Booking.find({
            roomId: roomId,
            $or: [
                { checkIn: { $lt: new Date(checkOut) }, checkOut: { $gt: new Date(checkIn) } }
            ]
        });

        if (overlappingBookings.length > 0) {
            return res.status(400).json({ message: 'Room is already booked for the selected dates' });
        }

        const user = await User.create({
            firstName,
            lastName,
            email,
            phoneNumber
        });

        const booking = await Booking.create({
            userId: user._id,
            roomId: roomId,
            phoneNumber: phoneNumber,
            checkIn,
            checkOut
        });

        const currentDate = new Date(checkOut);
        currentDate.setDate(currentDate.getDate() + 1);

        await Room.findByIdAndUpdate(roomId, { availability: { status: 'booked', availableFrom: currentDate } });

        res.status(201).json(booking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export async function getRoomBookings(req, res) {
    try {
        const bookings = await Booking.find({ roomId: req.params.id }).populate('userId').populate('roomId');
        if (bookings.length === 0) {
            return res.status(404).json({ message: 'No bookings found for this room' });
        }
        const formattedBookings = bookings.map(booking => ({
            bookingId: booking._id,
            bookingStatus: booking.status,
            totalAmount: booking.roomId ? booking.roomId.price : 0,
            tenant: {
                name: booking.userId ? `${booking.userId.firstName} ${booking.userId.lastName}` : null,
                email: booking.userId ? booking.userId.email : null,
                phone: booking.userId ? booking.userId.phoneNumber : null
            },
            checkIn: formatDate(booking.checkIn),
            checkOut: formatDate(booking.checkOut),
            createdAt: formatDate(booking.createdAt)
        }));
        res.json(formattedBookings);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export async function getAllBookings(req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const totalBookings = await Booking.countDocuments();
        const totalPages = Math.ceil(totalBookings / limit);

        const bookings = await Booking.find()
            .populate('userId')
            .populate('roomId')
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 }); // Sort by newest first

        const formattedBookings = bookings.map(booking => ({
            bookingId: booking._id,
            roomId: booking.roomId ? booking.roomId._id : null,
            roomName: booking.roomId ? booking.roomId.name : null,
            checkIn: formatDate(booking.checkIn),
            checkOut: formatDate(booking.checkOut),
            status: booking.status,
            totalAmount: booking.roomId ? booking.roomId.price : 0,
            tenant: {
                name: booking.userId ? `${booking.userId.firstName} ${booking.userId.lastName}` : null,
                email: booking.userId ? booking.userId.email : null,
                phone: booking.userId ? booking.userId.phoneNumber : null
            },
            createdAt: formatDate(booking.createdAt)
        }));

        res.json({
            bookings: formattedBookings,
            pagination: {
                currentPage: page,
                totalPages,
                totalItems: totalBookings,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1,
                limit
            }
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export async function updateBookingStatus(req, res) {
    try {
        const { status } = req.body;
        if (!status) {
            return res.status(400).json({ message: 'Status is required' });
        }
        const booking = await Booking.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.json(booking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export async function getBookingById(req, res) {
    try {
        const booking = await Booking.findById(req.params.id).populate('userId').populate('roomId');
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        const formattedBooking = {
            bookingId: booking._id,
            roomId: booking.roomId ? booking.roomId._id : null,
            roomName: booking.roomId ? booking.roomId.name : null,
            checkIn: formatDate(booking.checkIn),
            checkOut: formatDate(booking.checkOut),
            status: booking.status,
            totalAmount: booking.roomId ? booking.roomId.price : 0,
            tenant: {
                name: booking.userId ? `${booking.userId.firstName} ${booking.userId.lastName}` : null,
                email: booking.userId ? booking.userId.email : null,
                phone: booking.userId ? booking.userId.phoneNumber : null
            },
            createdAt: formatDate(booking.createdAt)
        };
        res.json(formattedBooking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}