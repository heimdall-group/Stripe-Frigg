import { useMainStore } from '~~/stores/mainStore';

export const middleware_stepRedirect = async () => {
  const store = useMainStore();
  const user = store.getUser;
  if(await middleware_stepRedirectValidation()) {
    return await navigateTo(`/register/step-${user.step}`);
  }
};

export const middleware_restrictAuth = async () => {
  const store = useMainStore();
  const user = store.getUser;
  try {
    if (user === null) {
      return;
    }
    if (!await middleware_stepRedirectValidation() && !user) {
      alert_restrictAuth();
      return navigateTo('/login');
    }
  } catch (err) {
    console.log(err);
  }
};

export const middleware_restrictNoAuth = async () => {
  const store = useMainStore();
  const user = store.getUser;
  try {
    if (user === null) {
      return;
    }
    if (!await middleware_stepRedirectValidation() && !!user) {
      alert_restrictNoAuth();
      return navigateTo('/');
    } 
  } catch (err) {
    console.log(err);
  }
};

export const middleware_restrictAdmin = async () => {
  const store = useMainStore();
  const user = store.getUser;
  try {
    if (user === null) {
      return;
    }
  
    if (user === false) {
      return navigateTo('/')
    }
    
    const ranks = await user_getUserRanks();
    if (!await middleware_stepRedirectValidation() && !ranks.includes('Admin')) {
      return navigateTo('/')
    }
  } catch (err) {
    console.log(err);
  }
}

export const middleware_restrictAdminSupport = async () => {
  const store = useMainStore();
  const user = store.getUser;
  try {
    if (user === null) {
      return;
    }

    if (user === false) {
      return navigateTo('/')
    }
  
    const ranks = await user_getUserRanks();
    if (!await middleware_stepRedirectValidation() && (!ranks.includes('Admin') || !ranks.includes('Support'))) {
      return navigateTo('/')
    }
  } catch (err) {
    console.log(err);
  }
}

export const reloadMiddleware = async () => {
  const pathName = useRouter().currentRoute.value.fullPath;
  middleware_stepRedirect();
  if (pathName === '/login') {
    middleware_restrictNoAuth();
  } else if (pathName === '/register/step-1') {
    middleware_restrictNoAuth();
  } else if (pathName.includes('register/step-')) {
    middleware_restrictAuth();
  } else if (pathName.includes('admin')) {
    middleware_restrictAdmin();
  } else if (pathName.includes('/profile')) {
    middleware_restrictAuth();
  }
};
