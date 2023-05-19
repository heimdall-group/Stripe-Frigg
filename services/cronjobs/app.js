import env from 'dotenv';
import Bree from 'bree';

env.config();

const bree = new Bree ({
  jobs: [
    {
      name: 'expire_invoice_failed',
      timeout: '1s',
    },
  ],
})

await bree.start();