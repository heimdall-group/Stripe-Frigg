import Stripe from 'stripe';
import { getAuth } from 'firebase-admin/auth';
import Users from '~/server/models/user';

const instance = new Stripe(useRuntimeConfig().stripe_secret);

export default defineEventHandler(async (event) => {
  const { token } = await readBody(event);
  const result = await getAuth().verifyIdToken(token);
  try {
    if (result) {
      const {stripe_customerID} = await Users.findOne({user_uid: result.uid});
      const stripe = await instance.customers.del(stripe_customerID);
      const firebase = await getAuth().deleteUser(result.uid);
      const mongo = await Users.findOneAndDelete({user_uid: result.uid})
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
    console.log(err)
    return {
      data: false,
      success: false,
      message: 'Catch Error',
      code: 400,
    }
  }
 })