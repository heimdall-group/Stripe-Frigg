import Stripe from 'stripe';
import Users from '~/server/dbModels/user';
import { createHmac } from 'crypto';

const stripe = new Stripe(useRuntimeConfig().stripe_secret);

// Set status = expired
const handleSubscriptionDeleted = (subscription, customer) => {
  console.log('handleSubscriptionDeleted')
  const document = Users.findOneAndUpdate(
    { stripe_customerID: customer },
    { stripe_status: 'expired' }
  );
  document.save();
};
// Set status = active
// Index plan
const handleSubscriptionCreated = (subscription, customer) => {
  console.log('handleSubscriptionCreated')
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
  console.log('handleSubscriptionUpdated')
  const document = Users.findOneAndUpdate(
    { stripe_customerID: customer },
    { 
      stripe_plan: subscription, 
    }
  );
  document.save();
};

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const secret = await useRuntimeConfig().stripe_webhook_secret;
  const extracted_signature = await getRequestHeader(event, 'stripe-signature');

  if (extracted_signature) {
    const extracted_signature_arr = extracted_signature.split(',');
    const extracted_signature_obj = {
      time_stamp: extracted_signature_arr[0],
      signatures: {
        version: extracted_signature_arr[1].split('=')[0],
        key: extracted_signature_arr[1].split('=')[1],
      },
    }
  
    const signed_payload = `${extracted_signature_obj.time_stamp}.${JSON.stringify(body)}`;
    const hmac = createHmac('sha256', secret);
    hmac.update(signed_payload);
    const expected_signature = 'v1=' + hmac.digest('hex')

    if(extracted_signature_obj.signatures.version === 'v0') {
      throw createError({statusMessage: 'Invalid schema', statusCode: 400})
    }
    console.log(expected_signature);
    console.log(extracted_signature.split(',')[1]);
    if(extracted_signature.split(',')[1] === expected_signature) {

    } else {
      throw createError({ statusCode: 400, statusMessage: `Error validating Webhook Event` });
    }
  } else {
    throw createError({ statusCode: 400, statusMessage: 'Webhook Error: No stripe signature in header' });
  }

  let subscription;
  let status;
  let customer;
  switch (body.type) {
    case 'customer.subscription.deleted':
      subscription = body.data.object;
      status = subscription.status;
      customer = body.customer;
      handleSubscriptionDeleted(subscription, customer);
      break;
    case 'customer.subscription.created':
      subscription = body.data.object;
      status = subscription.status;
      customer = body.customer;
      handleSubscriptionCreated(subscription, customer);
      break;
    case 'customer.subscription.updated':
      subscription = body.data.object;
      status = subscription.status;
      customer = body.customer;
      // Then define and call a method to handle the subscription update.
      handleSubscriptionUpdated(subscription, customer);
      break;
  }
  // Return a 200 response to acknowledge receipt of the event
  return 200;
});
