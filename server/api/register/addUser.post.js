import Users from "~~/server/dbModels/user";

export default defineEventHandler(async (event) => {
	const { id, username, plan } = await readBody(event)
  const insert = new Users(  {
    username: username,
    uid: id,
    plan: plan,
    stocks: {}
  });
  try {
    await insert.save();
    return {status: 200};
  } catch {
    return {status: 400};
  }
 })