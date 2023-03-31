import Users from "~~/server/dbModels/user";

export default defineEventHandler(async (event) => {
	const { id, username, plan, number, date } = await readBody(event)
  const insert = new Users(  {
    username: username,
    uid: id,
    plan: plan,
    number: number,
    dateOfBirth: date,
    stocks: {}
  });
  console.log(insert)
  try {
    await insert.save();
    return {status: 200};
  } catch {
    return {status: 400};
  }
 })