import Room from '../models/Room.js';
import { formatDate, timeAgo } from '../utils/dateUtils.js';
import { v4 as uuid } from 'uuid';
import { deleteFromSupabase } from '../services/imageDelete.js';

export async function getAllRooms(_, res) {
    try {
        const rooms = await Room.find();
        const formattedRooms = rooms.map(room => ({
            roomId: room._id,
            name: room.name,
            details: {
                surfaceArea: room.details.surfaceArea,
                numberOfRooms: room.details.numberOfRooms,
                numberOfBedrooms: room.details.numberOfBedrooms,
                numberOfBathrooms: room.details.numberOfBathrooms,
                toilets: room.details.toilets,
                furnished: room.details.furnished
            },
            price: {
                currency: room.price.currency,
                pricePerMonth: room.price.pricePerMonth,
                serviceCostsAndUtilities: room.price.serviceCostsAndUtilities,
                deposit: room.price.deposit
            },
            roomCategory: room.roomCategory,
            posted: timeAgo(room.createdAt),
            address: `${room.address.location}, ${room.address.city}, ${room.address.region}, ${room.address.country}`,
            availabilityStatus: room.availability.status,
            availableFrom: room.availability.status === 'booked' ? formatDate(room.availability.availableFrom) : "Today",
            images: room.images
        }));
        res.json(formattedRooms);
        // res.json(rooms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getRoom(req, res) {
    try {
        const room = await Room.findById(req.params.id);
        res.json(room);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export async function createRoom(req, res) {
    try {
        const { name, details, price, availability, address, images, roomCategory } = req.body;
        const roomId = uuid();
        const room = await Room.create({
            roomId: roomId,
            name,
            details,
            price,
            availability,
            address,
            roomCategory,
            images: images || []
        });

        res.status(201).json(room);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export async function updateRoom(req, res) {
    try {
        const { name, details, price, availability, address, images, roomCategory } = req.body;

        const existingRoom = await Room.findById(req.params.id);
        if (!existingRoom) {
            return res.status(404).json({ message: "Room not found" });
        }

        const roomId = existingRoom.roomId;
        const updatedImages = images.concat(existingRoom.images);

        const room = await Room.findByIdAndUpdate(
            req.params.id, {
            roomId: roomId,
            name,
            details,
            price,
            availability,
            address,
            roomCategory,
            images: updatedImages
        },
            {
                new: true,
                runValidators: true
            });

        res.json(room);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: "Error updating room" });
    }
}

export async function deleteRoom(req, res) {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }
        const imageUrls = room.images || [];

        if (imageUrls.length > 0) {
            await deleteFromSupabase(imageUrls);
        }
        await Room.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}