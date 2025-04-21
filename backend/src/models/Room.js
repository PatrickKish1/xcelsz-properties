import { Schema, model } from 'mongoose';

const roomSchema = new Schema({
    roomId: { type: String, required: true },
    name: { type: String, required: true },
    details: {
        surfaceArea: { type: Number },
        numberOfRooms: { type: Number },
        numberOfBedrooms: { type: Number },
        numberOfBathrooms: { type: Number },
        toilets: { type: Number },
        furnished: { type: Boolean }
    },
    price: {
        currency: { type: String },
        pricePerMonth: { type: Number },
        serviceCostsAndUtilities: { type: Number },
        deposit: { type: Number },
    },
    availability: {
        status: { type: String, enum: ['available', 'booked'], default: 'available' },
        availableFrom: { type: Date }
    },
    roomCategory: {
        type: String,
        enum: ['Short Stay', 'For Sale', 'Normal Rent', 'Shared Housing', 'Hostel'],
        default: 'Normal Rent'
    },
    address: {
        location: { type: String },
        city: { type: String },
        region: { type: String },
        country: { type: String, enum: ['GH', 'SL'], default: 'GH' }
    },
    images: [{ type: String }],
    createdAt: { type: Date, default: Date.now }
});

const Room = model('Room', roomSchema);

export default Room;