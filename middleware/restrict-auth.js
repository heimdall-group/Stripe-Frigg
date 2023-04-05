import { useMainStore } from "~~/stores/mainStore"

export default defineNuxtRouteMiddleware(async (to, from) => {
  const store = useMainStore();
  const router = useRouter();
  if (!await store.getUser) {
    restrictAuthWarning();
    return router.push('/login')
  }
})