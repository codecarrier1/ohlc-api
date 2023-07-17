import { Request, Response } from 'express';
import OHLCRecord from '../models/ohlc.model';
import { calculateMovingAverage } from '../utils';

const OHLCController = {
  insert: async (req: Request, res: Response) => {
    try {
      // Extract the OHLC data from the request body
      const { timestamp, open, high, low, close } = req.body;
      // Create a new OHLC record
      const record = new OHLCRecord({
        timestamp,
        open,
        high,
        low,
        close,
      });

      // Save the record to the database
      await record.save();

      res
        .status(201)
        .json({ message: 'Data inserted successfully', ...record.toJSON() });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  getAverage: async (req: Request, res: Response) => {
    try {
      const window = req.query.window;
      if (window === 'last_5_items') {
        // Retrieve the last 5 records from the database
        const records = await OHLCRecord.find()
          .sort({ timestamp: -1 })
          .limit(5);

        // Calculate the moving average
        const average = calculateMovingAverage(records);
        res.json({ average });
      } else if (window === 'last_24_hours') {
        // Calculate the start time for the past 24 hours
        const startTime = new Date(Date.now() - 24 * 60 * 60 * 1000);

        // Retrieve the records within the past 24 hours from the database
        const records = await OHLCRecord.find({
          timestamp: { $gte: startTime },
        });

        // Calculate the moving average
        const average = calculateMovingAverage(records);
        res.json({ average });
      } else {
        res.status(400).json({ error: 'Invalid window parameter' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

export default OHLCController;
