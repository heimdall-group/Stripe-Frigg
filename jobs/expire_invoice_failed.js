import env from 'dotenv';
import mongoose from 'mongoose';
import { exit } from 'process';
import { parentPort } from 'worker_threads';
import Users from '#root/server/models/user.js';

env.config();

(async () => {
  if (parentPort) {
    const mongoose_key = process.env.MONGO_URL;
    const date = new Date().toLocaleDateString();
    (async function () {
      try {
        await mongoose.connect(mongoose_key);
      } catch (err) {
        exit(400)
      }
    })();

    try {
      const res = await Users.updateMany({stripe_expires_at: date}, {stripe_status: 'expired', stripe_expires_at: '0'})
    } catch (err) {

    }
    
    mongoose.connection.close()
    parentPort.postMessage('done');
  }
  else exit(400);
})();
