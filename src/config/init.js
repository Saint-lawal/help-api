import env from 'dotenv';
import mongoose from 'mongoose';

// configure app to use .env
env.config();

mongoose.connect(process.env.MONGO_TEST);

mongoose.connection.once('connected', () => {
  mongoose.connection.db.dropDatabase((err) => {
    console.log('Dropped Database.');
    process.exit(0);
  });
});