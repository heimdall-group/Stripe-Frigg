import { getAuth } from 'firebase-admin/auth';
import Plans from '~/server/dbModels/plans';

export default defineEventHandler(async (event) => {
	const { token} = await readBody(event);
  try {
    const user = await getAuth().verifyIdToken(token);
    if (user) {
      const data = await $fetch('/api/plans/getPlans', {
        method: 'POST',
      });
      const document = await Plans.findOneAndUpdate({plan_id: 1}, {stripe_plans: data});
      if (document == null) {
        const document = await new Plans({stripe_plans: data, plan_id: 1})
        if (document !== null) {
          document.save();
          return true
        }
      } else {
        return true
      }
    } else {
      return 'invalid token'
    }
  } catch (err) {
    return err;
  }


 })