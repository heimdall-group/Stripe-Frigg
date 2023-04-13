import { getAuth } from 'firebase-admin/auth';

export default defineEventHandler(async (event) => {
  const {mail} = await readBody(event);
  const auth = getAuth();
  const res = await auth.getUserByEmail(mail).catch((err) => {
    return err;
  })
  if(res.code === 'auth/user-not-found') {
    return true;
  } else {
    return false;
  }
});
