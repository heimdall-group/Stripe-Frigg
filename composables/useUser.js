import { useMainStore } from "~/stores/mainStore"

export const user_updateStep = async (newStep) => {
  const store = useMainStore();
  const user = store.getUser;
  const res = await $fetch('/api/register/patch/step', {
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

export const user_getUser = async () => {
  const store = useMainStore();
  const user = store.getUser;
  const res = await $fetch('/api/user/get/user', {
    method: 'POST',
    body: {
      token: await user.getIdToken(),
    }
  });
  if (res.success) {
    if (res.data.expires) {
      store.setUserExpires(res.data.expires);
      store.setUserStatus(res.data.stripe_status, res.data.expires);
    } else {
      store.setUserStep(res.data.register_step);
      store.setUserStatus(res.data.stripe_status);
    }
  }
}

export const user_getUserProfile = async () => {
  const store = useMainStore();
  const user = store.getUser;
  const res = await $fetch('/api/user/get/userProfile', {
    method: 'POST',
    body: {
      token: await user.getIdToken(),
    }
  });
  return res;
}

export const user_patchUserProfile = async (number, name) => {
  const store = useMainStore();
  const user = store.getUser;
  const res = await $fetch('/api/user/patch/userProfile', {
    method: 'POST',
    body: {
      token: await user.getIdToken(),
      user_number: number,
      user_username: name,
    }
  });
  return res;
}

export const user_getUserRanks = async () => {
  const store = useMainStore();
  const user = store.getUser;
  const res = await $fetch('/api/user/get/userRanks', {
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

export const user_getAllUsers = async () => {
  const store = useMainStore();
  const user = store.getUser;
  const res = await $fetch('/api/admin/get/allUsers', {
    method: 'POST',
    body: {
      token: await user.getIdToken(),
    }
  });
  if (res.success) {
    return res.data;
  }
}

export const user_getPortalSession = async () => {
  const store = useMainStore();
  const user = store.getUser;
  const res = await $fetch('/api/user/get/portalSession', {
    method: 'POST',
    body: {
      token: await user.getIdToken(),
      return_url: location.href,
    }
  });
  if(res.success) {
    window.location = res.data;
  }
}

export const user_removeAccount = async () => {
  console.log('remove account');

  // Clear stripe account and stop subscription
  // Remove from firebase
  // Remove from mongodb
}

export const middleware_stepRedirectValidation = async () => {
  const store = useMainStore();
  const user = store.getUser;
  const router = useRouter();
  return (user && user.step && user.step !=='finished' && !router.currentRoute.value.fullPath.includes('register/summary-'))
} 