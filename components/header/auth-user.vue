<template>
  <!-- Desktop Auth Drawer -->
  <v-navigation-drawer
    v-if="!mobile"
    color="primary"
    border
    expand-on-hover
    rail
    floating
    permanent
  >
    <v-list>
      <v-list-item
        v-if="!mobile"
        title="Dashboard Drawer"
        prepend-icon="fa-solid fa-bars"
      ></v-list-item>
      <v-list-item v-for="link in links" rounded :prepend-icon="link.icon">
        <v-btn nuxt :to="link.to" rounded flat width="100%">
          {{ link.title }}
        </v-btn>
      </v-list-item>
    </v-list>
    <template v-slot:append>
      <v-list>
        <v-list-item rounded class="text-subtitle" prepend-icon="empty">
          <v-btn
            nuxt
            class="text-subtitle"
            color="transparent"
            to="/privacy-policy"
            rounded
            width="100%"
            flat
          >
            Privacy Policy
          </v-btn>
        </v-list-item>
        <v-list-item rounded prepend-icon="fa-solid fa-right-from-bracket">
          <v-btn rounded width="100%" flat @click="signOut"> Logout </v-btn>
        </v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>

  <!-- Mobile Auth Toolbar -->
  <v-app-bar v-if="mobile" color="primary" location="bottom">
    <v-row justify="space-around">
      <v-btn
        v-for="link in links"
        nuxt
        :to="link.to"
        rounded
        flat
      >
        <font-awesome-icon :icon="link.icon" />
      </v-btn>
      <v-btn
        @click="mobile_sub_menu = !mobile_sub_menu"
        rounded
        flat
      >
      <font-awesome-icon icon="fa-solid fa-face-awesome" />
        <font-awesome-icon icon="fa-solid fa-rectangle-vertical-history" />
        <font-awesome-icon icon="fa-solid fa-bars" />
      </v-btn>
    </v-row>
  </v-app-bar>

  <!-- Mobile Auth Drawer -->
  <v-navigation-drawer
    v-if="mobile"
    temporary
    app
    height="100vh"
    v-model="mobile_sub_menu"
  >
    <v-list>
      <v-list-item
        title="Dashboard Drawer"
        prepend-icon="fa-solid fa-bars"
      ></v-list-item>
      <v-list-item v-for="link in links" rounded :prepend-icon="link.icon">
        <v-btn nuxt :to="link.to" rounded flat width="100%">
          {{ link.title }}
        </v-btn>
      </v-list-item>
    </v-list>
    <template v-slot:append>
      <v-list>
        <v-list-item rounded class="text-subtitle" prepend-icon="empty">
          <v-btn
            nuxt
            class="text-subtitle"
            color="transparent"
            to="/privacy-policy"
            rounded
            width="100%"
            flat
          >
            Privacy Policy
          </v-btn>
        </v-list-item>
        <v-list-item rounded prepend-icon="fa-solid fa-right-from-bracket">
          <v-btn rounded width="100%" flat @click="signOut"> Logout </v-btn>
        </v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<style scoped>
  .v-app-bar .v-row .v-btn {
    font-size: 16px;
  }
</style>

<script>
import { useMainStore } from '~/stores/mainStore';

export default {
  setup() {
    const store = useMainStore();
    const signOut = async () => {
      const result = await signOutUser();
    };

    return { store, signOut };
  },
  name: 'headerAuthComponent',
  data() {
    return {
      links: [
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
        {
          to: '/',
          title: 'Plans',
          icon: 'fa-solid fa-rectangle-vertical-history',
        }
      ],
      mobile_sub_menu: false,
    };
  },
  props: {
    mobile: {
      required: true,
      type: Boolean,
    },
  },
  computed: {},
  methods: {},
  mounted() {},
  updated() {},
  components: {},
  emits: [],
};
</script>
