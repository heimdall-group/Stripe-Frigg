<template>
  <v-container fluid color="primary" class="">
    <v-navigation-drawer app temporary color="primary" v-model="drawer">
      <v-list>
        <v-list-item v-for="(link, index) in navigationLinks" :key="index" :prepend-icon="link.icon">
          <v-btn
            nuxt
            :to="link.to"
            rounded
            border
            flat
          >
            {{ link.title }}
          </v-btn>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <v-list>
          <v-list-item>
            <v-btn to="/privacy-policy" nuxt rounded flat size="x-small" color="transparent" class="text-subtitle">Privacy Policy</v-btn>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>
    <v-app-bar app rounded class="px-15">
      <v-toolbar-title></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-row v-if="!mobile" align="center" justify="end">
        <v-btn nuxt to="/login" rounded flat class="mx-1">
          Login
        </v-btn>
        <v-btn nuxt to="/register" rounded flat class="mx-1"
          >Register</v-btn
        >  
      </v-row>
      <v-app-bar-nav-icon v-else @click="drawer = !drawer" class="mr-4" />
    </v-app-bar>
  </v-container>
</template>

<style scoped>
.v-navigation-drawer .v-btn {
  width: 100%;
}
</style>

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
        return theme.global.current.value.dark;
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
      navigationLinks: [

      {
          to: '/login',
          title: 'Login',
          icon: '',
        },
        {
          to: '/register',
          title: 'Register',
          icon: '',
        },
        {
          to: '/plans',
          title: 'Plans',
          icon: '',
        },
        {
          to: '/about-us',
          title: 'About us',
          icon: '',
        },
        {
          to: '/contact-us',
          title: 'Contact us',
          icon: '',
        },
      ],
    };
  },
  computed: {
    user() {
      return this.store.getUser;
    },
  },
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
