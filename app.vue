<template>
  <v-app>
    <Header />
    <NuxtPage/>
    <overlay-alert />
  </v-app>
</template>

<style>
  @import url(~/assets/css/fonts.css);
  @import url(~/assets/css/bg-colors.css);
  @import url(~/assets/css/text-colors.css);
  @import url(~/assets/css/position-helpers.css);
  @import url(~/assets/css/opacity.css);

  * {
    font-family: 'Quicksand-Regular';
    text-transform: unset !important;
  }

  .v-application {
    height: 100vh;
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

  .grecaptcha-badge { visibility: hidden; }

  .component-main-container {
    min-height: 100vh;
  }

  @media (max-width: 850px) {
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
    const store = useMainStore();
    return {
      store,
    };
  },
  name: 'App page',
  data() {
    return {};
  },
  computed: {},
  methods: {},
  async mounted() {
    this.store.setPlans(await getPlans())
  },
  updated() {
    console.log(user)
  },
  components: {},
};
</script>