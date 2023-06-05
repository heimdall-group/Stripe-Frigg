<template>
    <v-dialog transition="dialog-bottom-transition" width="auto" v-model="password_dialog">
      <template v-slot:activator="{ props }">
        <v-btn :disabled="disabled" flat :color="color" @click="clickHandler" >{{ text }}</v-btn>
      </template>
        <v-card
          width="400px"
          class="pa-4 px-8 ma-4"
          rounded="xl"
        >
          <v-card-title class="text-center">
            Password verification
          </v-card-title>
          <v-form class="pb-4" @submit="passwordHandler">
            <form-password :origin="pwd" @onInput="(prop) => this.pwd = prop" />
              {{ color_2 }}
            <v-btn flat type="submit" :loading="password_loading" :color="color_2">Continue</v-btn>
          </v-form>
        </v-card>
    </v-dialog>
    <v-dialog  transition="dialog-bottom-transition" width="auto" v-model="provider_dialog">
      <v-card
          width="400px"
          class="pa-4 pb-6 px-8 ma-4"
          rounded="xl"
        >
          <v-card-title class="text-center">
            This action is protected.
          </v-card-title>
          <v-btn flat type="submit" :loading="provider_loading" :color="color_2" @click="providerHandler">Reauthenticate</v-btn>
        </v-card>
    </v-dialog>
</template>

<script>
import { useMainStore } from '~/stores/mainStore';

export default {
  setup() {
    const store = useMainStore();
    return {
      store,
    };
  },
  name: 'verifyPasswordComponent',
  data() {
    return {
      pwd: '',
      alert: {
        status: false,
        message: 'Incorrect password.',
      },
      password_dialog: false,
      password_loading: false,
      provider_dialog: false,
      provider_loading: false,
    };
  },
  computed: {
    user() {
      return this.store.getUser;
    },
  },
  watch: {
    dialog() {
      this.pwd = '';
    }
  },
  props: {
    callback: {
      type: Function,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: false,
    },
    color_2: {
      type: String,
      required: false,
    },
    disabled: {
      type: Boolean,
      required: false,
    }
  },
  methods: {
    async passwordHandler(event) {
      event.preventDefault();
      if (
        this.store.verify_requiredRule(this.pwd) === true &&
        this.store.verify_LengthRule(this.pwd) === true
      ) {
        this.password_loading = true;
        const result = await firebase_verifyPassword(this.pwd);
        if (result.success) {
          this.password_loading = false;
          this.callback();
        }
        this.password_dialog = false;
        this.pwd = '';
      }
    },
    async providerHandler() {
      this.provider_loading = true;
      const result = await firebase_reauthenticateProvider();
      if (result.success) {
        this.provider_loading = false;
        this.callback(); 
      }
      this.password_dialog = false;
      this.provider_dialog = false;
    },  
    async clickHandler() {
      const { providerId } = this.user.providerData[0];
      switch (providerId) {
        case 'password': 
          this.password_dialog = true;
          break
        default:
          this.provider_dialog = true;
          break;
      }
    }
  },
  mounted() {},
  updated() {},
  components: {},
  emits: [],
};
</script>
