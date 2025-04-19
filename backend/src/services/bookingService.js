import Booking from '../models/Booking.js';

export const getAllBookings = async () => {
    return await Booking.getAllBookings();
};

export const getRoomBookings = async (roomId) => {
    return await Booking.getRoomBookings(roomId);
};

export const findByIdAndUpdateBooking = async (bookingId, updateData) => {
    return await Booking.findByIdAndUpdateBooking(bookingId, updateData);
};

export const findByIdWithPopulate = async (bookingId) => {
    return await Booking.findByIdWithPopulate(bookingId);
};