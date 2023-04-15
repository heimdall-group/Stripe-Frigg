<template>
  <client-only>
    <v-alert
      icon="fa-solid fa-circle-info"
      position="absolute"
      class="ma-2"
      width="calc(100% - 16px)"
      v-if="alert.status"
      type="warning"
      :text="alert.message"
    >
      <v-btn
        flat
        color="transparent right top-center-36 right-2"
        @click="alertCallback"
      >
        <font-awesome-icon icon="fa-solid fa-xmark" />
      </v-btn>
    </v-alert>
  </client-only>
</template>

<style scoped>
.v-alert {
  z-index: 2000;
}
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
  name: 'alertComponent',
  data() {
    return {};
  },
  computed: {
    alert() {
      return this.store.getAlert;
    },
  },
  methods: {
    alertCallback() {
      this.store.setAlert({
        type: 'warning',
        status: false,
        message: '',
      });
    },
  },
};
</script>
