export default defineNuxtRouteMiddleware(async (to, from) => {
  return restrictAuth();
})