<template>
  <v-container fluid class="component-main-container">
    <v-row justify="center" no-gutters align="center">
      <v-col cols="1">
        <v-list density="comfortable" bg-color="transparent">
          <v-list-item v-for="(step, index) in steps" :key="index" class="pa-2">
            <v-btn height="36px" size="x-small" flat rounded outlined>{{ step.step }}</v-btn>
          </v-list-item>
        </v-list>
      </v-col>
      <v-col cols="11">
        <v-form>
          <v-text-field
            v-model="email"
            density="default"
            label="Email"
            color="secondary"
            variant="outlined"
          ></v-text-field>
          <v-text-field
            v-model="name"
            density="default"
            label="Display Name"
            color="secondary"
            variant="outlined"
          ></v-text-field>
          <v-text-field
            v-model="pwd"
            density="default"
            label="Password"
            color="secondary"
            variant="outlined"
          ></v-text-field>
          <v-text-field
            v-model="pwdRepeat"
            density="default"
            label="Repeat Password"
            color="secondary"
            variant="outlined"
          ></v-text-field>
          <v-btn>Continue</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.v-row {
  height: 100%;
  width: 100vw;
}
</style>

<script>
export default {
  setup() {},
  name: "registerComponent",
  data() {
    return {
      email: "",
      name: "",
      pwd: "",
      pwdRepeat: "",
      steps: [
        {
          step: 1,
          disabled: false,
        },
        {
          step: 2,
          disabled: true,
        },
      ],
      currentStep: 1,
    };
  },
  computed: {},
  methods: {},
  mounted() {},
  updated() {},
  components: {},
};
</script>
