export const getRecaptchaToken = async () => {
  const token = await grecaptcha.execute(useRuntimeConfig().recaptcha_v3, {
    action: 'submit',
  });
  return token;
};
