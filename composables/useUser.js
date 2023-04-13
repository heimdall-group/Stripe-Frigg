import { useMainStore } from "~/stores/mainStore"

export const updateStep = async (newStep) => {
  const store = useMainStore();
  const res = await $fetch('/api/register/patchStep', {
    method: 'POST',
    body: {
      step: newStep,
      uid: store.getUser.uid,
    }
  })
  if (res) {
    store.setUserStep(newStep);
  }
}

export const getUser = async () => {
  const store = useMainStore();
  const res = await $fetch('/api/user/getUser', {
    method: 'POST',
    body: {
      uid: store.getUser.uid,
    }
  })
  if (res !== false) {
    store.setUserStep(res.step);
  }
}

export const getPortalSession = async () => {
  const store = useMainStore();
  const user = store.getUser;
  const res = await $fetch('/api/plans/getPortalSession', {
    method: 'POST',
    body: {
      token: await user.getIdToken(),
    }
  });
  window.location = res;
}

export const stepRedirectValidation = async () => {
  const store = useMainStore();
  const user = store.getUser;
  const router = useRouter();
  return (user && user.step && user.step !=='finished' && !router.currentRoute.value.fullPath.includes('register/summary-'))
} 