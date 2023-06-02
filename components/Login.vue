<template>
  <v-container fluid class="component-main-container">
    <v-form validate-on="submit" class="px-12" @submit="onSubmit" color="surface">
      <form-email :origin="email" @onInput="(prop) => this.email = prop" />
      <form-password :origin="pwd" @onInput="(prop) => this.pwd = prop" />
      <verify-recaptcha></verify-recaptcha>
      <v-btn type="submit" :loading="loading">Sign in</v-btn>
    </v-form>
    <providers />
  </v-container>
</template>

<script>
import { useMainStore } from '~~/stores/mainStore';

export default {
  setup() {
    const store = useMainStore();
    return {
      store,
    };
  },
  name: 'signInComponent',
  data() {
    return {
      email: '',
      pwd: '',
      loading: false,
    };
  },
  computed: {
    user() {
      return this.store.getUser;
    },
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault();
      this.loading = true;
      const callback = async () => {
        if (
        this.store.verify_emailRule(this.email) &&
        this.store.verify_requiredRule(this.email) &&
        this.store.verify_LengthRule(this.pwd) &&
        this.store.verify_requiredRule(this.pwd)
        ) {
          await firebase_password_signInUser(this.email, this.pwd);
          this.loading = false;
        }
      };
      const error = async () => {
        this.loading = false;
      }
      recaptcha_verification(callback, error);
    },
  },
};
</script>
