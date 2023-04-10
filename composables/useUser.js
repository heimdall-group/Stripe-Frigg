import { useMainStore } from "~/stores/mainStore"

export const updateStep = async (newStep) => {
  const store = useMainStore();
  const res = await $fetch('/api/register/updateStep', {
    method: 'POST',
    body: {
      step: newStep,
      uid: store.getUser.uid,
    }
  })
  if (res) {
    store.setStep(newStep);
  }
}

export const getDBUser = async () => {
  const store = useMainStore();
  const res = await $fetch('/api/register/getDBUser', {
    method: 'POST',
    body: {
      uid: store.getUser.uid,
    }
  })
  if (res !== false) {
    store.setStep(res.step);
  }
  
}

export const stepRedirectValidation = async () => {
  const store = useMainStore();
  const user = store.getUser;
  const router = useRouter();
  return (user && user.step && user.step !=='finished' && !router.currentRoute.value.fullPath.includes('register/summary-'))
} 