import { useMainStore } from "~~/stores/mainStore"

export const alert_restrictAuth = () => {
  const store = useMainStore();
  store.setAlert({
    type: 'warning',
    icon: 'fa-solid fa-circle-info',
    status: true,
    message: 'You are not authenticated',
  })
}

export const alert_restrictNoAuth = () => {
  const store = useMainStore();
  store.setAlert({
    type: 'warning',
    icon: 'fa-solid fa-circle-info',
    status: true,
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
    status: true,
    message: `Your subscription is set to expire at: ${date.toLocaleDateString('en-US', options)}`,
  })
}

export const alert_statusInvoiceFailed = () => {
  const store = useMainStore();
  store.setAlert({
    type: 'error',
    icon: 'fa-solid fa-triangle-exclamation',
    status: true,
    message: 'Your invoice has failed. Visit the customer portal to resolve the issue',
  })
}

export const alert_statusInvoiceRequiresAction = () => {
  const store = useMainStore();
  store.setAlert({
    type: 'error',
    icon: 'fa-solid fa-triangle-exclamation',
    status: true,
    message: 'Your invoice requires action. Visit the customer portal to resolve the issue',
  })
}

export const alert_registerSuccess = () => {
  const store = useMainStore();
  store.setAlert({
    type: 'success',
    icon: 'fa-solid fa-square-check',
    status: true,
    message: 'Register successfull',
  })
}

export const alert_loginSuccess = () => {
  const store = useMainStore();
  store.setAlert({
    type: 'success',
    icon: 'fa-solid fa-square-check',
    status: true,
    message: 'Login successfull',
  })
}

export const resetAlert = () => {
  const store = useMainStore();
  store.setAlert({
    type: 'warning',
    status: false,
    message: '',
  })
}