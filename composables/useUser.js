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
  const user = store.getUser;
  const res = await $fetch('/api/user/getUser', {
    method: 'POST',
    body: {
      token: await user.getIdToken(),
    }
  })
  if (res !== false) {
    store.setUserStep(res.step);
  }
}

export const getUserRanks = async () => {
  const store = useMainStore();
  const user = store.getUser;
  const res = await $fetch('/api/user/getUserRanks', {
    method: 'POST',
    body: {
      token: await user.getIdToken(),
    }
  });
  return res;
}

export const getAllUsers = async () => {
  const store = useMainStore();
  const user = store.getUser;
  const res = await $fetch('/api/admin/getAllUsers', {
    method: 'POST',
    body: {
      token: await user.getIdToken(),
    }
  });
  return res;
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