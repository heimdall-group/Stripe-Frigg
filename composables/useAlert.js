import { useMainStore } from "~~/stores/mainStore"

export const restrictAuthWarning = () => {
  const store = useMainStore();
  store.setAlert({
    type: 'warning',
    status: true,
    message: 'You are not authenticated',
  })
}

export const restrictNoAuthWarning = () => {
  const store = useMainStore();
  store.setAlert({
    type: 'warning',
    status: true,
    message: 'You are already authenticated',
  })
}

export const statusCanceledWarning = (expires) => {
  const store = useMainStore();
  const user = store.getUser;
  const date = new Date(expires * 1000);
  const options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' };
  store.setAlert({
    type: 'warning',
    status: true,
    message: `Your subscription is set to expire at: ${date.toLocaleDateString('en-US', options)}`,
  })
}

export const resetWarning = () => {
  const store = useMainStore();
  store.setAlert({
    type: 'warning',
    status: false,
    message: '',
  })
}