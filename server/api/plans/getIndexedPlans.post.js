import Plans from "~/server/dbModels/plans";

export default defineEventHandler(async (event) => {
  const document = await Plans.findOne({plan_id: 1})
  return document.stripe_plans;
 })