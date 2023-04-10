export const getPlans = async () => {
  const res = await $fetch('/api/plans/getPlans', {
    method: 'POST',
  });
  return res;
}