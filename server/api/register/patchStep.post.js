import Users from "~~/server/dbModels/user";

export default defineEventHandler(async (event) => {
	const { uid, step } = await readBody(event);
  const document = await Users.findOneAndUpdate({user_uid: uid}, {register_step: step});
  document.save()
  if (document.step === step) {
    return {
      data: true,
      success: true,
    }
  }
  return {
    data: false,
    success: false,
    message: 'Patch unsuccessfull',
    code: 400,
  }
 })