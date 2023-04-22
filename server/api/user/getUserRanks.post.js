import { getAuth } from 'firebase-admin/auth';
import Users from "~~/server/dbModels/user";

export default defineEventHandler(async (event) => {
	const { token } = await readBody(event);
  const res = await getAuth().verifyIdToken(token);
  try {
    if (res) {
      const document = await Users.findOne({user_uid: res.uid});
      return document.user_ranks;
    } else {
      return 'user not authenticated'
    }
  } catch (err) {
    return err
  }
 })