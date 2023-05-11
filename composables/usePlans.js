import { useMainStore } from "~/stores/mainStore";

export const getPlans = async () => {
  const store = useMainStore();
  const res = await $fetch('/api/plans/getIndexedPlans', {
    method: 'POST',
  });
  return res.data;
}