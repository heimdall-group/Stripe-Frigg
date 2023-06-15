import { useMainStore } from '~~/stores/mainStore';
import {
  signOut,
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  reauthenticateWithPopup,
  EmailAuthProvider,
  GoogleAuthProvider,
  reauthenticateWithCredential,
  sendEmailVerification,
  getAdditionalUserInfo,
  updatePassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { alert_firebase_verifyEmailSent } from './useAlert';

export const firebase_password_createUser = async (
  username,
  mail,
  password
) => {
  const auth = getAuth();
  try {
    const result = await createUserWithEmailAndPassword(auth, mail, password);
    const { uid, email } = result.user;
    firebase_userCreated(username, uid, email);
    return {
      data: true,
      success: true,
    };
  } catch (error) {
    firebase_handleError(error);
    return {
      data: false,
      success: false,
      message: 'Firebase Catch Error',
      code: 400,
    };
  }
};

export const firebase_password_signInUser = async (email, password) => {
  const auth = getAuth();
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    firebase_userSignedIn();
    return {
      data: true,
      success: true,
    };
  } catch (error) {
    firebase_handleError(error);
    return {
      data: false,
      success: false,
      message: 'Firebase Catch Error',
      code: 400,
    };
  }
};

export const firebase_google_createUser = async () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  try {
    const result = await signInWithPopup(auth, provider);
    const { uid, email, displayName } = result.user;
    const { isNewUser } = getAdditionalUserInfo(result);
    if (isNewUser) {
      firebase_userCreated(displayName, uid, email);
    } else {
      firebase_userSignedIn();
    }
    return {
      data: true,
      success: true,
    };
  } catch (error) {
    firebase_handleError(error);
    return {
      data: false,
      success: false,
      message: 'Firebase Catch Error',
      code: 400,
    };
  }
};

export const firebase_userCreated = async (username, uid, email) => {
  const auth = getAuth();
  const store = useMainStore();
  store.setUser(auth.currentUser);
  const user_res = await $fetch('/api/users/register', {
    method: 'POST',
    body: JSON.stringify({
      uid: uid,
      email: email,
      username: username,
      token: await auth.currentUser.getIdToken(),
    }),
  });
  if (user_res.success) {
    if (!auth.currentUser.emailVerified) {
      alert_verifyEmail();
    }
    alert_registerSuccess();
    const result = await user_getUser();
    reloadMiddleware();
    return true;
  } else {
    return false;
  }
};

export const firebase_userSignedIn = async () => {
  const auth = getAuth();
  const store = useMainStore();
  const router = useRouter();
  await router.push('/');
  store.setUser(auth.currentUser);
  if (!auth.currentUser.emailVerified) {
    alert_verifyEmail();
  }
  alert_loginSuccess();
  const userRes = await user_getUser();
  reloadMiddleware();
};

export const firebase_initUser = async () => {
  const store = useMainStore();
  const auth = getAuth();
  const subscribe = onAuthStateChanged(auth, async (user) => {
    if (user === null) {
      store.setUser(false);
      subscribe();
    } else {
      store.setUser(user);
      if (!user.emailVerified) {
        alert_verifyEmail();
      }
      alert_loginSuccess();
      const result = await user_getUser();
      console.log('reload called')
      reloadMiddleware();
      subscribe();
    }
  });
};

export const firebase_signOutUser = async () => {
  const store = useMainStore();
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      store.setUser(false);
      store.setExpired(false);
      const router = useRouter();
      router.push('/');
      alert_resetAlert();
      alert_signoutSuccess();
    })
    .catch((error) => {
      firebase_handleError(error);
    });
};

export const firebase_verifyEmail = async (alert) => {
  const store = useMainStore();
  const user = store.getUser;
  store.patchAlerts(alert);
  try {
    sendEmailVerification(user).then(() => {
      alert_firebase_verifyEmailSent();
    });
  } catch (error) {
    console.error(error);
    const { errorCode, errorMessage } = error;
  }
};

export const firebase_resetPassword = async () => {
  console.log('reset password');
  const auth = getAuth();
  try {
    sendPasswordResetEmail(auth, auth.currentUser.email).then(() => {
      alert_firebase_passwordEmailSent();
    })
  } catch (error) {
    console.error(error);
    const { errorCode, errorMessage } = error;
  }
}

export const firebase_updatePassword = async (pwd) => {
  const store = useMainStore();
  const user = store.getUser;
  try {
    updatePassword(user, pwd).then(() => {
      alert_firebase_passwordUpdated()
    })
  } catch (error) {
    console.error(error);
    const { errorCode, errorMessage } = error;
  }
}

export const firebase_verifyPassword = async (pwd) => {
  const store = useMainStore();
  const user = store.getUser;
  try {
    const credential = EmailAuthProvider.credential(user.email, pwd);
    const result = await reauthenticateWithCredential(user, credential);
    return {
      data: true,
      success: true,
    }
  } catch (error) {
    firebase_handleError(error);
    return {
      data: false,
      success: false,
      message: 'Firebase Catch Error',
      code: 400,
    };
  }
};

export const firebase_reauthenticateProvider = async () => {
  const store = useMainStore();
  const user = store.getUser;
  const { providerId } = user.providerData[0];
  try {
    let provider;
    switch (providerId) {
      case 'google.com':
        provider = new GoogleAuthProvider;
        break;
      case 'apple.com':
        break;
      case 'facebook.com':
        break;
      case 'twitter.com':
        break;

      default:
        return {
          data: providerId,
          success: false,
          message: 'Provider not supported',
          code: 400,
        };
        break;
    }
    try {
      const result = await reauthenticateWithPopup(user, provider);
      return {
        data: true,
        success: true,
      }
    } catch (error) {
      firebase_handleError(error);
      return {
        data: false,
        success: false,
        message: 'Firebase Catch Error',
        code: 400,
      };
    }
  } catch (err) {
    firebase_handleError(error);
    return {
      data: false,
      success: false,
      message: 'Firebase Catch Error',
      code: 400,
    };
  }
};

export const firebase_handleError = async (error) => {
  const { code } = error;
  switch (code) {
    case 'auth/weak-password':
      alert_firebase_weakPassword();
      break;
    case 'auth/wrong-password':
      alert_firebase_wrongPassword();
      break;
    case 'auth/email-already-in-use':
      alert_firebase_emailAlreadyInUse();
      break;
    case 'auth/popup-closed-by-user':
      alert_firebase_popupClosedByUser();
      break;
    case 'auth/popup-blocked':
      alert_firebase_popupBlocked();
      break;
    case 'auth/popup-request-cancelled':
      alert_firebase_popupRequestCancelled();
      break;
    case 'auth/user-not-found':
      alert_firebase_userNotFound();
      break;
    case 'auth/user-disabled':
      alert_firebase_userDisabled();
      break;
    case 'auth/user-mismatch':
      alert_firebase_userMismatch();
      break;
    default:
      console.error(error)
      alert_firebase_defaultStatus(code);
      break;
  }
};

export const firebase_getProviderIcon = (provider) => {
  let icon;
  switch (provider) {
    case 'password':
      icon = 'fa-solid fa-envelope-circle-check';
      break;
    case 'google.com':
      icon = 'fa-brands fa-google';
      break;
    case 'apple.com':
      icon = 'fa-brands fa-apple';
      break;
    case 'facebook.com':
      icon = 'fa-brands fa-facebook';
      break;
    case 'twitter.com':
      icon = 'fa-brands fa-twitter';
      break;
  }
  return icon;
};
