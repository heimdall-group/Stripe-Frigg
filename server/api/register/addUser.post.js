import Users from "~~/server/dbModels/user";
import { getAuth } from "firebase-admin/auth";

export default defineEventHandler(async (event) => {
  const { token, id, username, number, dateOfBirth } = await readBody(event);
  const res = await getAuth().verifyIdToken(token);
  if (res) {
    const insert = new Users(  {
      user_username: username,
      user_uid: id,
      user_stocks: {},
      user_number: number,
      register_step: 2,
      user_date: dateOfBirth,
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