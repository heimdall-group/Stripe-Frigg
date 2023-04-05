<template>
  <v-container fluid class="component-main-container py-0">
    <v-form validate-on="submit" @submit="submitCallback" color="surface">
      <v-text-field
        v-model="name"
        label="Name"
        color="secondary"
        variant="outlined"
        type="text"
        :rules="[requiredRule]"
      ></v-text-field>
      <v-text-field
        v-model="email"
        label="Email"
        color="secondary"
        variant="outlined"
        type="text"
        :error-messages="mailError ? 'Email already in use' : ''"
        @change="mailChangeCallback"
        :rules="[requiredRule, emailRule]"
      ></v-text-field>
      <v-text-field
        v-model="number"
        label="Number (Optional)"
        color="secondary"
        variant="outlined"
        type="text"
      ></v-text-field>
      <v-row>
        <v-text-field
          v-model="dateOfBirth.year"
          label="yyyy"
          color="secondary"
          variant="outlined"
          type="text"
          maxlength="4"
          :rules="[requiredRule]"
        ></v-text-field>
        <v-text-field
          v-model="dateOfBirth.month"
          label="mm"
          color="secondary"
          variant="outlined"
          type="text"
          maxlength="2"
          :rules="[requiredRule]"
        ></v-text-field>
        <v-text-field
          v-model="dateOfBirth.day"
          label="dd"
          color="secondary"
          variant="outlined"
          type="text"
          maxlength="2"
          :rules="[requiredRule]"
        ></v-text-field>
      </v-row>
      <v-text-field
        v-model="pwd"
        label="Password"
        color="secondary"
        variant="outlined"
        type="password"
        :rules="[requiredRule, lengthRule]"
      ></v-text-field>
      <v-text-field
        v-model="pwdRepeat"
        label="Repeat Password"
        color="secondary"
        variant="outlined"
        type="password"
        :rules="[requiredRule, pwdMatchRule, lengthRule]"
      ></v-text-field>
      <client-only>
        <div
          id="recaptcha-container"
          class="d-flex justify-center mb-4"
          :data-sitekey="recaptchaSitekey"
        ></div>
      </client-only>
      <v-btn type="submit" rounded elevation="10">Continue</v-btn>
      <v-alert
        v-show="error.status"
        :text="error.message"
        type="warning"
        class="mt-4"
      >
        <v-btn
          flat
          position="absolute"
          color="transparent right top-center-36 ml-4"
          @click="this.error.status = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-alert>
    </v-form>
  </v-container>
</template>

<script>
import { useMainStore } from '~~/stores/mainStore';

export default {
  setup() {
    useHead({
      script: [
        {
          hid: 'recaptcha v2',
          src: `https://www.google.com/recaptcha/api.js?render=${
            useRuntimeConfig().recaptcha_v3
          }`,
          defer: true,
          async: true,
        },
      ],
    });
    const store = useMainStore();
    return {
      store,
    };
  },
  name: 'registerStep1Component',
  data() {
    return {
      email: 'test1@gmail.com',
      name: 'test',
      number: '0793138309',
      dateOfBirth: {
        year: '2002',
        month: '10',
        day: '02',
      },
      pwd: '123456',
      pwdRepeat: '123456',
      mailError: false,
      requiredRule: (value) => !!value || 'Required.',
      emailRulePattern:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      emailRule: (value) => {
        return this.emailRulePattern.test(value) || 'Invalid e-mail.';
      },
      pwdMatchRule: (value) => {
        return this.pwd === value ? true : 'Password doesnt match';
      },
      lengthRule: (value) => {
        return value.length >= 6
          ? true
          : 'Password length needs to be atleast 6 characters';
      },
      v2: false,
      error: {
        status: false,
        message:
          'A verification error has accured. Please reload the page and try again',
      },
      recaptchaSitekey: useRuntimeConfig().recaptcha_v2,
    };
  },
  computed: {},
  methods: {
    async submitCallback(event) {
      event.preventDefault();
      const validations = [
        this.emailRule(this.email),
        this.validateRequired([
          this.email,
          this.name,
          this.pwd,
          this.pwdRepeat,
          this.number,
          this.dateOfBirth.year,
          this.dateOfBirth.month,
          this.dateOfBirth.day,
        ]),
        this.lengthRule(this.pwd),
        this.lengthRule(this.pwdRepeat),
        this.pwdMatchRule(this.pwdRepeat),
        await this.mailChangeCallback(this.email),
      ];
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
        // Recaptcha
        const token = await getRecaptchaToken();
        const res = await $fetch('/api/verify/recaptcha', {
          method: 'POST',
          body: {
            token: token,
          },
        });
        if (res) {
          const res = await createUser(
            this.name,
            this.email,
            this.pwd,
            this.number,
            this.dateOfBirth,
          );

          if (res) {
            console.log('redirect');
          }
        } else if (this.v2 !== true) {
          grecaptcha.render('recaptcha-container', {
            sitekey: useRuntimeConfig().recaptcha_v2,
          });
          this.v2 = true;
        } else {
          this.error.status = true;
        }
      }
    },
    validateRequired(arr) {
      for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        if (this.requiredRule(item)) {
          continue;
        } else {
          return false;
        }
      }
      return true;
    },
    async mailChangeCallback() {
      const res = await $fetch('/api/register/validEmail', {
        method: 'POST',
        body: JSON.stringify({ mail: this.email }),
      });
      if (res) {
        this.mailError = false;
        return true;
      } else {
        this.mailError = true;
        return false;
      }
    },
  },
  mounted() {},
  updated() {},
  components: {},
  emits: [],
};
</script>
