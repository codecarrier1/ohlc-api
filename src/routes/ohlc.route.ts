import express from 'express';
import OHLCController from '../controllers/ohlc.controller';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     AverageResponse:
 *       type: object
 *       required:
 *         - average
 *       properties:
 *           average:
 *             type: number
 *             description: The average value of the OHLC records
 *       example:
 *           average: 5
 *     OHLCInput:
 *       type: object
 *       required:
 *         - timestamp
 *         - open
 *         - high
 *         - low
 *         - close
 *       properties:
 *         timestamp:
 *           type: string
 *           format: date
 *           description: The timestamp of the record
 *         open:
 *           type: number
 *           description: open value of the record
 *         high:
 *           type: number
 *           description: high value of the record
 *         low:
 *           type: number
 *           description: low value of the record
 *         close:
 *           type: number
 *           description: close value of the record
 *       example:
 *         timestamp: 2020-03-10T04:05:06.157Z
 *         open: 3
 *         high: 10
 *         low: 1
 *         close: 5
 *     OHLCRecord:
 *       type: object
 *       required:
 *         - timestamp
 *         - open
 *         - high
 *         - low
 *         - close
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         timestamp:
 *           type: string
 *           format: date
 *           description: The timestamp of the record
 *         open:
 *           type: number
 *           description: open value of the record
 *         high:
 *           type: number
 *           description: high value of the record
 *         low:
 *           type: number
 *           description: low value of the record
 *         close:
 *           type: number
 *           description: close value of the record
 *         message:
 *           type: string
 *           description: successful message
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the record was added
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The date the record was updated
 *       example:
 *         id: 64b534efa38a09068a8640c9
 *         timestamp: 2020-03-10T04:05:06.157Z
 *         open: 3
 *         high: 10
 *         low: 1
 *         close: 5
 *         message: Data inserted successfully
 *         createdAt: 2020-03-10T04:05:06.157Z
 *         updatedAt: 2020-03-10T04:05:06.157Z
 */

/**
 * @swagger
 * tags:
 *   name: OHLC
 *   description: The OHLC Records API
 * /insert:
 *   post:
 *     summary: Create a new record
 *     tags: [OHLCRecords]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OHLCInput'
 *     responses:
 *       201:
 *         description: The created record.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OHLCRecord'
 *       500:
 *         description: Some server error
 * /average?window=last_5_items:
 *   get:
 *     summary: Get average of last 5 items
 *     tags: [OHLCRecords]
 *     responses:
 *       200:
 *         description: The average value of the last 5 ohlc records
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AverageResponse'
 * /average?window=last_24_hours:
 *   get:
 *     summary: Get average of the records in the last 24 hours window
 *     tags: [OHLCRecords]
 *     responses:
 *       200:
 *         description: The average value of the records in the last 24 hours window
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AverageResponse'
 */

router.post('/insert', [], OHLCController.insert);
router.get('/average', [], OHLCController.getAverage);

export default router;
