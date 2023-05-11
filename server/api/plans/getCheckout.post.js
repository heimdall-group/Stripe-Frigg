import Stripe from 'stripe';
import { getAuth } from 'firebase-admin/auth';
import Users from '~/server/dbModels/user';

const stripe = new Stripe(useRuntimeConfig().stripe_secret);

export default defineEventHandler(async (event) => {
  const {priceID, token} = await readBody(event);
  const res = await getAuth().verifyIdToken(token);
  const user = await Users.findOne({user_uid: res.uid});
  try {
    if (res) {
      const prices = await stripe.prices.retrieve(priceID);
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card',],
        mode: 'subscription',
        customer: user.stripe_customerID,
        success_url: `${useRuntimeConfig().domain_url}/register/summary-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${useRuntimeConfig().domain_url}/register/step-2`,
        line_items: [
          {
            price: prices.id,
            quantity: 1,
          }
        ]
      })
      return {
        data: session.url,
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
  
});
