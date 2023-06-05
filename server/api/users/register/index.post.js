import Stripe from 'stripe';
import { getAuth } from 'firebase-admin/auth';
import Users from '~/server/models/user';

const stripe = new Stripe(useRuntimeConfig().stripe_secret);

export default defineEventHandler(async (event) => {
  const { token, uid, email, } = await readBody(event);
  const result = await getAuth().verifyIdToken(token);
  if (result) {
    const customer = await stripe.customers.create({
      email: result.email,
    });
    const insert = new Users(  {
      user_uid: uid,
      user_email: email,      
      register_step: 2,
      stripe_customerID: customer.id,
    });
    try {
      await insert.save();
      return {
        data: true,
        success: true,
      }
    } catch {
      console.log(err)
      return {
        data: false,
        success: false,
        message: 'Catch Error',
        code: 400,
      }
    }
  }
 })