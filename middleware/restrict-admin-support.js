export default defineNuxtRouteMiddleware(async (to, from) => {
  return middleware_restrictAdminSupport();
})