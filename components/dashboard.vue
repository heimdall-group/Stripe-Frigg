<template>
  <v-app>
    <v-container>
      <div>dashboard</div>
      {{ profile }}
      <v-row>
        <v-col>
          <h1>Portfolio value: {{ this.stocks.Apple.value * 5 }}</h1>
        </v-col>
      </v-row>
      <v-row no-gutters v-for="stock, index in stocks">
          {{index}}: {{ stock.stocks }}
      </v-row>
      <v-row>
        <v-col>
          <v-btn @click="getStockData()">Stock data</v-btn>
          <v-btn @click="signOut()">Sign Out</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import {Client} from '@apperate/iexjs'
import {useMainStore} from "@/stores/MainStore"

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
    return {
      stocks: {
        Apple: {
          value: 0,
          stocks: 5
        },
        Tesla: {
          value: 0,
          stocks: 10
        },
      }

    };
  },
  computed: {
    user() {
      return this.store.getUser;
    },
    profile() {
      return this.store.getProfile
    }
  },
  methods: {
    async signOut() {
      await navigateTo('/')
      signOutUser()
    },
    getStockData() {
        this.client.quote({symbol: "AAPL"}).then((res) => {
          this.stocks.Apple.value = res.latestPrice
        });
    }
  },
  mounted() {
    let payload = {
      authToken: this.user.uid,
      user: this.user.displayName,
      call: 'GetProfile',
    }
    this.store.getUserData(payload)

  },
  updated() {},
  components: {},
};
</script>
