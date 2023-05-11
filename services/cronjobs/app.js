import env from 'dotenv';
import mongoose from 'mongoose';
import Bree from 'bree';
import Cabin from 'cabin';

env.config();

const mongoose_key = process.env.MONGO_URL;

(async function () {
  try {
    await mongoose.connect(mongoose_key);
    console.log('DB connection true');
  } catch (err) {
    console.error('DB connection false', err);
  }
})();

const bree = new Bree ({
  // logger: new Cabin(),
  jobs: [
    {
      name: 'expire_invoice_unpaid',
      // interval: '1s',
      timeout: '1s',
    },
  ],
})

await bree.start();