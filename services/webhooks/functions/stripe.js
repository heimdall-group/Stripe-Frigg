import { Users } from '../user.js'

export const stripe_handleSubscriptionDeleted = async (subscription, customer) => {
  console.log('handleSubscriptionDeleted')
  console.log(customer);
  const document = await Users.findOneAndUpdate(
    { stripe_customerID: customer },
    { stripe_status: 'expired' }
  );
  console.log(document)
  document.save();
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
  console.log(document)
  document.save();
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
  console.log(document)
  docudocumentment.save();
};
