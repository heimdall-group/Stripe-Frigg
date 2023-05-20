<template>
  <v-container fluid class="component-main-container">
    <v-row justify="center" align="center">
      <v-col cols="12" :class="['subscription-type-switch']">
        <v-switch
          v-model="annual"
          label="Annual / Monthly"
          width="fit-content"
        ></v-switch>
      </v-col>
      <v-col cols="12" class="plans-col">
        <v-row
          :class="['plans-row', mobile ? '' : 'mx-10']"
          :align="mobile ? null : 'start'"
          dir="ltr"
        >
          <v-col
            v-for="(plan, index) in plans"
            :key="index"
            :cols="mobile ? 12 : false"
            :class="[
              mobile ? '' : 'ma-4',
              'd-flex',
              'justify-center',
              'align-center',
            ]"
            v-intersect="{
              handler: (entries) => {
                intersectionHandler(entries, index);
              },
              options: {
                threshold: 0.8,
              },
            }"
          >
            <v-card
              :width="mobile ? '90%' : '300px'"
              :height="mobile ? '90%' : '480px'"
              variant="elevated"
              elevation="10"
              rounded="xl"
            >
              <v-card-title class="text-center text-h4 mt-4">{{
                plan.name
              }}</v-card-title>
              <v-card-title v-if="!annual" class="text-center text-h5">
                {{ plan.prices[currency].annual.amount }}
                <span>/ year</span>
              </v-card-title>
              <v-card-title v-else class="text-center text-h5">
                {{ plan.prices[currency].monthly.amount }}
                <span>/ month</span>
              </v-card-title>
              <v-card-subtitle
                :class="[
                  annual ? 'opacity-0' : '',
                  'opacity-transition-fade',
                  'text-center',
                ]"
              >
                {{ plan.prices[currency].annual.monthly }}
                <span>/ month</span>
              </v-card-subtitle>
              <v-list bg-color="transparent" class="mx-6">
                <v-list-item
                  v-for="(perk, index) in plan.perks"
                  :key="index"
                  density="compact"
                >
                  <v-row align="center">
                    <font-awesome-icon :icon="perk.icon" class="v-list-item-icon ml-10 mr-5" />
                    {{ perk.content }}
                  </v-row>
                </v-list-item>
              </v-list>
              <v-card-actions class="d-flex justify-center">
                <v-btn
                  width="50%"
                  color="success"
                  rounded
                  variant="outlined"
                  @click="
                    () => {
                      planButtonHandler(plan);
                    }
                  "
                >
                  Continue
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col v-if="mobile" class="dots-col" cols="12">
        <v-row :class="dotsRowClass" justify="center" align="start">
          <div
            v-for="(plan, index) in plans"
            :key="index"
            class="dots mx-1 my-3"
          ></div>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.v-row {
  height: 100%;
  max-width: 100%;
  margin: 0;
}

.v-col {
  padding: 0;
}

.subscription-type-switch {
  height: 10%;
}

.subscription-type-switch .v-switch {
  width: fit-content;
  margin: auto auto 0px auto;
}

.plans-col {
  height:90%;
  display: flex;
  justify-content: center;
}

.plans-col .plans-row {
  max-width: 1000px;
}

.plans-col .plans-row .v-card .v-list .v-list-item-icon {
  width: 24px;
  height: 24px;
}

.plans-col .plans-row .v-card .v-list .fa-square-check {
  color: green;
}

.plans-col .plans-row .v-card .v-list .fa-square-xmark {
  color: red;
}

.plans-col .plans-row .v-card-actions {
  position: absolute;
  width: 100%;
  bottom: 8px;
}

.dots-col {
  height: 5%;
}

.dots-col .dots {
  background-color: gray;
  width: 16px;
  height: 16px;
  border-radius: 8px;
  transition-property: background-color;
  transition-duration: 175ms;
}

.dots-col .dots-active-0 .dots:nth-child(1) {
  background-color: white;
}

.dots-col .dots-active-1 .dots:nth-child(1),
.dots-col .dots-active-1 .dots:nth-child(2) {
  background-color: white;
}

.dots-col .dots-active-2 .dots:nth-child(1),
.dots-col .dots-active-2 .dots:nth-child(2),
.dots-col .dots-active-2 .dots:nth-child(3) {
  background-color: white;
}

@media (min-width: 850px) {
  .plans-col .plans-row .v-col {
    width: 300px;
  }
}

@media (max-width: 850px) {
  .subscription-type-switch {
    height: 10%;
  }

  .plans-col .plans-row {
    scroll-snap-type: x mandatory;
    flex-wrap: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    max-width: 100%;
  }

  .plans-col {
    height: 85%;
  }
  
  .plans-col .plans-row .v-col {
    scroll-snap-align: center;
  }
}
</style>

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
      mobile: true,
      dotsRowClass: '',
      annual: true,
    };
  },
  computed: {
    plans() {
      return this.store.getPlans;
    },
    currency() {
      return this.store.getCurrency;
    },
    user() {
      return this.store.getUser;
    },
  },
  methods: {
    onResize() {
      this.mobile = window.innerWidth < 850;
    },
    intersectionHandler(entries, index) {
      if (entries) {
        this.dotsRowClass = `dots-active-${index}`;
      }
    },
    async planButtonHandler(plan) {
      const res = await $fetch('/api/user/getCheckout', {
        method: 'POST',
        body: {
          token: await this.user.getIdToken(),
          priceID:
            plan.prices[this.currency][this.annual ? 'monthly' : 'annual'].id,
        },
      });
      if(res.success) {
        window.location = res.data
      }
    },
  },
  mounted() {
    this.onResize();
    window.addEventListener('resize', this.onResize, { passive: true });
  },
  updated() {},
  components: {},
  emits: [],
};
</script>
