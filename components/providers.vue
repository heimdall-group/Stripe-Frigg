<template>
  <v-row justify="center" class="my-8">
    <v-card width="400px" class="pa-4">
      <v-card-title class="text-center"> Other methods: </v-card-title>
      <v-card-actions>
        <v-row justify="center">
          <v-list width="200px">
            <v-list-item
              v-for="(provider, index) in providers"
              :key="index"
              class="justify-center"
            >
              <v-btn
                :prepend-icon="provider.icon"
                @click="() => {providerHandler(provider)}"
                :loading="provider.loading"
              >
                {{ provider.text }}
              </v-btn>
            </v-list-item>
          </v-list>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-row>
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
  name: 'providersComponent',
  data() {
    return {
      providers: [
        {
          icon: 'fa-brands fa-google',
          callback: firebase_google_createUser,
          text: 'Google',
        },
        {
          icon: 'fa-brands fa-apple',
          callback: firebase_google_createUser,
          text: 'Apple',
        },
        {
          icon: 'fa-brands fa-facebook',
          callback: firebase_google_createUser,
          text: 'Facebook',
        },
        {
          icon: 'fa-brands fa-twitter',
          callback: firebase_google_createUser,
          text: 'Twitter',
        },
      ]
    };
  },
  computed: {},
  methods: {
    async providerHandler(provider) {
      provider.loading = true;
      const result = await provider.callback();
      provider.loading = false;
    },
  },
  mounted() {},
  updated() {},
  components: {},
  emits: [],
};
</script>
