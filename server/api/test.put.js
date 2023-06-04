import { getAuth } from 'firebase-admin/auth';
import Users from "~~/server/models/user";

export default defineEventHandler(async (event) => {
	const { token } = await readBody(event);
  const auth = await getAuth();
  const result = await auth.verifyIdToken(token);
  const uid = result.uid;
  try {
    console.log(result);
    if (result) {
      const document = await Users.findOne({user_uid: uid});
      const result = await auth.getUser(uid);
      return {
        data: {
          user_email: document.user_email,
          user_number: document.user_number,
          user_name: result.displayName,
          user_provider: result.providerData[0].providerId,
          email_verified: result.emailVerified
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