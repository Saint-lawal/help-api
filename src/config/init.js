import env from 'dotenv';
import mongoose from 'mongoose';

// configure app to use .env
env.config();

const db = process.env.USER === 'travis' ? process.env.MONGO_URL : process.env.MONGO_TEST;

mongoose.connect(db);

mongoose.connection.once('connected', () => {
  mongoose.connection.db.dropDatabase((err) => {
    console.log('Dropped Database.');
    process.exit(0);
  });
});