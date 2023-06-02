<template>
    <v-dialog transition="dialog-bottom-transition" width="auto" v-model="dialog">
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
            <v-text-field
              label="Password"
              type="password"
              v-model="pwd"
              variant="outlined"
              :rules="[
                this.store.verify_requiredRule, 
                this.store.verify_LengthRule
              ]"
            ></v-text-field>
            <v-btn flat type="submit" :color="color_2">Continue</v-btn>
          </v-form>
        </v-card>
    </v-dialog>
    <v-dialog  transition="dialog-bottom-transition" width="auto" v-model="provider_dialog">
      <v-card
          width="400px"
          class="pa-4 px-8 ma-4"
          rounded="xl"
        >
          <v-card-title class="text-center">
            This action is protected.
          </v-card-title>
          <v-btn flat type="submit" :color="color_2" @click="providerHandler">Reauthenticate</v-btn>
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
      dialog: false,
      provider_dialog: false,
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
        const result = await firebase_verifyPassword(this.pwd);
        if (result.success) {
          this.callback();
        }
        this.dialog = false;
        this.pwd = '';
      }
    },
    async providerHandler() {
      const result = await firebase_reauthenticateProvider();
        if (result.success) {
          this.callback();
        }
        this.dialog = false;
        this.provider_dialog = false;
    },  
    async clickHandler() {
      const { providerId } = this.user.providerData[0];
      switch (providerId) {
        case 'password': 
          this.dialog = true;
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
