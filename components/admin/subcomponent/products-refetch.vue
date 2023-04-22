<template>
  <v-card
    max-width="600px"
    class="pa-4 ma-4"
    rounded="xl"
  >
    <v-card-title class="text-center">Refetch Products</v-card-title>
    <v-card-subtitle class="text-center">Sync products from Stripe to server</v-card-subtitle>
    <v-card-actions>
      <v-form @submit="onSubmitHandler">
        <v-text-field
          label="Password"
          type="password"
          v-model="pwd"
          variant="outlined"
          :error-messages="alert.status ? alert.message : ''"
          :rules="[requiredRule, lengthRule]"
        ></v-text-field>
        <v-btn type="submit" flat>Refetch products</v-btn>
      </v-form>
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
    async onSubmitHandler(event) {
      event.preventDefault();
      if (this.requiredRule(this.pwd) === true && this.lengthRule(this.pwd) === true) {
        const res = await verifyPassword(this.pwd);
        if (res && res.code === 'auth/wrong-password') {
          this.alert.status = true;
        } else {
          this.alert.status = false;
          const res = await $fetch('api/admin/patchProducts', {
            method: 'POST',
            body: {
              token: await this.user.getIdToken(),
            }
          });
        }
      }
    },
  },
  mounted() {},
  updated() {},
  components: {},
  emits: []
};
</script>
