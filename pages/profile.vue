<template>
  <profile />
</template>

<style scoped>
.v-row {
  max-width: 800px;
}
</style>

<script>
import { useMainStore } from '~~/stores/mainStore';

export default {
  async setup() {
    definePageMeta({
      middleware: ['step-redirect', 'restrict-auth']
    });
    const store = useMainStore();
    const user = store.getUser;
    const token = await user.getIdToken();
    const { data, pending, error, refresh } = await useLazyAsyncData('profile', 
      () => $fetch(`/api/users/user/profile/${token}`)
    )
    if(data._value.success) {
      store.setProfile(data._value.data)
    }
    return {
      data, pending, error,
    }
  },
  name: 'profilePage',
  data() {
    return {};
  },
  computed: {},
  methods: {},
  mounted() {},
  updated() {},
  components: {},
  
};
</script>
