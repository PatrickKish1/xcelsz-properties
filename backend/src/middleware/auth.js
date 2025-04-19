import pkg from 'jsonwebtoken';
import Admin from '../models/Admin.js';

const { verify } = pkg;

export async function authenticateAdmin(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Authentication required' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = verify(token, process.env.JWT_SECRET);
        const adminId = decoded.adminId;

        const admin = await Admin.findById(decoded.adminId);
        if (!admin) {
            return res.status(401).json({ message: 'Admin not found' });
        }

        req.admin = admin;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
}

export async function getIdFromToken(req, res) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Authentication required' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = verify(token, process.env.JWT_SECRET);
        const adminId = decoded.adminId;
        return adminId;
    } catch (error) {
        return null;
    }
}