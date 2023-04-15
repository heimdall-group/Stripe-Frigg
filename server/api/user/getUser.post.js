import Users from "~~/server/dbModels/user";

export default defineEventHandler(async (event) => {
	const { uid } = await readBody(event);
  const document = await Users.find({user_uid: uid});
  return {
    step: document[0].register_step,
  }
 })