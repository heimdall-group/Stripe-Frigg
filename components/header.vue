<template>
  <v-container fluid class="">
    <v-navigation-drawer v-model="drawer" app temporary>
      <v-btn @click="toggleTheme" rounded>
        <v-icon v-if="theme()">mdi-weather-sunny</v-icon>
        <v-icon v-else>mdi-weather-night</v-icon>
      </v-btn>
    </v-navigation-drawer>
    <v-app-bar app rounded class="px-15">
      <v-toolbar-title> </v-toolbar-title>
      <v-row>
        <v-app-bar-nav-icon @click="drawer = !drawer" class="mr-4" />
      </v-row>
    </v-app-bar>
  </v-container>
</template>

<script>
import { useTheme } from 'vuetify';
import { useMainStore } from '~~/stores/mainStore';
export default {
  setup() {
    const store = useMainStore;
    const theme = useTheme();
    return {
      store,
      theme: () => {
        return theme.global.current.value.dark
      },
      toggleTheme: () =>
        (theme.global.name.value = theme.global.current.value.dark
          ? 'light'
          : 'dark'),
    };
  },
  name: 'headerComponent',
  data() {
    return {
      drawer: false,
      mobile: true,
    };
  },
  computed: {},
  methods: {
    onResize() {
      this.mobile = window.innerWidth < 850;
    },
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
