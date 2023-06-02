<template>
  <v-container v-if="user" fluid :class="['component-main-container', 'pa-0', mobile ? '' : 'pl-14']">
    <admin-header :mobile="mobile"></admin-header>
  </v-container>
</template>

<script>
import { useMainStore } from '~/stores/mainStore';

export default {
  setup() {
    const store = useMainStore()
    return {
      store
    }
  },
  name: 'adminSupportComponent',
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
  emits: []
};
</script>
