<template>
  <v-container fluid :class="['component-main-container', 'py-0', mobile ? 'px-1' : '']">
    <v-row class="fill-height" justify="center" no-gutters align="center">
      <v-col cols="auto" v-if="!mobile">
        <v-list density="comfortable" bg-color="transparent">
          <v-list-item
            v-for="(step, index) in steps"
            :key="index"
            class="py-2 px-0 d-flex justify-center"
          >
            <v-btn
              height="36px"
              size="x-small"
              :disabled="step.disabled"
              :class="step.active ? 'active' : ''"
              flat
              rounded
              outlined
              @click="
                () => {
                  this.stepCallback(step.step);
                }
              "
              >{{ step.step }}</v-btn
            >
          </v-list-item>
        </v-list>
      </v-col>
      <v-col cols="11" :class="[vcolClass, 'register-v-col']">
        <v-col class="fill-height d-flex align-center">
          <v-form
            validate-on="submit"
            @submit="submitCallback"
            @input="inputCallback"
          >
            <h1>Step 1:</h1>
            <v-text-field
              v-model="name"
              density="compact"
              label="Name"
              color="secondary"
              variant="outlined"
              type="text"
              :rules="[requiredRule]"
            ></v-text-field>
            <v-text-field
              v-model="email"
              density="compact"
              label="Email"
              color="secondary"
              variant="outlined"
              type="text"
              :rules="[requiredRule, emailRule]"
            ></v-text-field>
            <v-text-field
              v-model="pwd"
              density="compact"
              label="Password"
              color="secondary"
              variant="outlined"
              type="password"
              :rules="[requiredRule, lengthRule]"
            ></v-text-field>
            <v-text-field
              v-model="pwdRepeat"
              density="compact"
              label="Repeat Password"
              color="secondary"
              variant="outlined"
              type="password"
              :rules="[requiredRule, pwdMatchRule, lengthRule]"
            ></v-text-field>
            <v-btn type="submit" flat>Continue</v-btn>
          </v-form>
        </v-col>
        <v-col class="fill-height d-flex flex-column justify-center">
          <v-row
            :justify="mobile ? 'center' : 'space-around'"
            :class="mobile ? ['flex-column', 'plans-row', 'plans-row-mobile'] : ['plans-row']"
          >
            <v-card
              v-for="(plan, index) in plans"
              :key="index"
              :width="mobile ? '100%' : '300px'"
              height="480px"
              @click="() => cardCallback(plan.id)"
              :class="['my-4', plan.selected ? 'selected' : '']"
            >
              <v-card-title>{{ plan.title }}</v-card-title>
              <v-card-title>{{ plan.price }}</v-card-title>
              <v-list>
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
          <v-row justify="center" align="center" class="mb-3 mt-1"
            ><v-btn flat @click="plansCallback">Continue</v-btn></v-row
          >
        </v-col>
        <v-col>
          Stripe
          <v-btn flat @click="stripeCallback">Continue</v-btn>
        </v-col>
        <v-col>
          Sign up successfull You will be redirected to the dashboard
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.register-v-col {
  height: 100vh;
  max-height: 100vh;
  overflow: hidden;
}

.register-v-col > * {
  transition-property: all;
  transition-duration: 0.5s;
  height: 100vh !important;
  margin: 12px 0 0 0;
  transform: translateY(0px);
  opacity: 0;
}

.register-v-col.current-step-2 > * {
  transform: translateY(-100vh);
}

.register-v-col.current-step-3 > * {
  transform: translateY(-200vh);
}

.register-v-col.current-step-4 > * {
  transform: translateY(-300vh);
}

.register-v-col.current-step-1 > *:nth-child(1) {
  opacity: 1;
}

.register-v-col.current-step-2 > *:nth-child(2) {
  opacity: 1;
}

.register-v-col.current-step-3 > *:nth-child(3) {
  opacity: 1;
}

.register-v-col.current-step-4 > *:nth-child(4) {
  opacity: 1;
}

.register-v-col .plans-row {
  max-height: 600px;
  overflow: scroll;
}

