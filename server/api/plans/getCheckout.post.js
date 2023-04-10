import Stripe from 'stripe';
import { getAuth } from 'firebase-admin/auth';

const stripe = new Stripe(useRuntimeConfig().stripe_secret);

export default defineEventHandler(async (event) => {
  const {priceID, token} = await readBody(event);
  const res = await getAuth().verifyIdToken(token);
  try {
    if (res) {
      const prices = await stripe.prices.retrieve(priceID);
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card',],
        mode: 'subscription',
        success_url: `${useRuntimeConfig().domain_url}/register/summary-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${useRuntimeConfig().domain_url}/register/summary-error`,
        line_items: [
          {
            price: prices.id,
            quantity: 1,
          }
        ]
      })
      return session.url;
    } else {
      return 'user not authenticated'
    }
  } catch (err) {
    return err
  }
  
});
