import request from 'supertest';
import app from '../app';
import * as db from './db';
import { DUMMY_ITEMS } from './constants';
import { calculateMovingAverage } from '../utils';

describe('API Endpoint Tests', () => {
  beforeAll(async () => {
    await db.connect();

    await Promise.all(
      DUMMY_ITEMS.map(async (record) => {
        await request(app).post('/api/insert').send(record);
      })
    );
  });
  afterEach(async () => {
    // await db.clearDatabase();
  });
  afterAll(async () => {
    await db.closeDatabase();
  });

  // Test case for POST /api/insert
  describe('POST /api/insert', () => {
    test('should insert OHLC data and return 201 status', async () => {
      const response = await request(app).post('/api/insert').send({
        timestamp: '2021-09-01T08:00:00Z',
        open: 1.83,
        high: 9.13,
        low: 1.49,
        close: 8.04,
      });

      expect(response.status).toBe(201);
      expect(response.body.message).toEqual('Data inserted successfully');
    }, 10000);
  });

  // Test case for GET /api/average?window=last_5_items
  describe('GET /api/average?window=last_5_items', () => {
    it('should return the moving average of the last 5 items', async () => {
      const response = await request(app).get(
        '/api/average?window=last_5_items'
      );
      const correctAvg = calculateMovingAverage(DUMMY_ITEMS.slice(0, 5));

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('average');
      expect(response.body.average).toEqual(correctAvg);
    });
  });

  // Test case for GET /api/average?window=last_24_hours
  describe('GET /api/average?window=last_24_hours', () => {
    it('should return the moving average of the last 24 hours', async () => {
      const response = await request(app).get(
        '/api/average?window=last_24_hours'
      );
      const correctAvg = calculateMovingAverage(
        DUMMY_ITEMS.filter(
          (item) =>
            new Date(item.timestamp).getTime() >=
            Date.now() - 1000 * 60 * 60 * 24
        )
      );
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('average');
      expect(response.body.average).toEqual(correctAvg);
    });
  });
});
