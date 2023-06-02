<template>
  <v-container fluid class="component-main-container">
    <v-form validate-on="submit" class="px-12" @submit="onSubmit" color="surface">
      <form-name :origin="name" @onInput="(prop) => this.name = prop" />
      <form-email :origin="email" @onInput="(prop) => this.email = prop" />
      <form-password :origin="pwd" @onInput="(prop) => this.pwd = prop" />
      <form-password-repeat :pwd_2="pwdRepeat" :pwd_1="pwd" @onInput="(prop) => this.pwdRepeat = prop" />
      <verify-recaptcha />
      <v-btn type="submit" :loading="loading" rounded elevation="10">Continue</v-btn>
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
  name: 'registerStep1Component',
  data() {
    return {
      email: '',
      name: '',
      number: '',
      dateOfBirth: {
        year: '',
        month: '',
        day: '',
      },
      loading: false,
      pwd: '',
      pwdRepeat: '',
      error: {
        status: false,
        message:
          'A verification error has accured. Please reload the page and try again',
      },

    };
  },
  computed: {},
  methods: {
    async onSubmit(event) {
      event.preventDefault();
      const validations = [
        this.store.verify_emailRule(this.email),
        this.store.verify_validateRequired([
          this.email,
          this.name,
          this.pwd,
          this.pwdRepeat,
        ]),
        this.store.verify_LengthRule(this.pwd),
        this.store.verify_LengthRule(this.pwdRepeat),
        this.store.verify_pwdMatchRule(this.pwdRepeat, this.pwd),
      ];
      (validations)
      for (let i = 0; i < validations.length; i++) {
        const validation = validations[i];
        if (validation !== true) {
          return;
        }
      }
      this.signUpUser();
    },
    async signUpUser() {
      if (this.pwd === this.pwdRepeat) {
        this.loading = true;
        const callback = async () => {
          const res = await firebase_password_createUser(
            this.name,
            this.email,
            this.pwd,
          );
          this.loading = false
        };
        const error = () => {
          this.loading = false
        }
        recaptcha_verification(callback, error);
      }
    },
  },
  mounted() {},
  updated() {},
  components: {},
  emits: [],
};
</script>
