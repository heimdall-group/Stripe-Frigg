export const getRecaptchaToken = async () => {
  const token = await grecaptcha.execute(useRuntimeConfig().public.recaptcha_v3, {
    action: 'submit',
  });
  return token;
};

export const setupVerification = async (callback) => {
  const token = await getRecaptchaToken();
  const res = await $fetch('/api/verify/recaptcha', {
    method: 'POST',
    body: {
      token: token,
    },
  });
  if (res.success) {
    callback();
  } else {
    grecaptcha.render('recaptcha-container', {
      sitekey: useRuntimeConfig().public.recaptcha_v2,
    });
  }
}