import { Users } from '../user.js'

export const stripe_handleSubscriptionDeleted = (subscription, customer) => {
  console.log('handleSubscriptionDeleted')
  const document = Users.findOneAndUpdate(
    { stripe_customerID: customer },
    { stripe_status: 'expired' }
  );
  document.save();
};

export const stripe_handleSubscriptionCreated = (subscription, customer) => {
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

export const stripe_handleSubscriptionUpdated = (subscription, customer) => {
  console.log('handleSubscriptionUpdated')
  const document = Users.findOneAndUpdate(
    { stripe_customerID: customer },
    { 
      stripe_plan: subscription, 
    }
  );
  document.save();
};
