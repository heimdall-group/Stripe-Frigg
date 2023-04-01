import Users from "~~/server/dbModels/user";

export default defineEventHandler(async (event) => {
	const { id, username } = await readBody(event)
  try {
    await insert.save();
    return {status: 200};
  } catch {
    return {status: 400};
  }
 })