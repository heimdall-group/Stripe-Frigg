<template>
  <v-container v-if="user" fluid :class="['component-main-container', 'pa-0', mobile ? '' : 'pl-14']">
    <admin-subcomponent-products-refetch :mobile="mobile"></admin-subcomponent-products-refetch>
    <admin-subcomponent-users-panel :mobile="mobile"></admin-subcomponent-users-panel>
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
  name: 'adminComponent',
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
