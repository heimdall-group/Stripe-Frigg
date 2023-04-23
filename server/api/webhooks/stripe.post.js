import Stripe from 'stripe';
import { getAuth } from 'firebase-admin/auth';
import Users from '~/server/dbModels/user';

const stripe = new Stripe(useRuntimeConfig().stripe_secret);

// Set status = expired
const handleSubscriptionDeleted = (subscription, customer) => {
  const document = Users.findOneAndUpdate(
    { stripe_customerID: customer },
    { stripe_status: 'expired' }
  );
  document.save();
};
// Set status = active
// Index plan
const handleSubscriptionCreated = (subscription, customer) => {
  const document = Users.findOneAndUpdate(
    { stripe_customerID: customer },
    { 
      stripe_status: 'active',
      stripe_plan: subscription, 
    }
  );
  document.save();
};
// Index new plan
const handleSubscriptionUpdated = (subscription, customer) => {
  const document = Users.findOneAndUpdate(
    { stripe_customerID: customer },
    { 
      stripe_plan: subscription, 
    }
  );
  document.save();
};

export default defineEventHandler(async (req) => {
  const body = await readBody(req);
  let event = body;
  const endpointSecret = useRuntimeConfig().stripe_webhook_secret;
  if (endpointSecret) {
    const signature = req.headers['stripe-signature'];
    try {
      event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
    } catch (err) {
      return 400;
    }
  }
  let subscription;
  let status;
  let customer;
  switch (event.type) {
    case 'customer.subscription.deleted':
      subscription = event.data.object;
      status = subscription.status;
      customer = event.customer;
      console.log(`Subscription status is ${status}.`);
      handleSubscriptionDeleted(subscription, customer);
      break;
    case 'customer.subscription.created':
      subscription = event.data.object;
      status = subscription.status;
      customer = event.customer;
      console.log(`Subscription status is ${status}.`);
      handleSubscriptionCreated(subscription, customer);
      break;
    case 'customer.subscription.updated':
      subscription = event.data.object;
      status = subscription.status;
      customer = event.customer;
      console.log(`Subscription status is ${status}.`);
      // Then define and call a method to handle the subscription update.
      handleSubscriptionUpdated(subscription, customer);
      break;
  }
  // Return a 200 response to acknowledge receipt of the event
  return 200;
});