.register-v-col .plans-row-mobile {
  flex-direction: column !important;
  flex-wrap: nowrap !important;;
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
  name: 'registerComponent',
  data() {
    return {
      mobile: true,
      email: 'test@gmail.com',
      name: 'test',
      pwd: '1234567',
      pwdRepeat: '1234567',
      steps: [
        {
          step: 1,
          disabled: false,
        },
        {
          step: 2,
          disabled: true,
        },
        {
          step: 3,
          disabled: true,
        },
        {
          step: 4,
          disabled: true,
        },
      ],
      currentStep: 1,
      vcolClass: 'current-step-1',
      requiredRule: (value) => !!value || 'Required.',
      emailRulePattern:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      emailRule: (value) => {
        return this.emailRulePattern.test(value) || 'Invalid e-mail.';
      },
      pwdMatchRule: (value) => {
        return this.pwd === value ? true : 'Password doesnt match';
      },
      lengthRule: (value) => {
        return value.length > 6
          ? true
          : 'Password length needs to be atleast 6 characters';
      },
    };
  },
  computed: {
    plans() {
      return this.store.getPlans;
    },
  },
  methods: {
    stepCallback(step, type) {
      if (type === 'continue') {
        const arr = Object.keys(this.steps);
        if (arr.length < step) {
          return;
        }
        const index = arr.find((key) => this.steps[key].step === step);
        this.steps[index].disabled = false;
      }
      this.currentStep = step;
      this.vcolClass = `current-step-${this.currentStep}`;
    },
    submitCallback(event) {
      event.preventDefault();
      const validations = [
        this.emailRule(this.email),
        this.validateRequired(this.email, this.name, this.pwd, this.pwdRepeat),
        this.lengthRule(this.pwd),
        this.lengthRule(this.pwdRepeat),
        this.pwdMatchRule(this.pwdRepeat),
      ];
      if (validations.find((item) => item !== true)) {
        return;
      }
      this.stepCallback(this.currentStep + 1, 'continue');
    },
    validateRequired(arr) {
      for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        if (this.requiredRule(item)) {
          return true;
        } else {
          return false;
        }
      }
    },
    inputCallback() {
      const arr = Object.keys(this.steps);
      const index = parseInt(
        arr.find((key) => this.steps[key].step === this.currentStep)
      );
      for (let i = 0; i < this.steps.length; i++) {
        if (i === index) {
          continue;
        }
        this.steps[i].disabled = true;
      }
    },
    cardCallback(id) {
      const arr = Object.keys(this.plans);
      const index = parseInt(arr.find((key) => this.plans[key].id === id));
      for (let i = 0; i < this.plans.length; i++) {
        if (i === index) {
          this.plans[i].selected = true;
          continue;
        }
        this.plans[i].selected = false;
        console.log(this.plans[i]);
      }
    },
    plansCallback() {
      const arr = Object.keys(this.plans);
      const index = parseInt(
        arr.find((key) => this.plans[key].id === this.plan)
      );
      console.log(this.plans)
      console.log(index)
      if (this.plans[index].stripe) {
        this.stepCallback(this.currentStep + 1, 'continue');
      } else {
        const arr = Object.keys(this.steps);
        const index = parseInt(
          arr.find((key) => this.steps[key].step === this.currentStep + 1)
        );
        this.steps[index].disabled = true;
        this.stepCallback(this.currentStep + 1, 'continue');
        this.stepCallback(this.currentStep + 1, 'continue');
        this.signUpUser();
      }
    },
    // When all stripe stuff is confirmed call this.
    async stripeCallback() {
      // Signup user to firebase
      this.signUpUser();
    },
    async signUpUser() {
      if (this.pwd === this.pwdRepeat) {
        const res = await createUser(this.name, this.email, this.pwd);
        if (res) {
          this.stepCallback(this.currentStep + 1, 'continue');
          for (let i = 0; i < this.steps.length; i++) {
            this.steps[i].disabled = true;
          }
          setTimeout(() => {
            this.signUpCallback();
          }, 3000);
        }
      }
    },
    // When firebase responds that
    signUpCallback() {
      this.$router.push('/');
    },
    onResize() {
      this.mobile = window.innerWidth < 1200;
    },
  },
  mounted() {
    this.onResize();
    window.addEventListener('resize', this.onResize, { passive: true });
  },
  updated() {},
  components: {},
};
</script>
