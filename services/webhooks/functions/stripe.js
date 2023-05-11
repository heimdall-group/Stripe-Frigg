import { Users } from '../user.js'
import Stripe from 'stripe';
import env from 'dotenv';

env.config();
const stripe_api_key = process.env.STRIPE_SECRET_KEY;
const stripe = Stripe(stripe_api_key);

const stripe_getPlanName = async (productID) => {
  const { name } = await stripe.products.retrieve(productID)
  return name;
}

export const stripe_handleInvoiceUpdated = async () => {
  
};

export const stripe_handleSubscriptionDeleted = async (subscription, customer) => {
  const document = await Users.findOneAndUpdate(
    { stripe_customerID: customer },
    { stripe_status: 'expired' }
  );
  document.save()
};

export const stripe_handleSubscriptionCreated = async (subscription, customer) => {
  const document = await Users.findOneAndUpdate(
    { stripe_customerID: customer },
    { 
      stripe_status: 'active',
      stripe_plan: subscription, 
      stripe_plan_name: await stripe_getPlanName(subscription.items.data[0].plan.product)
    }
  );
  document.save();
};

export const stripe_handleSubscriptionUpdated = async (subscription, customer) => {
  let payload;

  if (subscription.cancel_at_period_end) {
    payload = { 
      stripe_status: 'canceled',
      stripe_plan: subscription,
      stripe_plan_name: await stripe_getPlanName(subscription.items.data[0].plan.product)
    }
  } else {
    payload = { 
      stripe_status: 'active',
      stripe_plan: subscription, 
      stripe_plan_name: await stripe_getPlanName(subscription.items.data[0].plan.product)
    }
  }

  const document = await Users.findOneAndUpdate(
    { stripe_customerID: customer },
    payload
  );
  document.save()
};
