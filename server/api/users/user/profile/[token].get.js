import { getAuth } from 'firebase-admin/auth';
import Stripe from 'stripe';
import Users from "~~/server/models/user";

const stripe = new Stripe(useRuntimeConfig().stripe_secret);

export default defineEventHandler(async (event) => {
  const { token } = event.context.params;
  const auth = await getAuth();
  const result = await auth.verifyIdToken(token);
  const uid = result.uid;
  try {
    if (result) {
      const document = await Users.findOne({user_uid: uid});
      const result = await auth.getUser(uid);
      const paymentMethods = await stripe.paymentMethods.list({
        customer: document.stripe_customerID,
        type: 'card',
      });
      return {
        data: {
          user_email: document.user_email,
          user_number: document.user_number,
          user_name: result.displayName,
          user_provider: result.providerData[0].providerId,
          email_verified: result.emailVerified,
          user_card: paymentMethods,
        },
        success: true,
      }
    } else {
      return {
        data: false,
        success: false,
        message: 'User not authenticated',
        code: 400,
      }
    }
  } catch (err) {
    console.log(err)
    return {
      data: false,
      success: false,
      message: 'Catch Error',
      code: 400,
    }
  }
 });

//  function getCards