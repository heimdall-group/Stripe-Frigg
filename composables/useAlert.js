import { useMainStore } from "~~/stores/mainStore"

const store = useMainStore();

export const restrictAuthWarning = () => {
  store.setAlert({
    type: 'warning',
    status: true,
    message: 'You are not authenticated',
  })
}

export const restrictNoAuthWarning = () => {
  store.setAlert({
    type: 'warning',
    status: true,
    message: 'You are already authenticated',
  })
}