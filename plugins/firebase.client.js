import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
export default defineNuxtPlugin((nuxtApp) => {
  
  const firebaseConfig = {
    apiKey: useRuntimeConfig().public.FIREBASE_API_KEY
  };

  const app = initializeApp(firebaseConfig)
  initUser()

  const auth = getAuth()

  nuxtApp.vueApp.provide('auth', auth)
  nuxtApp.provide('auth', auth)
})

