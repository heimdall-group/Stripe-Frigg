import Stripe from 'stripe';
import { getAuth } from 'firebase-admin/auth';
import Users from '~/server/dbModels/user';

const stripe = new Stripe(useRuntimeConfig().stripe_secret);

export default defineEventHandler(async (req) => {
  const body = await readBody(req)
  let event = body;
  // Replace this endpoint secret with your endpoint's unique secret
  // If you are testing with the CLI, find the secret by running 'stripe listen'
  // If you are using an endpoint defined with the API or dashboard, look in your webhook settings
  // at https://dashboard.stripe.com/webhooks
  const endpointSecret = useRuntimeConfig().stripe_webhook_secret;
  // Only verify the event if you have an endpoint secret defined.
  // Otherwise use the basic event deserialized with JSON.parse
  if (endpointSecret) {
    // Get the signature sent by Stripe
    const signature = event.headers['stripe-signature'];
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        endpointSecret
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
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
      // Then define and call a method to handle the subscription deleted.
      // handleSubscriptionDeleted(subscriptionDeleted);

      // This only gets called when subscription expires
      // Set stauts = expired
      break;
    case 'customer.subscription.created':
      subscription = event.data.object;
      status = subscription.status;
      customer = event.customer;
      console.log(`Subscription status is ${status}.`);
      // Then define and call a method to handle the subscription created.
      // handleSubscriptionCreated(subscription);

      // This only gets called when user creates subscription
      // Set status = active
      break;
    case 'customer.subscription.updated':
      subscription = event.data.object;
      status = subscription.status;
      customer = event.customer;
      console.log(`Subscription status is ${status}.`);
      // Then define and call a method to handle the subscription update.
      // handleSubscriptionUpdated(subscription);
      
      // This only gets called when user creates subscription
      // change plan
      break;
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
  }
  // Return a 200 response to acknowledge receipt of the event
  return 200
});
