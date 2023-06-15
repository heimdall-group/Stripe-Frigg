<template>
  <v-container fluid class="component-main-container">
    <v-row justify="center" class="main-row py-8">
      <v-col cols="12">
        <v-form @input="onInput">
          <form-email :disabled="true" :origin="email" @onInput="(prop) => (this.email = prop)" />
          <form-name :origin="name" @onInput="(prop) => (this.name = prop)" />
          <form-number :origin="number" @onInput="(prop) => (this.number = prop)" />
          <v-row justify="center">
            <v-col cols="6" class="d-flex flex-column">
              <verify-password :disabled="!changes" color_2="" :callback="updateProfile" color="success" text="Save"></verify-password>
            </v-col>
          </v-row>
        </v-form>
        <v-card class="pa-6 my-6">
          <v-row>
            <v-col cols="12">
              Email verified:
              <font-awesome-icon v-if="email_verified" icon="fa-solid fa-square-check" />
              <font-awesome-icon v-else icon="fa-solid fa-square-xmark" />
            </v-col>
            <v-col cols="12">
              Authenticator: <font-awesome-icon :icon="firebase_getProviderIcon(provider)" />
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-divider></v-divider>
      <v-col cols="12">
        
      </v-col>
      <v-divider></v-divider>
      <v-col cols="12">
        <v-row class="mt-2 buttons-row">
          <v-col cols="12" md="6" class="v-col">
            Verify email:
            <v-row justify="center">
              <v-col cols="8" md="8" class="button-v-col">
                <v-btn :disabled="email_verified" @click="firebase_verifyEmail">Verify Email</v-btn>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="6" class="v-col">
            Update password:
            <v-row justify="center">
              <v-col cols="8" md="8" class="button-v-col">
                <v-dialog transition="dialog-bottom-transition" width="auto" v-model="update_dialog">
                  <template v-slot:activator="{ props }">
                    <v-btn :disabled="provider !== 'password'" flat @click="update_dialog = !update_dialog" >Update Password</v-btn>
                  </template>
                    <v-card
                      width="auto"
                      class="pa-4 px-8"
                      rounded="xl"
                    >
                      <v-card-title class="text-center">
                        New Password
                      </v-card-title>
                      <v-form class="pb-4" @submit="passwordHandler">
                        <form-password label="Current password" :origin="pwd" @onInput="(prop) => this.pwd = prop" />
                        <form-password label="New password" :origin="new_pwd" @onInput="(prop) => this.new_pwd = prop" />
                        <v-btn type="submit" :loading="update_loading">Update password</v-btn>
                      </v-form>
                    </v-card>
                </v-dialog>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="6" class="v-col">
            Reset password:
            <v-row justify="center">
              <v-col cols="8" md="8" class="button-v-col">
                <v-btn :disabled="provider !== 'password'" @click="firebase_resetPassword">Reset Password</v-btn>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="6" class="v-col">
            Remove account:
            <v-row justify="center">
              <v-col cols="8" md="8" class="button-v-col">
                <verify-password color_2="error" :list="remove_list" :callback="user_removeAccount" text="Remove account" color="error" />
              </v-col>
            </v-row>
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

.buttons-row .v-col {
  display: grid;
  grid-template: 36px 36px / auto;
  text-align: center;
}

.buttons-row .v-col .button-v-col {
  display: grid;
  grid-template: auto / auto;
}

.buttons-row .v-row {
  grid-column: 1;
  grid-row: 2;
}
</style>

<script>
import { useMainStore } from '~~/stores/mainStore';

export default {
  async setup() {
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
      pwd: '',
      new_pwd: '',
      provider: '',
      email_verified: false,
      disabled: true,
      remove_dialog: false,
      remove_list: [
        'This will cancel your subscription',
        'All information will be removed',
        'This can not be undone',
      ],
      update_dialog: false,
      update_loading: false,
      changes: false,
    };
  },
  computed: {
    user() {
      return this.store.getUser;
    },
    profile() {
      return this.store.getProfile;
    },
  },
  methods: {
    onInput() {
      this.changes = true;
    },
    async updateProfile() {
      const result = await user_patchUserProfile(this.number, this.name);
      if (result.success) {
        this.changes = false;
      }
    },
    async passwordHandler(event) {
      event.preventDefault();
      if (
        this.store.verify_requiredRule(this.pwd) === true &&
        this.store.verify_LengthRule(this.pwd) === true
      ) {
        this.update_loading = true;
        const result = await firebase_verifyPassword(this.pwd);
        if (result.success) {
          this.update_dialog = false;
          firebase_updatePassword(this.new_pwd);
        }
        this.update_dialog = false;
        this.update_loading = false;
        this.pwd = '';
      }
    },
  },
  async mounted() {
    if(Object.keys(this.profile).length > 0) {
      const {
        user_email,
        user_number,
        user_name,
        user_provider,
        email_verified,
      } = this.profile;
      this.email = user_email;
      this.number = user_number || '';
      this.name = user_name || '';
      this.provider = user_provider;
      this.email_verified = email_verified;
    }

  },
};
</script>
