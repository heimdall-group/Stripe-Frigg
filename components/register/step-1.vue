<template>
  <v-container fluid class="component-main-container">
    <v-form validate-on="submit" class="px-12" @submit="submitCallback" color="surface">
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
      <verify-recaptcha ></verify-recaptcha>
      <v-btn type="submit" rounded elevation="10">Continue</v-btn>
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
      pwd: '',
      pwdRepeat: '',
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
      error: {
        status: false,
        message:
          'A verification error has accured. Please reload the page and try again',
      },

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
        const callback = async () => {
          const {year, month, day} = this.dateOfBirth
          const date = new Date(`${year}-${month}-${day}`)
          const res = await createUser(
            this.name,
            this.email,
            this.pwd,
            this.number,
            date.getTime(),
          );
        }
        setupVerification(callback);
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
      const res = await $fetch('/api/verify/userEmail', {
        method: 'POST',
        body: JSON.stringify({ mail: this.email }),
      });
      if (res.success) {
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
