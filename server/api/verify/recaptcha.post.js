export default defineEventHandler(async (event) => {
	const { token } = await readBody(event);
  const secret = useRuntimeConfig().recaptcha_v3_secret;
  if (!token) {
    return 'Invalid Token';
  }
  if (!secret) {
    return 'Internal error';
  }
  const result = await $fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`
  );
  if (result.success) {
    return {
      data: true,
      success: true,
    }
  } else {
    return {
      data: false,
      success: false,
      message: 'Recaptcha invalid',
      code: 400,
    }
  }
 })