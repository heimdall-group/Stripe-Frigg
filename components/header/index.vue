<template>
  <v-container v-scroll="onScroll" fluid color="primary" class="pa-0 header">
    <header-auth-user :flat="flat" v-if="user"></header-auth-user>
    <header-no-auth-user :flat="flat" v-else></header-no-auth-user>
  </v-container>
</template>

<style>
  .v-app-bar .v-row .v-btn {
    font-size: 16px;
  }

  .v-navigation-drawer {
    border-radius: 8px;
  }

  .navigation-drawer-desktop .v-list .v-list-item .v-list-item__prepend {
    width: 56px;
  }

  .navigation-drawer-desktop .v-list .v-list-item .v-list-item__prepend .v-icon {
    width: 56px !important;
    text-align: center;
    margin: 0px !important;
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
      const result = await firebase_signOutUser();
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
      flat: false,
    };
  },
  computed: {
    user() {
      return this.store.getUser;
    },
    mobile() {
      return this.store.getMobile;
    }
  },
  methods: {
    onScroll(e) {
      const top = window.pageYOffset || e.target.scrollTop || 0;
      if (top > 60) {
        this.flat = true;
      } else {
        this.flat = false;
      }
    },
  },
  mounted() {},
  updated() {
  },
  components: {},
  emits: [],
};
</script>
