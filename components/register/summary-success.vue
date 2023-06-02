<template>
  <v-container fluid class="component-main-container"> 
    <v-row class="fill-height" align="center">
      <v-col cols="12" :class="['d-flex', 'justify-center', mobile ? '' : 'px-16']">
        <v-card
          width="fit-content" 
          height="fit-content"
          variant="elevated"
          elevation="10"
          rounded="xl"
          class="pa-8"
        >
          <v-card-title class="text-center text-h4 mt-4 text-wrap">
            Subscription activated
          </v-card-title>
          <v-card-subtitle class="text-center">
            You can access the customer portal below
          </v-card-subtitle>
          <img>
          <v-card-actions>
            <v-row justify="center">
              <v-btn
                @click="user_getPortalSession"
                class="text-decoration-underline"
                color="purple-lighten-2"
              >
                Customer portal
              </v-btn>
              <v-btn
                nuxt
                to="/"
                class="text-decoration-underline"
                color="purple-lighten-2"
              >
                Continue to dashboard
              </v-btn>
            </v-row>

          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

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
  name: 'registerSummarySuccessComponent',
  data() {
    return {};
  },
  computed: {
    user() {
      return this.store.getUser;
    },
    mobile() {
      return this.store.getMobile;
    }
  },
  methods: {},
  watch: {
    user: {
      handler() {
        if(this.user) {
          const router = useRouter();
          const params = new URLSearchParams(window.location.search);
          if (params.has('session_id')) {
            user_updateStep('finished');
          } else {
            router.push('/');
          }
        }
      },
      deep: true,
    }
  },
  mounted() {},
  updated() {},
  components: {},
  emits: [],
};
</script>
