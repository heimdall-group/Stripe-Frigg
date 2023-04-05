<template>
  <v-container>
    <v-form @submit.prevent="onSubmit">
      <v-text-field label="Email" type="email" v-model="email"></v-text-field>
      <v-text-field
        label="Password"
        type="password"
        v-model="pwd"
      ></v-text-field>
      <v-btn type="submit">Sign in</v-btn>
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
      email: 'test1@gmail.com',
      pwd: '123456',
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
      const res = await signInUser(this.email, this.pwd);
    },
  },
};
</script>
