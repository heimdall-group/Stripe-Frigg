import { useMainStore } from "~/stores/mainStore"

export const updateStep = async (newStep) => {
  const store = useMainStore();
  const user = store.getUser;
  const res = await $fetch('/api/register/patchStep', {
    method: 'POST',
    body: {
      step: newStep,
      token: await user.getIdToken(),
    }
  })
  if (res.success) {
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
  if (res.success) {
    store.setUserStep(res.data.register_step);
    if (res.data.expires) {
      store.setUserExpires(res.data.expires);
      store.setUserStatus(res.data.stripe_status, res.data.expires);
    }
    if (res.data.stripe_status === 'expired') {
      store.setExpired(true, 'Subscription expired');
    }
    if (res.data.stripe_status === 'invoice-unpaid') {
      store.setExpired(true, 'Invoice unpaid');
    }

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
  if (res.success) {
    return res.data;
  } else {
    return [];
  }
  
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
  if (res.success) {
    return res.data;
  }
}

export const getPortalSession = async () => {
  const store = useMainStore();
  const user = store.getUser;
  const res = await $fetch('/api/user/getPortalSession', {
    method: 'POST',
    body: {
      token: await user.getIdToken(),
    }
  });
  if(res.success) {
    window.location = res.data;
  }
}

export const stepRedirectValidation = async () => {
  const store = useMainStore();
  const user = store.getUser;
  const router = useRouter();
  return (user && user.step && user.step !=='finished' && !router.currentRoute.value.fullPath.includes('register/summary-'))
} 