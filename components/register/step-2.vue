<template>
  <v-container fluid class="component-main-container py-0">
    <v-row class="mx-12" justify="space-around">
      <v-card
        v-for="(plan, index) in plans"
        :key="index"
        :width="mobile ? '100%' : '300px'"
        height="480px"
        @click="() => cardCallback(plan.id)"
        :ripple="false"
        :class="['my-4', plan.selected ? 'selected' : '']"
        :elevation="mobile ? '0' : plan.select ? '24' : '0'"
        variant="elevated"
        rounded="xl"
      >
        <v-card-title>{{ plan.title }}</v-card-title>
        <v-card-title>{{ plan.price }}</v-card-title>
        <v-list bg-color="transparent">
          <v-list-item
            density="compact"
            prepend-icon="mdi-check"
            v-for="(perk, index2) in plan.perks"
            :key="index2"
          >
            {{ perk }}
          </v-list-item>
        </v-list>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import { useMainStore } from '~~/stores/mainStore';
export default {
  setup() {
    const store = useMainStore();
    return {
      store,
    };
  },
  name: 'registerStep2Component',
  data() {
    return {
      mobile: false,
    };
  },
  computed: {
    plans() {
      return this.store.getPlans;
    },
    user() {
      return this.store.getUser;
    },
  },
  methods: {},
  mounted() {},
  updated() {},
  components: {},
  emits: [],
};
</script>
