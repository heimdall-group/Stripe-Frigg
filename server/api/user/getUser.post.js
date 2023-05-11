import { getAuth } from 'firebase-admin/auth';
import Users from "~~/server/dbModels/user";

export default defineEventHandler(async (event) => {
	const { token } = await readBody(event);
  const res = await getAuth().verifyIdToken(token);
  try {
    if (res) {
      const document = await Users.findOne({user_uid: res.uid});
      if (document.stripe_plan !== undefined && document.stripe_status !== undefined) {
        return {
          data: {
            register_step: document.register_step,
            stripe_status: document.stripe_status,
            expires: document.stripe_plan.cancel_at
          },
          success: true,
        }
 
      } else {
        return {
          data: {
            register_step: document.register_step,
          },
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