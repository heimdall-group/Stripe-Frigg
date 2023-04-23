import Stripe from 'stripe';
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
  let event;
  const webhook_secret = await useRuntimeConfig().stripe_webhook_secret;
  if (webhook_secret) {
    const signature = await getRequestHeader(req, 'stripe-signature');
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhook_secret);
    }
    catch (err) {
      throw createError({ statusCode: 400, statusMessage: `Error validating Webhook Event` });
    }
  } else {
    throw createError({ statusCode: 400, statusMessage: 'Webhook Error: No stripe signature in header' });
  }

  let subscription;
  let status;
  let customer;
  switch (event.type) {
    case 'customer.subscription.deleted':
      subscription = event.data.object;
      status = subscription.status;
      customer = event.customer;
      handleSubscriptionDeleted(subscription, customer);
      break;
    case 'customer.subscription.created':
      subscription = event.data.object;
      status = subscription.status;
      customer = event.customer;
      handleSubscriptionCreated(subscription, customer);
      break;
    case 'customer.subscription.updated':
      subscription = event.data.object;
      status = subscription.status;
      customer = event.customer;
      // Then define and call a method to handle the subscription update.
      handleSubscriptionUpdated(subscription, customer);
      break;
  }
  // Return a 200 response to acknowledge receipt of the event
  return 200;
});
