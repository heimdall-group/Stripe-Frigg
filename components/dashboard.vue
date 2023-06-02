<template>
  <v-container>
    dashboard
  </v-container>
</template>

<script>
import {Client} from '@apperate/iexjs'
import { useMainStore } from '~~/stores/mainStore';

export default {
  setup() {
    useHead({
      title: '',
    });
    const client = new Client({api_token: "pk_f2581bbf2330477585d4575e3146aea5", version: "v1"});
    const store = useMainStore();

    return {client, store}
  },
  name: 'dashboardPage',
  data() {
    return {};
  },
  computed: {
    user() {
      return this.store.getUser;
    },
    profile() {
      return this.store.get/profile
    }
  },
  methods: {
    async signOut() {
      await navigateTo('/')
      firebase_signOutUser()
    },
  },
  mounted() {},
  updated() {},
  components: {},
};
</script>
