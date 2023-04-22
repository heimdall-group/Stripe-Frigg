export default defineNuxtRouteMiddleware(async (to, from) => {
  return restrictAdmin();
})