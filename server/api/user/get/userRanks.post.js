import { getAuth } from 'firebase-admin/auth';
import Users from "~~/server/models/user";

export default defineEventHandler(async (event) => {
	const { token } = await readBody(event);
  const res = await getAuth().verifyIdToken(token);
  try {
    if (res) {
      const document = await Users.findOne({user_uid: res.uid});
      return {
        data: document.user_ranks,
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
    return err
  }
 })