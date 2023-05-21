<template>
  <v-app v-if="expired">
    <v-row class="fill-height ma-0" justify="center" align="center">
      <v-col cols="12" :class="['d-flex', 'justify-center']">
        <v-card
          width="fit-content" 
          height="fit-content"
          variant="elevated"
          elevation="10"
          rounded="xl"
          class="pa-3"
        >
          <v-card-title class="text-center text-h4 mt-4 text-wrap">
            Your subscription has expired
          </v-card-title>
          <v-card-subtitle class="text-center">
            You can access the customer portal below
          </v-card-subtitle>
          <img>
          <v-card-actions>
            <v-row justify="center" class="ma-0">
              <v-btn
                @click="getPortalSession"
                class="text-decoration-underline"
                color="deep-purple"
              >
                Customer portal
              </v-btn>
              <v-btn
                @click="signOut"
                class="text-decoration-underline"
                color="deep-purple"
                flat
              >
                Signout
              </v-btn>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-app>
  <v-app v-else-if="user !== null">
    <Header />
    <NuxtPage />
    <overlay-alert />
    <Footer />
  </v-app>
  <v-app v-else>
    <loading-container :lines="1" :vh="mobile ? '10' : '5'" />
    <loading-container :lines="1" :vh="mobile ? '90' : '95'" />
  </v-app>
</template>

<style>
@import url(~/assets/css/fonts.css);
@import url(~/assets/css/bg-colors.css);
@import url(~/assets/css/text-colors.css);
@import url(~/assets/css/position-helpers.css);
@import url(~/assets/css/opacity.css);
@import url(~/assets/css/loaders.css);

* {
  font-family: 'Quicksand-Regular';
  text-transform: unset !important;
}

html {
  overflow-y: overlay;
}

.v-application {
  min-height: 100vh;
}

.v-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100% !important;
}

.v-form > * {
  width: 100%;
}

.grecaptcha-badge {
  visibility: hidden;
}

.component-main-container {
  min-height: 100vh;
}

/* Scroll */

*::-webkit-scrollbar {
  width: 9px;
  height: 9px;
  background: transparent;
}

*::-webkit-scrollbar-track {
  background: transparent;
  width: 9px;
}

*::-webkit-scrollbar-thumb {
  background: #b0b0b0;
  border-radius: 7px;
  width: 7px;
  border: 1px solid transparent;
}

@media (max-width: 850px) {
  .component-main-container {
    min-height: calc(100vh - 66px);
  }
}
</style>

<script>
import { useMainStore } from '~~/stores/mainStore';
export default {
  setup() {
    useHead({
      titleTemplate: (pageTitle) => {
        return pageTitle ? `${pageTitle} - Test` : 'Test';
      },
    });
    const signOut = async () => {
      const result = await signOutUser();
    };
    const store = useMainStore();
    return {
      store,
      signOut,
    };
  },
  name: 'App page',
  data() {
    return {
      mobile: true,
    };
  },
  computed: {
    user() {
      return this.store.getUser;
    },
    expired() {
      return this.store.getExpired;
    }
  },
  methods: {
    onResize() {
      this.mobile = window.innerWidth < 850;
    },
  },
  async mounted() {
    this.onResize();
    window.addEventListener('resize', this.onResize, { passive: true });
    const res = await getPlans();
    if (res.success) {
      this.store.setPlans(res.data.stripe_plans);
      this.store.setCurrencies(res.data.stripe_currencies);
    }
  },
  updated() {},
  components: {},
};
</script>
