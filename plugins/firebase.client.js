import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
export default defineNuxtPlugin((nuxtApp) => {
  
  const firebaseConfig = {
    apiKey: useRuntimeConfig().public.firebase_api_key,
    authDomain: useRuntimeConfig().public.domain_url,
  };

  const app = initializeApp(firebaseConfig)
  firebase_initUser()

  const auth = getAuth()

  nuxtApp.vueApp.provide('auth', auth)
  nuxtApp.provide('auth', auth)
})

