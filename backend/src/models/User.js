import { Schema, model } from 'mysql2ose';

const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

export const find = async (query) => {
    return await User.find(query);
};

export const findById = async (id) => {
    return await User.findById(id);
};

export const findByIdAndUpdate = async (id, updateData, options = { new: true }) => {
    return await User.findByIdAndUpdate(id, updateData, options);
};

export const findByIdAndDelete = async (id) => {
    return await User.findByIdAndDelete(id);
};
export const create = async (userData) => {
    const user = new User(userData);
    await user.save();
    return user;
};

const User = model('User', userSchema);

export default User;