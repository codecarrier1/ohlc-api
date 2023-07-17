import mongoose from 'mongoose';
import { IOHLCRecord } from '../interfaces/ohlc';

const OHLCRecordSchema = new mongoose.Schema<IOHLCRecord>(
  {
    timestamp: { type: Date, required: true },
    open: { type: Number, required: true },
    high: { type: Number, required: true },
    low: { type: Number, required: true },
    close: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const OHLCRecord = mongoose.model('OHLCRecord', OHLCRecordSchema);

export default OHLCRecord;
