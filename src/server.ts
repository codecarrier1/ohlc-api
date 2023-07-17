import app from './app';
import mongoose from 'mongoose';

require('dotenv').config();

const PORT = process.env.PORT || 3000;

// mongoose.connect(process.env.MONGODB_CONNECTION ?? '');
// const db = mongoose.connection;

// db.on('error', () => console.error('DB connection error'));
// db.once('open', async () => {
//   console.log('Connected to database');

// });

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
