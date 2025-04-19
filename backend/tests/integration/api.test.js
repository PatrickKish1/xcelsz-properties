import request from 'supertest';
import app from '../src/app.js';
import { v4 as uuid } from 'uuid';

describe('GET /', () => {
  it('should return Hello World', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe('Hello World!');
  });
});
describe('GET /api/rooms', () => {
    it('should return a list of rooms', async () => {
        const res = await request(app).get('/api/rooms');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });
});

describe('POST /api/rooms', () => {
    it('should create a new room', async () => {
        const newRoom = { name: 'Conference Room', capacity: 10 };
        const res = await request(app)
            .post('/api/rooms')
            .send(newRoom);
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.name).toBe(newRoom.name);
        expect(res.body.capacity).toBe(newRoom.capacity);
    });
});

describe('GET /api/rooms/:id', () => {
    it('should return a single room', async () => {
        const roomId = uuid;
        const res = await request(app).get(`/api/rooms/${roomId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id', roomId);
    });
});

describe('PUT /api/rooms/:id', () => {
    it('should update an existing room', async () => {
        const roomId = uuid;
        const updatedRoom = { name: 'Updated Room', capacity: 20 };
        const res = await request(app)
            .put(`/api/rooms/${roomId}`)
            .send(updatedRoom);
        expect(res.statusCode).toEqual(200);
        expect(res.body.name).toBe(updatedRoom.name);
        expect(res.body.capacity).toBe(updatedRoom.capacity);
    });
});

describe('DELETE /api/rooms/:id', () => {
    it('should delete an existing room', async () => {
        const roomId = uuid;
        const res = await request(app).delete(`/api/rooms/${roomId}`);
        expect(res.statusCode).toEqual(204);
    });
});
