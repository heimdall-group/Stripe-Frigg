import Users from "~~/server/models/user";
import { getAuth } from "firebase-admin/auth";

export default defineEventHandler(async (event) => {
  const { token, uid, email, } = await readBody(event);
  const result = await getAuth().verifyIdToken(token);
  if (result) {
    const insert = new Users(  {
      user_uid: uid,
      user_email: email,      
      register_step: 2,
    });
    try {
      await insert.save();
      return {
        data: true,
        success: true,
      }
    } catch {
      console.log(err)
      return {
        data: false,
        success: false,
        message: 'Catch Error',
        code: 400,
      }
    }
  }
 })