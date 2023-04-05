import Users from "~~/server/dbModels/user";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (id && user) {
    const document = Users.findById(id);
    const res = await document.updateOne(body);
    return res;
  } else {
    return 'Error har accured'
  }
});