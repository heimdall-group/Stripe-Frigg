<template>
  <v-container fluid class="component-main-container">
    <v-form validate-on="submit" class="px-12" @submit="onSubmit" color="surface">
      <v-text-field
        v-model="name"
        label="Name"
        color="secondary"
        variant="outlined"
        type="text"
        :rules="[
          this.store.verify_requiredRule
        ]"
      ></v-text-field>
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
          :rules="[
            this.store.verify_requiredRule
          ]"
        ></v-text-field>
        <v-text-field
          v-model="dateOfBirth.month"
          label="mm"
          color="secondary"
          variant="outlined"
          type="text"
          maxlength="2"
          :rules="[
            this.store.verify_requiredRule
          ]"
        ></v-text-field>
        <v-text-field
          v-model="dateOfBirth.day"
          label="dd"
          color="secondary"
          variant="outlined"
          type="text"
          maxlength="2"
          :rules="[
            this.store.verify_requiredRule
          ]"
        ></v-text-field>
      </v-row>
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
      <v-text-field
        v-model="pwdRepeat"
        label="Repeat Password"
        color="secondary"
        variant="outlined"
        type="password"
        :rules="[
          this.store.verify_requiredRule, 
          () => {this.store.verify_pwdMatchRule(this.pwd, this.pwdRepeat)}, 
          this.store.verify_LengthRule
        ]"
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
          this.number,
          this.dateOfBirth.year,
          this.dateOfBirth.month,
          this.dateOfBirth.day,
        ]),
        this.store.verify_LengthRule(this.pwd),
        this.store.verify_LengthRule(this.pwdRepeat),
        this.store.verify_pwdMatchRule(this.pwdRepeat, this.pwd),
        await this.mailChangeCallback(this.email),
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
    async mailChangeCallback() {
      ('this.mailChangeCallback')
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
