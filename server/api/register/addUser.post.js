import Users from "~~/server/dbModels/user";

export default defineEventHandler(async (event) => {
	const { id, username } = await readBody(event)
  const insert = new Users(  {
    user_username: username,
    user_uid: id,
    user_stocks: {},
    register_step: 2,
  });
  try {
    await insert.save();
    return {status: 200};
  } catch {
    return {status: 400};
  }
 })