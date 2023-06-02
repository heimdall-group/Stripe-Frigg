<template>
  <v-container fluid class="component-main-container">
    error
  </v-container>
</template>

<style scoped>

</style>

<script>
import { useMainStore } from '~~/stores/mainStore';
export default {
  setup() {
    const store = useMainStore();
    return {
      store,
    };
  },
  name: 'registerSummaryErrorComponent',
  data() {
    return {};
  },
  computed: {
    user() {
      return this.store.getUser;
    },
    mobile() {
      return this.store.getMobile;
    }
  },
  methods: {},
  mounted() {},
  updated() {},
  components: {},
  emits: [],
};
</script>
