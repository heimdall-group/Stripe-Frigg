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

export const resetWarning = () => {
  const store = useMainStore();
  store.setAlert({
    type: 'warning',
    status: false,
    message: '',
  })
}