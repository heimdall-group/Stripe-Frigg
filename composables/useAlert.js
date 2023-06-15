import { useMainStore } from "~~/stores/mainStore"

export const alert_restrictAuth = () => {
  const store = useMainStore();
  store.setAlert({
    type: 'warning',
    icon: 'fa-solid fa-circle-info',
    message: 'You are not authenticated',
  })
}

export const alert_restrictNoAuth = () => {
  const store = useMainStore();
  store.setAlert({
    type: 'warning',
    icon: 'fa-solid fa-circle-info',
    message: 'You are already authenticated',
  })
}

export const alert_statusCanceled = (expires) => {
  const store = useMainStore();
  const user = store.getUser;
  const date = new Date(expires * 1000);
  const options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' };
  store.setAlert({
    type: 'warning',
    icon: 'fa-solid fa-circle-info',
    message: `Your subscription is set to expire at: ${date.toLocaleDateString('en-US', options)}`,
  })
}

export const alert_statusInvoiceFailed = () => {
  const store = useMainStore();
  store.setAlert({
    type: 'error',
    icon: 'fa-solid fa-triangle-exclamation',
    message: {
      prepend: 'Your invoice has failed. Visit the ',
      button: {
        type: 'button-callback',
        callback: user_getPortalSession,
        text: 'customer portal',
      },
      append: ' to resolve the issue',
    },
  });
}

export const alert_statusInvoiceRequiresAction = () => {
  const store = useMainStore();
  store.setAlert({
    type: 'error',
    icon: 'fa-solid fa-triangle-exclamation',  
    message: {
      prepend: 'Your invoice requires action. Visit the ',
      button: {
        type: 'button-callback',
        callback: user_getPortalSession,
        text: 'customer portal',
      },
      append: ' to resolve the issue',
    },
  });
};

export const alert_verifyEmail = () => {
  const store = useMainStore();
  store.setAlert({
    type: 'warning',
    icon: 'fa-solid fa-circle-info',  
    message: {
      prepend: 'Your email is not verified. Click ',
      button: {
        type: 'button-callback',
        callback: firebase_verifyEmail,
        text: 'here',
      },
      append: ' to send verification email.',
    },
  });
};

export const alert_registerSuccess = () => {
  const store = useMainStore();
  store.setAlert({
    type: 'success',
    icon: 'fa-solid fa-square-check',
    message: 'Register successfull',
  })
};

export const alert_loginSuccess = () => {
  const store = useMainStore();
  store.setAlert({
    type: 'success',
    icon: 'fa-solid fa-square-check',
    message: 'Login successfull',
  })
};

export const alert_signoutSuccess = () => {
  const store = useMainStore();
  store.setAlert({
    type: 'success',
    icon: 'fa-solid fa-square-check',
    message: 'Signout successfull',
  })
};

export const alert_firebase_weakPassword = () => {
  const store = useMainStore();
  store.setAlert({
    type: 'warning',
    icon: 'fa-solid fa-circle-info',
    message: 'Your password doesnt meet our requirments.',
  })
};

export const alert_firebase_wrongPassword = () => {
  const store = useMainStore();
  store.setAlert({
    type: 'warning',
    icon: 'fa-solid fa-circle-info',
    message: 'Incorrect password.',
  })
};

export const alert_firebase_emailAlreadyInUse = () => {
  const store = useMainStore();
  store.setAlert({
    type: 'warning',
    icon: 'fa-solid fa-circle-info',
    message: 'This email is already in use.',
  })
};

export const alert_firebase_popupClosedByUser = () => {
  const store = useMainStore();
  store.setAlert({
    type: 'warning',
    icon: 'fa-solid fa-circle-info',
    message: 'The popup was closed. Please try again.',
  })
};

export const alert_firebase_popupBlocked = () => {
  const store = useMainStore();
  store.setAlert({
    type: 'warning',
    icon: 'fa-solid fa-circle-info',
    message: 'The popup request was cancelled. Please try again.',
  })
};

export const alert_firebase_popupRequestCancelled = () => {
  const store = useMainStore();
  store.setAlert({
    type: 'warning',
    icon: 'fa-solid fa-circle-info',
    message: 'The popup request was cancelled. Please try again.',
  })
};

export const alert_firebase_userNotFound = () => {
  const store = useMainStore();
  store.setAlert({
    type: 'warning',
    icon: 'fa-solid fa-circle-info',
    message: 'This account doesnt exists',
  })
};

export const alert_firebase_userDisabled = () => {
  const store = useMainStore();
  store.setAlert({
    type: 'warning',
    icon: 'fa-solid fa-circle-info',
    message: 'You are already authenticated',
  })
};

export const alert_firebase_userMismatch = () => {
  const store = useMainStore();
  store.setAlert({
    type: 'warning',
    icon: 'fa-solid fa-circle-info',
    message: 'Mismatched authentication. Please authenticate the correct account',
  })
};

export const alert_firebase_passwordEmailSent = () => {
  const store = useMainStore();
  const user = store.getUser;
  store.setAlert({
    type: 'success',
    icon: 'fa-solid fa-square-check',
    message: `Password reset email sent to ${user.email}`,
  })
};
 
export const alert_firebase_passwordUpdated = () => {
  const store = useMainStore();
  store.setAlert({
    type: 'success',
    icon: 'fa-solid fa-square-check',
    message: 'Your password has been updated.',
  })
};

export const alert_firebase_verifyEmailSent = () => {
  const store = useMainStore();
  const user = store.getUser;
  store.setAlert({
    type: 'success',
    icon: 'fa-solid fa-square-check',
    message: `Verification email sent to ${user.email}`,
  })
};

export const alert_accountRemoved = () => {
  const store = useMainStore();
  store.setAlert({
    type: 'success',
    icon: 'fa-solid fa-square-check',
    message: `Your account has been removed`,
  })
};

export const alert_firebase_defaultStatus = (code) => {
  const store = useMainStore();
  store.setAlert({
    type: 'warning',
    icon: 'fa-solid fa-circle-info',
    message: {
      prepend: 'An unhandled error has accured. Please ',
      button: {
        type: 'button-link',
        to: '/support',
        text: 'contact support',
      },
      append: ` and provide code: ${code}`,
    },
  })
};

export const alert_resetAlert = () => {
  const store = useMainStore();
  store.resetAlerts();
};