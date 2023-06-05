import Stripe from 'stripe';
import { getAuth } from 'firebase-admin/auth';
import Users from "~~/server/models/user";
import Plans from '~/server/models/plans';

const stripe = new Stripe(useRuntimeConfig().stripe_secret);

export default defineEventHandler(async (event) => {
  const { token } = await readBody(event);
  const result = await getAuth().verifyIdToken(token);

  if (result) {
    const { user_ranks } = await Users.findOne({user_uid: result.uid});
    if (user_ranks.includes('Admin')) {
      try {
        const arr = [];
        const { data } = await stripe.prices.list({
          expand: ['data.product'],
          limit: 12,
          active: true,
        });
        for (const price of data) {
          const { id, name, metadata } = price.product;
          const itemIndex = arr.findIndex((item) => item.id === id);
  
          let currentItem;
  
          if (itemIndex === -1) {
            currentItem = {
              id: id,
              name: name,
              perks: JSON.parse(metadata.perks),
              prices: {},
            };
            arr.push(currentItem);
          } else {
            currentItem = arr[itemIndex];
          }
  
          const { unit_amount } = price;
          const currency = price.currency.toUpperCase();
          const interval =
            price.recurring.interval === 'year' ? 'annual' : 'monthly';
  
          if (currentItem.prices[currency] === undefined) {
            currentItem.prices[currency] = {
              annual: {},
              monthly: {},
            };
          }
          currentItem.prices[currency].currency = currency;
          currentItem.prices[currency][interval].id = price.id;
          currentItem.prices[currency][interval].amount = (
            unit_amount / 100
          ).toLocaleString('sv', { style: 'currency', currency: currency });
  
          if (interval === 'annual') {
            currentItem.prices[currency][interval].monthly = (
              unit_amount /
              100 /
              12
            ).toLocaleString('sv', { style: 'currency', currency: currency });
          }
        }
        arr.reverse();
        const currencies = Object.keys(arr[0].prices);
        const document = await Plans.findOneAndUpdate({plan_id: 1}, {stripe_plans: arr, stripe_currencies: currencies});
        if (document == null) {
          const document = await new Plans({stripe_plans: arr, plan_id: 1, stripe_currencies: currencies})
          if (document !== null) {
            document.save();
            return {
              data: true,
              success: true,
            }
          }
        } else {
          return {
            data: true,
            success: true,
          }
        }
      } catch (err) {
        console.log(err);
        return {
          data: false,
          success: false,
          message: 'Catch Error',
          code: 400,
        };
      }
    } else {
      return {
        data: false,
        success: false,
        message: 'User not authenticated',
        code: 400,
      };
    }
  } else {
    return {
      data: false,
      success: false,
      message: 'User not authenticated',
      code: 400,
    };
  }
});
