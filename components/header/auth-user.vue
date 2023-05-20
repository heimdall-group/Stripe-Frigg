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
        title="Dashboard Drawer"
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
        <v-list-item rounded class="text-subtitle pl-0" prepend-icon="empty">
          <v-btn
            nuxt
            color="transparent"
            to="/privacy-policy"
            rounded
            width="100%"
            flat
          >
            Privacy Policy
          </v-btn>
        </v-list-item>
        <v-list-item rounded class="pl-0" prepend-icon="fa-solid fa-right-from-bracket">
          <v-btn rounded width="100%" flat @click="signOut"> Logout </v-btn>
        </v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>

  <!-- Mobile Auth Toolbar -->
  <v-app-bar v-if="mobile" color="primary" location="bottom">
    <v-row justify="space-around" class="px-4">
      <v-btn
        v-for="(link, index) in mobile_links"
        :key="index"
        nuxt
        :to="link.to"
        rounded
        flat
        size="small"
      >
        <font-awesome-icon :icon="link.icon" />
      </v-btn>
      <v-btn
        @click="mobile_sub_menu = !mobile_sub_menu"
        rounded
        flat
        size="small"
      >
        <font-awesome-icon icon="fa-solid fa-bars" />
      </v-btn>
    </v-row>
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
      <v-list-item
        title="Dashboard Drawer"
        class="my-2"
        prepend-icon="fa-solid fa-bars"
      ></v-list-item>
      <v-list-item v-for="(link, index) in links" :key="index" rounded  class="my-2">
        <v-btn nuxt :to="link.to" rounded flat width="100%">
          {{ link.title }}
        </v-btn>
      </v-list-item>
    </v-list>
    <template v-slot:append>
      <v-list>
        <v-list-item>
          <v-select
            :items="currencies"
            v-model="currency"
            @update:modelValue="changeHandler"
            variant="filled"
            menuIcon="mdi: mdi-menu-up"
          >
          </v-select>
        </v-list-item>
        <v-list-item rounded class="text-subtitle">
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
          to: '/stocks',
          title: 'Stocks',
          icon: 'fa-solid fa-arrow-trend-up',
        },
        {
          to: '/real-estate',
          title: 'Real estate',
          icon: 'fa-solid fa-house-chimney',
        },
        {
          to: '/e-commerce',
          title: 'E-commerce',
          icon: 'fa-solid fa-basket-shopping',
        },
        {
          to: '/plans',
          title: 'Plans',
          icon: 'fa-solid fa-layer-group',
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
          title: 'Overview',
          icon: 'fa-solid fa-table',
        },
        {
          to: '/stocks',
          title: 'Stocks',
          icon: 'fa-solid fa-arrow-trend-up',
        },
        {
          to: '/real-estate',
          title: 'Real estate',
          icon: 'fa-solid fa-house-chimney',
        },
        {
          to: '/e-commerce',
          title: 'E-commerce',
          icon: 'fa-solid fa-basket-shopping',
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
    mobile: {
      required: true,
      type: Boolean,
    },
  },
  computed: {
    store_currencies() {
      return this.store.getCurrencies;
    },
    store_currency() {
      return this.store.getCurrency;
    }
  },
  methods: {
    changeHandler() {
      console.log('this.changeHandler')
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
