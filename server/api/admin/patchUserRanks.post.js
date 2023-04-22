import { getAuth } from 'firebase-admin/auth';
import Users from '~/server/dbModels/user';

export default defineEventHandler(async (event) => {
	const { token, changes } = await readBody(event);
  try {
    const user = await getAuth().verifyIdToken(token);
    if (user) {
      for (const key in changes) {
        try {
          const change = changes[key];
          const document = await Users.findOneAndUpdate({user_uid: key}, {user_ranks: change.to});
          document.save();
        } catch (err) {
          return {
            status: false,
            error: err,
          }
        }
      }
      return {
        status: true,
      }
    } else {
      return {
        status: false,
        error: 'invalid token'
      }
    }
  } catch (err) {
    return err;
  }


 })