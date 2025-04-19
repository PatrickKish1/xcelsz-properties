import { find, findById, create, findByIdAndUpdate, findByIdAndDelete } from '../models/User.js';

export async function getAllUsers(req, res) {
    try {
        const users = await find();
        res.status(200).json({
            status: 'success',
            results: users.length,
            data: {
                users
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
}

export async function getUser(req, res) {
    try {
        const user = await findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                user
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
}

export async function createUser(req, res) {
    try {
        const newUser = await create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                user: newUser
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
}

export async function updateUser(req, res) {
    try {
        const user = await findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: 'success',
            data: {
                user
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
}

export async function deleteUser(req, res) {
    try {
        await findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
}