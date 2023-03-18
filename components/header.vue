<template>
  <v-container fluid color="primary" class="">
    <v-navigation-drawer v-model="drawer" app temporary color="primary">
      <v-list v-if="mobile" density="comfortable">
        <v-list-item
          ><v-btn nuxt to="/login" class="bg-contast" rounded border flat
            >Login</v-btn
          ></v-list-item
        >
        <v-list-item
          ><v-btn nuxt to="/register" class="bg-contast" rounded border flat
            >Register</v-btn
          ></v-list-item
        >
        <v-list-item
          ><v-btn nuxt to="/plans" class="bg-contast" rounded border flat
            >Plans</v-btn
          ></v-list-item
        >
      </v-list>
      <v-list>
        <v-list-item v-for="(link, index) in navigationLinks" :key="index">
          <v-btn
            nuxt
            :to="link.to"
            rounded
            border
            flat
            :prepend-icon="link.icon"
          >
            {{ link.title }}
          </v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn @click="toggleTheme" rounded flat outlined>
            <v-icon v-if="theme()">mdi-weather-sunny</v-icon>
            <v-icon v-else>mdi-weather-night</v-icon>
          </v-btn>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app rounded class="px-15">
      <v-toolbar-title></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-row align="center" justify="end">
        <v-btn
          v-if="!mobile"
          nuxt
          to="/login"
          flat
          class="bg-contrast mx-1"
        >
          Login
        </v-btn>
        <v-btn
          v-if="!mobile"
          nuxt
          to="/register"
          flat
          class="bg-contrast mx-1"
          >Register</v-btn
        >
        <v-btn
          v-if="!mobile"
          nuxt
          to="/plans"
          flat
          class="bg-contrast mx-1"
          >Plans</v-btn
        >
        <v-app-bar-nav-icon @click="drawer = !drawer" class="mr-4" />
      </v-row>
    </v-app-bar>
  </v-container>
</template>

<style scoped>
.v-navigation-drawer .v-btn {
  width: 100%;
}
</style>

<script>
import { useTheme } from "vuetify";
import { useMainStore } from "~~/stores/mainStore";
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
          ? "light"
          : "dark"),
    };
  },
  name: "headerComponent",
  data() {
    return {
      drawer: false,
      mobile: true,
      navigationLinks: [
        {
          to: "/about-us",
          title: "About us",
          icon: "",
        },
        {
          to: "/contact-us",
          title: "Contact us",
          icon: "",
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
      console.log(this.mobile);
    },
  },
  mounted() {
    this.onResize();
    window.addEventListener("resize", this.onResize, { passive: true });
  },
  updated() {},
  components: {},
  emits: [],
};
</script>
