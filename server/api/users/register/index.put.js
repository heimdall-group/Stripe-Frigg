import Users from "~~/server/models/user";
import { getAuth } from "firebase-admin/auth";

export default defineEventHandler(async (event) => {
	const { token } = await readBody(event);
  const result = await getAuth().verifyIdToken(token);
  if (result) {
    const document = await Users.findOneAndUpdate({user_uid: result.uid}, {register_step: 'finished'});
    document.save()
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
 })