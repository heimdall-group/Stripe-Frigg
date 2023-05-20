<template>
  <v-container class="component-main-container">
    <v-form validate-on="submit" class="px-12" @submit="onSubmit" color="surface">
      <v-text-field
        v-model="email"
        label="Email"
        color="secondary"
        variant="outlined"
        type="text"
        :error-messages="mailError ? 'Email already in use' : ''"
        @change="mailChangeCallback"
        :rules="[
          this.store.verify_requiredRule, 
          this.store.verify_emailRule, 
        ]"
      ></v-text-field>
      <v-text-field
        v-model="pwd"
        label="Password"
        color="secondary"
        variant="outlined"
        type="password"
        :rules="[
          this.store.verify_requiredRule, 
          this.store.verify_LengthRule
        ]"
      ></v-text-field>
      <verify-recaptcha></verify-recaptcha>
      <v-btn type="submit">Sign in</v-btn>
      <client-only>
        <v-alert
          class="my-2"
          width="100%"
          v-show="alert.status"
          type="warning"
          :text="alert.message"
          icon="fa-solid fa-circle-info"
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
    </v-form>
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
      alert: {
        status: false,
        message: '',
      },
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
      const callback = async () => {
        const { code } = await signInUser(this.email, this.pwd);
        if (code) {
          let message;
          if (code.includes('auth/too-many-requests')) {
            message = 'Too many login attempts. Please wait and try again later';
          } else if (code.includes('auth/wrong-password')) {
            message = 'Invalid password. Please try again';
          } else if (code.includes('auth/user-not-found')) {
            message = 'User not found';
          }
          
          this.alert = {
            status: true,
            message: message,
          }
        }
      };
      setupVerification(callback);
    },
    alertCallback() {
      this.alert.status = !this.alert.status;
    },
  },
};
</script>
