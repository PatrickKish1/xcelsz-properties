import express from 'express';
import { getAllRooms, getRoom } from '../controllers/roomController.js';

const router = express.Router();

router.get('/', getAllRooms);
router.get('/:id', getRoom);

export default router;