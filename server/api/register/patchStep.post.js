import Users from "~~/server/dbModels/user";
import { getAuth } from "firebase-admin/auth";

export default defineEventHandler(async (event) => {
	const { token, step } = await readBody(event);
  const res = await getAuth().verifyIdToken(token);
  if (res) {
    const document = await Users.findOneAndUpdate({user_uid: res.uid}, {register_step: step});
    document.save()
    if (document.step === step) {
      return {
        data: true,
        success: true,
      }
    }
    return {
      data: false,
      success: false,
      message: 'Patch unsuccessfull',
      code: 400,
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