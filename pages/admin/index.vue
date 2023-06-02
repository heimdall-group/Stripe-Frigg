<template>
  <admin v-if="ranks.includes('Admin')"></admin>
</template>

<script>
import { useMainStore } from '~/stores/mainStore';

export default {
  setup() {
    const store = useMainStore();
    definePageMeta({
      middleware: ['step-redirect', 'restrict-auth', 'restrict-admin']
    });
    return {
      store,
    }
  },
  name: 'adminPage',
  data() {
    return {
      ranks: [],
    };
  },
  watch: {
    user: {
      async handler() {
        if (this.user && this.ranks.length === 0) {
          this.ranks = await user_getUserRanks();
          this.user_auth = true;
        }
      },
      deep: true,
    }
  },
  computed: {
    user() {
      return this.store.getUser;
    },
  },
  methods: {},
  mounted() {},
  updated() {},
  components: {},
  
};
</script>
