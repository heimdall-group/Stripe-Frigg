<template>
  <v-container fluid class="component-main-container">
    <v-row align="center">
      <v-col>
        <v-form>
          <v-text-field density="default" label="Email" color="secondary" variant="outlined"></v-text-field>
          <v-text-field density="default" label="Display Name" color="secondary" variant="outlined"></v-text-field>
          <v-text-field density="default" label="Password" color="secondary" variant="outlined"></v-text-field>
          <v-text-field density="default" label="Repeat Password" color="secondary" variant="outlined"></v-text-field>
        </v-form>
      </v-col>
    </v-row>

  </v-container>
</template>

<style scoped>
  .v-row {
    height: 100%;
  }
</style>

<script>
export default {
  setup() {},
  name: 'registerPage',
  data() {
    return {};
  },
  computed: {},
  methods: {},
  mounted() {},
  updated() {},
  components: {},
};
</script>
