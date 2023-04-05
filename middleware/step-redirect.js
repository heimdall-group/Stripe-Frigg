import { useMainStore } from "~~/stores/mainStore"

export default defineNuxtRouteMiddleware(async (to, from) => {
  const store = useMainStore();
  const user = store.getUser;
  if (user && user.step !== 'undefined') {
    if (user.step !== 'finished') {
      return navigateTo(`/register/step-${user.step}`)
    }
  }
  
})