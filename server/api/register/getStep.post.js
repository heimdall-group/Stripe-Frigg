import Users from "~~/server/dbModels/user";

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
  const document = await Users.find({uid: id});
  return {
    status: 200,
    data: document[0].step,
  };
 })