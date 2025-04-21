import { Schema, model } from 'mongoose';
import { v4 as uuid } from 'uuid';


const adminSchema = new Schema({
    adminId: { type: String, default: uuid, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Admin = model('Admin', adminSchema);

export default Admin;

export async function findOne(query) {
    return Admin.findOne(query);
}

export async function create(data) {
    return Admin.create(data);
}

export async function findByIdAndUpdate(id, data) {
    return Admin.findByIdAndUpdate(id, data, { new: true });
}

export async function findByIdAndDelete(id) {
    return Admin.findByIdAndDelete(id);
}