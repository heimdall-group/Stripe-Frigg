import { getAuth } from 'firebase-admin/auth';
import Plans from '~/server/models/plans';

export default defineEventHandler(async (event) => {
	const { token} = await readBody(event);
  try {
    const user = await getAuth().verifyIdToken(token);
    if (user) {
      const data = await $fetch('/api/plans/get/plans', {
        method: 'POST',
        body: {
          token: token,
        }
      });
      if (data.success) {
        const currencies = Object.keys(data.data[0].prices);
        const document = await Plans.findOneAndUpdate({plan_id: 1}, {stripe_plans: data.data, stripe_currencies: currencies});
        if (document == null) {
          const document = await new Plans({stripe_plans: data.data, plan_id: 1, stripe_currencies: currencies})
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
      } else {
        return {
          data: false,
          success: false,
          message: 'User not authenticated',
          code: 400,
        }
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


 })