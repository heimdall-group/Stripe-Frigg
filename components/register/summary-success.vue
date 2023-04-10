<template>
  <v-container fluid class="component-main-container px-0"> 
    <v-row class="fill-height" align="center">
      <v-col cols="12" class="d-flex justify-center">
        <v-card
          :width="mobile ? '90%' : '300px'" 
          height="fit-content"
          variant="elevated"
          elevation="10"
          rounded="xl"
        >
          <v-card-title class="text-center text-h4 mt-4">
            Subscription activated
          </v-card-title>
          <v-card-subtitle class="text-center">
            You can access the customer portal below
          </v-card-subtitle>
          <img>
          <v-card-actions>
            <v-row justify="center">
              <v-btn
                @click="portalSessionHandler"
                class="text-decoration-underline"
                color="deep-purple"
              >
                Manage your subscription
              </v-btn>
              <v-btn
                nuxt
                to="/"
                class="text-decoration-underline"
                color="deep-purple"
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
    return {
      mobile: true,
    };
  },
  computed: {
    user() {
      return this.store.getUser;
    },
  },
  methods: {
    async addCustomerID(id) {
      const res = await $fetch('/api/register/addCustomerID', {
        method:'POST',
        body: {
          token: await this.user.getIdToken(),
          sessionID: id,
        }
      });
    },
    async portalSessionHandler() {
      const res = await $fetch('/api/plans/getPortalSession', {
        method: 'POST',
        body: {
          token: await this.user.getIdToken(),
        }
      });
      window.location = res;
    },
    onResize() {
      this.mobile = window.innerWidth < 850;
    },
  },
  watch: {
    user() {
      if(this.user) {
        const router = useRouter();
        const params = new URLSearchParams(window.location.search);
        if (params.has('session_id')) {
          const session_id = params.get('session_id');
          this.addCustomerID(session_id);
          updateStep('finished');
        } else {
          router.push('/');
        }
      }
    }
  },
  mounted() {
    this.onResize();
    window.addEventListener('resize', this.onResize, { passive: true });
  },
  updated() {},
  components: {},
  emits: [],
};
</script>
