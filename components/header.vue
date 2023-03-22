<template>
  <v-container fluid color="primary" class="pa-0 header">
    <v-navigation-drawer
      v-if="user"
      color="primary"
      border
      :expand-on-hover="!mobile"
      rail
      :floating="!mobile"
      permanent
      :location="mobile ? 'bottom' : 'left'"
      class="mobile-navbar"
    >
      <v-list v-if="!mobile">
        <v-list-item
          v-if="!mobile"
          title="Dashboard Drawer"
          prepend-icon="mdi-shield-crown"
        ></v-list-item>
        <v-list-item v-for="link in userNavigationLinks"  rounded :prepend-icon="link.icon">
          <v-btn nuxt :to="link.to" rounded flat width="100%">
            {{ link.title}}
          </v-btn>
        </v-list-item>
      </v-list>
      <v-row v-if="mobile" justify="space-around" class="flex-nowrap ma-0 pa-2">
        <v-btn v-for="link in mobileNavigationLinks" nuxt :to="link.to" rounded flat :icon="link.icon">
        </v-btn>
        <v-divider vertical></v-divider>
        <v-btn @click="mobileSubmenu = !mobileSubmenu" rounded flat icon="mdi-dots-vertical">
        </v-btn>
      </v-row>
      <template v-slot:append v-if="!mobile">
        <v-list>
          <v-list-item rounded class="text-subtitle" prepend-icon="empty">
            <v-btn nuxt class="text-subtitle" color="transparent" to="/pricary-policy" rounded flat>
              Privacy Policy
            </v-btn>
          </v-list-item>
          <v-list-item rounded prepend-icon="mdi-logout">
            <v-btn rounded flat @click="signOut">
              Logout
            </v-btn>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>
    <v-navigation-drawer v-if="mobile" v-model="mobileSubmenu" rail class="mobile-sub-navbar" location="bottom" >
        <v-row v-if="mobile" justify="space-around" class="flex-nowrap ma-0 pa-2">
          <v-btn v-for="link in mobileSubNavigationLinks" nuxt :to="link.to" rounded flat :icon="link.icon">
          </v-btn>
          <v-divider vertical></v-divider>
          <v-btn nuxt to="/" rounded flat icon="mdi-logout">
          </v-btn>
        </v-row>
      </v-navigation-drawer>
    <v-navigation-drawer v-if="!user" app temporary color="primary" v-model="drawer">
      <v-list>
        <v-list-item
          v-for="(link, index) in navigationLinks"
          :key="index"
          :prepend-icon="link.icon"
        >
          <v-btn width="100%" nuxt :to="link.to" rounded border flat>
            {{ link.title }}
          </v-btn>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <v-list>
          <v-list-item>
            <v-btn
              to="/privacy-policy"
              nuxt
              rounded
              flat
              size="x-small"
              color="transparent"
              class="text-subtitle"
              >Privacy Policy</v-btn
            >
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>
    <v-toolbar v-if="!user" app rounded class="px-15">
      <v-toolbar-title></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-row v-if="!mobile" align="center" justify="end">
        <v-btn v-for="link in navigationLinks" nuxt :to="link.to" rounded flat class="mx-1"> {{ link.title }} </v-btn>
      </v-row>
      <v-app-bar-nav-icon v-else @click="drawer = !drawer" class="mr-4" />
    </v-toolbar>
  </v-container>
</template>

<!-- This cannot be scoped, .mobile-navbar rules wont apply -->
<style>
.mobile-navbar .v-navigation-drawer .v-list .v-btn {
  width: 100%;
}

@media (max-width: 850px) {
  .mobile-navbar {
    height: 66px !important;
  }

  .mobile-sub-navbar {
    height: 66px !important;
    bottom: 66px !important;
  }
}
</style>

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
          icon: 'mdi-account-outline',
        },
        {
          to: '/register',
          title: 'Register',
          icon: 'mdi-account-plus-outline',
        },
        {
          to: '/plans',
          title: 'Plans',
          icon: 'mdi-finance',
        },
        {
          to: '/about-us',
          title: 'About us',
          icon: 'mdi-information-outline',
        },
        {
          to: '/contact-us',
          title: 'Contact us',
          icon: 'mdi-phone',
        },
      ],
      userNavigationLinks: [
        {
          to: '/',
          title: 'Dashboard',
          icon: 'mdi-home',
        },
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
    console.log(this.user);
    window.addEventListener('resize', this.onResize, { passive: true });
  },
  updated() {
    console.log('updated');
  },
  components: {},
  emits: [],
};
</script>
