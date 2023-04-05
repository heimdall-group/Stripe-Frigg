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

  * {
    font-family: 'Quicksand-Regular';
    text-transform: unset !important;
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

</style>

<script>
import { useMainStore } from '~~/stores/mainStore';
export default {
  setup() {
    useHead({
      titleTemplate: (pageTitle) => {
        return pageTitle ? `${pageTitle} - Test` : 'TEst';
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
  mounted() {

  },
  updated() {},
  components: {},
};
</script>