<template>
  <v-app>
    <Header />
    <NuxtPage/>
  </v-app>
</template>

<style>
  @import url(~/assets/css/fonts.css);
  @import url(~/assets/css/bg-colors.css);
  @import url(~/assets/css/text-colors.css);

  * {
    font-family: 'Quicksand-Regular';
    text-transform: unset !important;
  }

  .component-main-container {
    min-height: calc(100vh - 32px);
  }

  .v-form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .v-form > * {
    width: calc(100% - 48px);
  }

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