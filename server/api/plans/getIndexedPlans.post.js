import Plans from '~/server/dbModels/plans';

export default defineEventHandler(async (event) => {
  const document = await Plans.findOne({ plan_id: 1 });
  return {
    data: {
      stripe_plans: document.stripe_plans,
      stripe_currencies: document.stripe_currencies,
    },
    success: true,
  }
});
