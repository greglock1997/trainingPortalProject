const request = require('supertest');
const app = require('../server.js');

describe('GET /check-auth', () => {
    it('reponds with JSON message', async () => {
        const response = await request(app).get('/check-auth');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Check-auth request received' });
    })
})