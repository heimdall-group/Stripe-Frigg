import { getAuth } from 'firebase-admin/auth';
import Users from '~/server/models/user';

export default defineEventHandler(async (event) => {
	const { token, changes } = await readBody(event);
  try {
    const user = await getAuth().verifyIdToken(token);
    if (user) {
      try {
        for (const key in changes) {
          const change = changes[key];
          const document = await Users.findOneAndUpdate({user_uid: key}, {user_ranks: change.to});
          document.save();
        }
      } catch (err) {
        console.log(err)
        return {
          data: false,
          success: false,
          message: 'Catch Error',
          code: 401,
        }
      }
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