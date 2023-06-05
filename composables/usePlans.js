import { useMainStore } from "~/stores/mainStore";

export const plans_getPlans = async () => {
  const store = useMainStore();
  const result = await $fetch('/api/plans', {
    method: 'GET',
  });
  return result;
}