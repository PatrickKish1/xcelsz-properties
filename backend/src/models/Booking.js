import { Schema, model } from 'mongoose';

const bookingSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    roomId: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
    phoneNumber: { type: String, required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending' },
    createdAt: { type: Date, default: Date.now }
});

bookingSchema.statics.getAllBookings = async function () {
    return await this.find().populate('roomId').populate('userId').exec();
};

bookingSchema.statics.getRoomBookings = async function (roomId) {
    return await this.find({ roomId }).populate('roomId').populate('userId').exec();
};

bookingSchema.statics.findByIdAndUpdateBooking = async function (bookingId, updateData) {
    return await this.findOneAndUpdate({ _id: bookingId }, updateData, { new: true });
};

bookingSchema.statics.findByIdWithPopulate = async function (bookingId) {
    return await this.findOne({ _id: bookingId }).populate('roomId').populate('userId').exec();
};

bookingSchema.statics.findUpcomingRentDue = async function (query) {
    return await this.find(query).populate('roomId').populate('userId').exec();
};

const Booking = model('Booking', bookingSchema);

export default Booking;
