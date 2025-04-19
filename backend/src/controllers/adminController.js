import User from '../models/User.js';
import Room from '../models/Room.js';
import Booking from '../models/Booking.js';
import Payment from '../models/Payment.js';

export async function getDashboard(req, res) {
    try {
        const totalRooms = await Room.countDocuments();
        const totalBookings = await Booking.countDocuments();
        const totalUsers = await User.countDocuments();
        const recentBookings = await Booking.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .populate('userId roomId');

        const revenue = await Payment.aggregate([
            { $match: { status: 'completed' } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);

        res.json({
            totalRooms,
            totalBookings,
            totalUsers,
            recentBookings,
            totalRevenue: revenue[0]?.total || 0
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getRevenueStats(req, res) {
    try {
        const monthlyRevenue = await Payment.aggregate([
            { $match: { status: 'completed' } },
            {
                $group: {
                    _id: {
                        year: { $year: '$createdAt' },
                        month: { $month: '$createdAt' }
                    },
                    revenue: { $sum: '$amount' }
                }
            },
            { $sort: { '_id.year': -1, '_id.month': -1 } }
        ]);

        res.json(monthlyRevenue);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}