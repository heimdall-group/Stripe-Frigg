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
  console.log('handleSubscriptionCreated')
  console.log(customer);
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
  console.log('handleSubscriptionUpdated')
  console.log(customer);
  const document = await Users.findOneAndUpdate(
    { stripe_customerID: customer },
    { 
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
