export const recaptcha_getToken = async () => {
  const token = await grecaptcha.execute(useRuntimeConfig().public.recaptcha_v3, {
    action: 'submit',
  });
  return token;
};

export const recaptcha_verification = async (callback, error) => {
  const token = await recaptcha_getToken();
  const result = await $fetch('/api/verify/recaptcha', {
    method: 'POST',
    body: {
      token: token,
    },
  });
  if (result.success) {
    callback();
  } else {
    error();
    grecaptcha.render('recaptcha-container', {
      sitekey: useRuntimeConfig().public.recaptcha_v2,
    });
  }
}