<template>
  <v-app>
    <Header />
    <NuxtPage/>
  </v-app>
</template>

<style>
  .bg-contrast {
    
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