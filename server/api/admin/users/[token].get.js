import { getAuth } from 'firebase-admin/auth';
import Users from "~~/server/models/user";

export default defineEventHandler(async (event) => {
  const { token } = event.context.params;
  const result = await getAuth().verifyIdToken(token);
  try {
    if (result) {
      const { user_ranks } = await Users.findOne({user_uid: result.uid});
      if (user_ranks.includes('Admin')) {
        const arr =  [];
        const auth = getAuth();
        const dbArr = await Users.find();
        for (let i = 0; i < dbArr.length; i++) {
          const dbIndex = dbArr[i];
          const firebaseIndex = await auth.getUser(dbIndex.user_uid);
          arr.push({
            username: firebaseIndex.displayName,
            email: firebaseIndex.email,
            number: dbIndex.user_number,
            register_step: dbIndex.register_step === 'finished' ? 'fa-solid fa-square-check' : 'fa-solid fa-square-xmark',
            stripe_status: dbIndex.stripe_status,
            stripe_plan: dbIndex.stripe_plan_name,
            ranks: dbIndex.user_ranks,
            localRanks: dbIndex.user_ranks,
            stripe_id: dbIndex.stripe_customerID,
            firebase_id: firebaseIndex.uid,
            mongodb_id: dbIndex.id,
          });
        }
        return {
          data: arr,
          success: true,
        }

      } else {
        return {
          data: false,
          success: false,
          message: 'User not admin',
          code: 400,
        }
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