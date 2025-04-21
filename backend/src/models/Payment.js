import { Schema, model } from 'mongoose';

const paymentSchema = new Schema({
    bookingId: { type: Schema.Types.ObjectId, ref: 'Booking', required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
    paymentMethod: { type: String },
    reference: { type: String },
    createdAt: { type: Date, default: Date.now }
});

// export async function createPayment(paymentData) {
//     const payment = new this(paymentData);
//     return await payment.save();
// };

// export async function updatePayment(paymentId, updateData) {
//     return await this.findOneAndUpdate({ paymentId }, updateData, { new: true });
// };

// export async function deletePayment(paymentId) {
//     return await this.findOneAndDelete({ paymentId });
// }

// export async function findOne(query) {
//     return await this.findOne(query);
// }

paymentSchema.statics.createPayment = async function (paymentData) {
    const payment = new this(paymentData);
    return await payment.save();
};

const Payment = model('Payment', paymentSchema);

export default Payment;