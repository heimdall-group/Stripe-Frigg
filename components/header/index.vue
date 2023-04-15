<template>
  <v-container fluid color="primary" class="pa-0 header">
    <header-auth-user v-if="user" :mobile="mobile"></header-auth-user>
    <header-no-auth-user v-else :mobile="mobile"></header-no-auth-user>
  </v-container>
</template>

<script>
import { useTheme } from 'vuetify';
import { useMainStore } from '~~/stores/mainStore';
export default {
  setup() {
    const store = useMainStore();
    const theme = useTheme();
    const signOut = async () => {
      const result = await signOutUser();
    };
    return {
      store,
      theme: () => {
        return theme.global.current.value.dark;
      },
      toggleTheme: () =>
        (theme.global.name.value = theme.global.current.value.dark
          ? 'light'
          : 'dark'),
      signOut,
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
          icon: 'mdi: mdi-account-outline',
        },
        {
          to: '/register/step-1',
          title: 'Register',
          icon: 'mdi: mdi-account-plus-outline',
        },
        {
          to: '/plans',
          title: 'Plans',
          icon: 'mdi: mdi-finance',
        },
        {
          to: '/about-us',
          title: 'About us',
          icon: 'mdi: mdi-information-outline',
        },
        {
          to: '/contact-us',
          title: 'Contact us',
          icon: 'mdi: mdi-phone',
        },
      ],
      userNavigationLinks: [
        {
          to: '/',
          title: 'Overview',
          icon: 'fa-solid fa-table',
        },
        {
          to: '/',
          title: 'Stocks',
          icon: 'fa-solid fa-arrow-trend-up',
        },
        {
          to: '/',
          title: 'Real estate',
          icon: 'fa-solid fa-building-user',
        },
        {
          to: '/',
          title: 'E-commerce',
          icon: 'fa-solid fa-shop',
        },

      ],
      mobileNavigationLinks: [
        {
          to: '/',
          title: 'Dashboard',
          icon: 'mdi-home',
        },
        {
          to: '/',
          title: 'Dashboard',
          icon: 'mdi-home',
        },
        {
          to: '/',
          title: 'Dashboard',
          icon: 'mdi-home',
        },
      ],
      mobileSubNavigationLinks: [
        {
          to: '/plans',
          title: 'Plans',
          icon: 'mdi-finance',
        },
        {
          to: '/contact-us',
          title: 'Contact us',
          icon: 'mdi-phone',
        },
      ],
      mobileSubmenu: false,
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
  updated() {
  },
  components: {},
  emits: [],
};
</script>
