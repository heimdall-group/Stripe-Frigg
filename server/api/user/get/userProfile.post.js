import { getAuth } from 'firebase-admin/auth';
import Users from "~~/server/models/user";

export default defineEventHandler(async (event) => {
	const { token } = await readBody(event);
  const res = await getAuth().verifyIdToken(token);
  try {
    if (res) {
      const document = await Users.findOne({user_uid: res.uid});
      return {
        data: {
          user_email: document.user_email,
          user_number: document.user_number,
          user_name: res.name,
          user_provider: res.firebase.sign_in_provider,
          email_verified: res.email_verified
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
 })