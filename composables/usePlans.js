import { useMainStore } from "~/stores/mainStore";

export const plans_getPlans = async () => {
  const store = useMainStore();
  const res = await $fetch('/api/plans/get/indexedPlans', {
    method: 'POST',
  });
  return res;
}