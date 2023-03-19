<template>
    <dashboard v-if="user"></dashboard>
    <landing-page v-else></landing-page>
  </template>
  
  <script>
import { useMainStore } from '~~/stores/mainStore';
export default {
  setup() {
    const store = useMainStore();
    const signOut = async () => {
      const result = await signOutUser();
    };
    return {
      store,
      signOut,
    };
  },
    name: 'indexPage',
    data() {
      return {};
    },
    computed: {
    user() {
      return this.store.getUser;
    },
  },
    methods: {},
    mounted() {},
    updated() {},
    components: {},
  };
  </script>
  