<template>
  <v-container fluid class="component-main-container">
    <v-row justify="center" class="main-row py-8">
      <v-col cols="12">
        <v-form @input="onInput">
          <form-email :origin="email" :disabled="disabled" @onInput="(prop) => (this.email = prop)" />
          <form-name :origin="name" @onInput="(prop) => (this.name = prop)" />
          <form-number :origin="number" @onInput="(prop) => (this.number = prop)" />
          <verify-password :disabled="!changes" color_2="" :callback="updateProfile" color="success" text="Save"></verify-password>
        </v-form>
        <v-card class="pa-6 my-6">
          <v-row>
            <v-col cols="6">
              Email verified:
              <font-awesome-icon v-if="email_verified" icon="fa-solid fa-square-check" />
              <font-awesome-icon v-else icon="fa-solid fa-square-xmark" />
            </v-col>
            <v-col cols="12">
              Authenticator: <font-awesome-icon :icon="provider_icon" />
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-divider></v-divider>
      <v-col cols="12">
        <v-row>
          <v-col cols="12">
            <v-btn @click="user_getPortalSession">Customer Portal</v-btn>
          </v-col>
          <v-col cols="12">
            <v-btn :disabled="email_verified" @click="firebase_verifyEmail">Verify Email</v-btn>
          </v-col>
          <v-col cols="12">
            <verify-password color_2="error" :callback="user_removeAccount" text="Remove account" color="error" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
form,
.v-col {
  max-width: 800px;
}

/* .main-row {
  height: 800px;
} */

.fa-envelope-circle-check,
.fa-google,
.fa-apple,
.fa-facebook,
.fa-twitter,
.fa-square-check,
.fa-square-xmark {
  margin: 0 0 -4px 8px;
  height: 24px;
  width: 24px;
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
  name: 'profileComponent',
  data() {
    return {
      email: '',
      name: '',
      number: '',
      provider_icon: 'fa-solid fa-envelopes-bulk',
      provider: '',
      email_verified: false,
      disabled: true,
      remove_dialog: false,
      changes: false,
    };
  },
  computed: {
    user() {
      return this.store.getUser;
    },
  },
  methods: {
    onInput() {
      this.changes = true;
    },
    updateProfile() {
      user_patchUserProfile(this.number, this.name);
    },
  },
  async mounted() {
    const result = await user_getUserProfile();
    if (result.success) {
      const {
        user_email,
        user_number,
        user_name,
        user_provider,
        email_verified,
      } = result.data;
      this.email = user_email;
      this.number = user_number || '';
      this.name = user_name || '';
      this.provider = user_provider;
      this.provider_icon = firebase_getProviderIcon(user_provider);
      this.email_verified = email_verified;
    } else {
    }
  },
};
</script>
