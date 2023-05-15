import Stripe from 'stripe';
import env from 'dotenv';
import Users from '#root/server/models/user.js';

env.config();
const days = process.env.EXPIRE_UNPAID_INVOICE_DAYS
const stripe_api_key = process.env.STRIPE_SECRET_KEY;
const stripe = Stripe(stripe_api_key);


const stripe_getPlanName = async (productID) => {
  const { name } = await stripe.products.retrieve(productID)
  return name;
}

export const stripe_handleInvoicePaid = async (object, customer) => {
  const document = await Users.findOneAndUpdate(
    { stripe_customerID: customer },
    { stripe_status: 'active' }
  );
  document.save()
};

const getExpireDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + parseInt(days))
  return date.toLocaleDateString();
};

export const stripe_handleInvoiceFailed = async (object, customer) => {
  const document = await Users.findOneAndUpdate(
    { stripe_customerID: customer },
    { stripe_status: 'invoice-failed', stripe_expires_at: getExpireDate() }
  );
  document.save()
};

export const stripe_handleRequiresAction = async (object, customer) => {
  const document = await Users.findOneAndUpdate(
    { stripe_customerID: customer },
    { stripe_status: 'invoice-requires-action', stripe_expires_at: getExpireDate() }
  );
  document.save()
};

export const stripe_handleSubscriptionDeleted = async (object, customer) => {
  const document = await Users.findOneAndUpdate(
    { stripe_customerID: customer },
    { stripe_status: 'expired' }
  );
  document.save()
};

export const stripe_handleSubscriptionCreated = async (object, customer) => {
  const document = await Users.findOneAndUpdate(
    { stripe_customerID: customer },
    { 
      stripe_status: 'active',
      stripe_plan: object, 
      stripe_plan_name: await stripe_getPlanName(object.items.data[0].plan.product)
    }
  );
  document.save();
};

export const stripe_handleSubscriptionUpdated = async (object, customer) => {
  let payload;

  if (object.cancel_at_period_end) {
    payload = { 
      stripe_status: 'canceled',
      stripe_plan: object,
      stripe_plan_name: await stripe_getPlanName(object.items.data[0].plan.product),
    }
  } else {
    payload = { 
      stripe_status: 'active',
      stripe_plan: object, 
      stripe_plan_name: await stripe_getPlanName(object.items.data[0].plan.product),
    }
  }

  const document = await Users.findOneAndUpdate(
    { stripe_customerID: customer },
    payload
  );
  document.save()
};
