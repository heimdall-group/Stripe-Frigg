<template>
  <v-container v-if="!mobile" fluid color="primary" class="pa-0">
    <v-footer>
      <v-row class="ma-0" justify="end" align="center">
        <v-col cols="auto">
          <v-select
            :items="currencies"
            v-model="currency"
            @update:modelValue="changeHandler"
            variant="filled"
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
    bottom: -60px;
    height: 60px;
  }

  .v-select {
    width: 100px;
  }

  .v-footer,
  .v-row,
  .v-col {
    height: 60px;
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
      mobile: true,
    };
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
      this.store.setCurrency(this.currency)
    },
    onResize() {
      this.mobile = window.innerWidth < 850;
    },
  },
  mounted() {
    this.currency = this.store_currency;
    this.currencies = this.store_currencies;
    this.onResize();
    window.addEventListener('resize', this.onResize, { passive: true });
  },
  updated() {},
  components: {},
  emits: [],
};
</script>
