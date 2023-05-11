import Users from "~~/server/dbModels/user";

export default defineEventHandler(async (event) => {
	const { id, username, number, dateOfBirth } = await readBody(event)
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
 })