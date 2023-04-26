import { Users } from '../user.js'
import { UnsortedCustomerIDs } from '../unsortedCustomerIDs.js';

export const stripe_handleSubscriptionDeleted = async (subscription, customer) => {
  const document = await Users.findOneAndUpdate(
    { stripe_customerID: customer },
    { stripe_status: 'expired' }
  );
  if (document !== null) {
    document.save();
  } else {
    const document = new UnsortedCustomerIDs({stripe_customerID: customer, stripe_plan: subscription})
    document.save()
  }
};

export const stripe_handleSubscriptionCreated = async (subscription, customer) => {
  const document = await Users.findOneAndUpdate(
    { stripe_customerID: customer },
    { 
      stripe_status: 'active',
      stripe_plan: subscription, 
    }
  );
  if (document !== null) {
    document.save();
  } else {
    const document = new UnsortedCustomerIDs({stripe_customerID: customer, stripe_plan: subscription})
    document.save()
  }
};

export const stripe_handleSubscriptionUpdated = async (subscription, customer) => {
  let payload;

  if (subscription.data.object.cancel_at_period_end) {
    payload = { 
      stripe_status: 'canceled',
      stripe_plan: subscription, 
    }
  } else {
    payload = { 
      stripe_plan: subscription, 
    }
  }

  const document = await Users.findOneAndUpdate(
    { stripe_customerID: customer },
    payload
  );
  if (document !== null) {
    document.save();
  } else {
    const document = new UnsortedCustomerIDs({stripe_customerID: customer, stripe_plan: subscription})
    document.save()
  }
};
