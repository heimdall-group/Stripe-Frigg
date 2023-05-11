import Stripe from 'stripe';
import { getAuth } from 'firebase-admin/auth';
import Users from '~/server/dbModels/user';

const stripe = new Stripe(useRuntimeConfig().stripe_secret);

export default defineEventHandler(async (event) => {
  const { token } = await readBody(event);
  const res = await getAuth().verifyIdToken(token);
  try {
    if (res) {
      const customer = await stripe.customers.create({
        email: res.email,
      });
      const document = await Users.findOneAndUpdate({user_uid: res.uid}, {stripe_customerID: customer.id})
      document.save();
      return {
        data: true,
        success: true,
      }
    } else {
      return {
        data: false,
        success: false,
        message: 'User not authenticated',
        code: 400,
      }
    }
  } catch (err) {
    return err
  }
  
});
