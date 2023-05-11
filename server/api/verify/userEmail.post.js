import { getAuth } from 'firebase-admin/auth';

export default defineEventHandler(async (event) => {
  const { mail } = await readBody(event);
  const auth = getAuth();
  const res = await auth.getUserByEmail(mail).catch((err) => {
    return err;
  })
  if(res.code === 'auth/user-not-found') {
    return {
      data: true,
      success: true,
    }
  } else {
    return {
      data: false,
      success: false,
      message: 'User Found',
      code: 400,
    }
  }
});
