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
    class="navigation-drawer-desktop"
  >
    <v-list>
      <v-list-item
        v-if="!mobile"
        class="my-2 pl-0"
        title="Project title"
        prepend-icon="fa-solid fa-bars"
      ></v-list-item>
      <v-list-item 
      v-for="(link, index) in links"
      :key="index"
      class="my-2 pl-0" 
      rounded 
      :prepend-icon="link.icon">
        <v-btn nuxt :to="link.to" rounded flat width="100%">
          {{ link.title }}
        </v-btn>
      </v-list-item>
    </v-list>
    <template v-slot:append>
      <v-list>
        <v-list-item rounded class="pl-0" prepend-icon="fa-solid fa-right-from-bracket">
          <v-btn rounded width="100%" flat @click="signOut"> Logout </v-btn>
        </v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>

  <!-- Mobile Auth Toolbar -->
  <v-app-bar v-if="mobile" :flat="flat" color="primary" class="justify-end">
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon @click="mobile_sub_menu = !mobile_sub_menu" icon="fa-solid fa-bars"></v-app-bar-nav-icon>
  </v-app-bar>

  <!-- Mobile Auth Drawer -->
  <v-navigation-drawer
    v-if="mobile"
    color="primary"
    temporary
    app
    v-model="mobile_sub_menu"
  >
    <v-list>
      <v-list-item v-for="(link, index) in links" :key="index" rounded  class="my-2">
        <v-btn nuxt :to="link.to" rounded flat width="100%">
          {{ link.title }}
        </v-btn>
      </v-list-item>
    </v-list>
    <template v-slot:append>
      <v-list>
        <v-list-item rounded>
          <v-btn rounded width="100%" flat @click="signOut"> Logout </v-btn>
        </v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { useMainStore } from '~/stores/mainStore';

export default {
  setup() {
    const store = useMainStore();
    const signOut = async () => {
      const result = await firebase_signOutUser();
    };

    return { store, signOut };
  },
  name: 'headerAuthComponent',
  data() {
    return {
      links: [
      {
          to: '/',
          title: '',
          icon: 'fa-solid fa-house',
        },
        {
          to: '/',
          title: '',
          icon: 'fa-solid fa-house',
        },
        {
          to: '/',
          title: '',
          icon: 'fa-solid fa-house',
        },
        {
          to: '/',
          title: '',
          icon: 'fa-solid fa-house',
        },
        {
          to: '/',
          title: '',
          icon: 'fa-solid fa-house',
        },
        {
          to: '/profile',
          title: 'Profile',
          icon: 'fa-solid fa-user',
        },
      ],
      mobile_links: [
        {
          to: '/',
          title: '',
          icon: 'fa-solid fa-house',
        },
        {
          to: '/',
          title: '',
          icon: 'fa-solid fa-house',
        },
        {
          to: '/',
          title: '',
          icon: 'fa-solid fa-house',
        },
        {
          to: '/',
          title: '',
          icon: 'fa-solid fa-house',
        },
        {
          to: '/profile',
          title: 'Profile',
          icon: 'fa-solid fa-user',
        },
      ],
      mobile_sub_menu: false,
      currencies: [],
      currency: '',
    };
  },
  props: {
    flat: {
      required: true,
      type: Boolean,
    }
  },
  computed: {
    store_currencies() {
      return this.store.getCurrencies;
    },
    store_currency() {
      return this.store.getCurrency;
    },
    mobile() {
      return this.store.getMobile;
    }
  },
  methods: {
    changeHandler() {
      this.store.setCurrency(this.currency)
    },
  },
  mounted() {
    this.currency = this.store_currency;
    this.currencies = this.store_currencies;
  },
  updated() {},
  components: {},
  emits: [],
};
</script>
