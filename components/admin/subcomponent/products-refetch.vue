<template>
  <v-card
    max-width="600px"
    class="pa-4 ma-4"
    rounded="xl"
  >
    <v-card-title class="text-center">Refetch Products</v-card-title>
    <v-card-subtitle class="text-center">Sync products from Stripe to server</v-card-subtitle>
    <v-card-actions>
      <v-row justify="center">
        <verify-password color="" color_2="success" :callback="callback" text="Refetch products" />
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
import { useMainStore } from '~/stores/mainStore';

export default {
  setup() {
    const store = useMainStore();
    return {
      store,
    }
  },
  name: 'adminProductRefreshComponent',
  data() {
    return {
      pwd: '',
      alert: {
        status: false,
        message: 'Incorrect password.'
      },
      requiredRule: (value) => !!value || 'Required.',
      lengthRule: (value) => {
        return value.length >= 6
          ? true
          : 'Password length needs to be atleast 6 characters';
      },
    };
  },
  computed: {
    user() {
      return this.store.getUser;
    }
  },
  props: {
    mobile: {
      required: true,
      type: Boolean,
    }
  },
  methods: {
    async callback() {
      const res = await $fetch('api/admin/patch/products', {
        method: 'POST',
        body: {
          token: await this.user.getIdToken(),
        }
      });
    },
  },
  mounted() {},
  updated() {},
  components: {},
  emits: []
};
</script>
