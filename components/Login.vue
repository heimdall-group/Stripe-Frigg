<template>
  <v-container class="component-main-container">
    <v-form @submit.prevent="onSubmit">
      <v-text-field 
        label="Email" 
        type="email" 
        v-model="email"
        variant="outlined"
        :rules="[requiredRule, emailRule]"
      ></v-text-field>
      <v-text-field
        label="Password"
        type="password"
        v-model="pwd"
        variant="outlined"
        :rules="[requiredRule, lengthRule]"
      ></v-text-field>
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
      requiredRule: (value) => !!value || 'Required.',
      emailRulePattern:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      emailRule: (value) => {
        return this.emailRulePattern.test(value) || 'Invalid e-mail.';
      },
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
    },
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault();
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
    },
    alertCallback() {
      this.alert.status = !this.alert.status;
    },
  },
};
</script>
