import Users from "~~/server/models/user";
import { getAuth } from "firebase-admin/auth";

export default defineEventHandler(async (event) => {
	let { token, user_number, user_username } = await readBody(event);
  const auth = await getAuth();
  const result = await auth.verifyIdToken(token);
  const uid = result.uid;
  try {
    if (result) {
      const document = await Users.findOneAndUpdate({user_uid: uid}, {
        user_number: user_number,  
      })
      const result = await auth.updateUser(uid ,{
        displayName: user_username === '' ? null : user_username,
      })
      return {
        data: true,
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