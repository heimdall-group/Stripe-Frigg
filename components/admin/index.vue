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
    return {
      mobile: true,
    };
  },
  computed: {
    user() {
      return this.store.getUser;
    },
  },
  methods: {
    onResize() {
      this.mobile = window.innerWidth < 850;
    },
  },
  mounted() {
    this.onResize();
    window.addEventListener('resize', this.onResize, { passive: true });
  },
  updated() {},
  components: {},
  emits: []
};
</script>
