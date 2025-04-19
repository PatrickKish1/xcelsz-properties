import bcrypt from 'bcryptjs';
import pkg from 'jsonwebtoken';
import { findOne, create } from '../models/Admin.js';
import { getIdFromToken } from '../middleware/auth.js';

const { sign } = pkg;

export async function login(req, res) {
    try {
        const { username, password } = req.body;

        const admin = await findOne({ username });
        if (!admin) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = sign(
            { adminId: admin._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function register(req, res) {
    try {
        const { username, password, email } = req.body;

        const existingAdmin = await findOne({ $or: [{ username }, { email }] });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const admin = await create({
            username,
            password: hashedPassword,
            email
        });

        const adminData = {
            username: admin.username,
            email: admin.email,
            createdAt: admin.createdAt
        };

        res.status(201).json({ message: "Admin created successfully", admin: adminData });
        // res.status(201).json({ message: adminData });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export async function changePassword(req, res) {
    try {
        const { currentPassword, newPassword } = req.body;
        const adminId = await getIdFromToken(req, res);

        const admin = await findOne({ _id: adminId });
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        const isPasswordValid = await bcrypt.compare(currentPassword, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Current password is incorrect' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 12);
        admin.password = hashedPassword;
        await admin.save();

        res.json({ message: 'Password changed successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}