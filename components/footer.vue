<template>
  <v-container fluid color="primary" class="pa-0">
    <v-footer>
      <v-row class="ma-0" justify="end" align="center">
        <v-col cols="auto">
          <v-list>
            <v-list-item>
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
          </v-list>
        </v-col>
        <v-col cols="auto">
          <v-select
            :items="currencies"
            v-model="currency"
            @update:modelValue="changeHandler"
            variant="outlined"
            menuIcon="mdi: mdi-menu-up"
          >
          </v-select>
        </v-col>

      </v-row>
    </v-footer>
  </v-container>
</template>

<style scoped>
  .v-container {
    position: absolute;
    bottom: -94px;
    height: 94px;
  }

  .v-select {
    width: 100px;
  }

  .v-footer,
  .v-row,
  .v-col {
    height: 94px;
  }

</style>

<script>
import { useMainStore } from '~/stores/mainStore';

export default {
  setup() {
    const store = useMainStore();
    return {
      store,
    };
  },
  name: 'footerComponent',
  data() {
    return {
      currencies: [],
      currency: '',
    };
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
  watch: {
    store_currencies() {
      this.currencies = this.store_currencies;
    },
    store_currency() {
      this.currency = this.store_currency;
    },
  },
  methods: {
    changeHandler() {
      this.store.setCurrency(this.currency)
    },
  },
  mounted() {},
  updated() {},
  components: {},
  emits: [],
};
</script>
