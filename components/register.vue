<template>
  <v-container
    fluid
    :class="['component-main-container', 'py-0', mobile ? 'px-1' : '']"
  >
    <v-row justify="center" no-gutters align="center">
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
        <v-col class="d-flex align-center">
          <v-form
            validate-on="submit"
            @submit="submitCallback"
            @input="inputCallback"
          >
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
              :error-messages="mailError ? 'Email already in use' : ''"
              @change="mailChangeCallback"
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
        <v-col class="v-col-plans">
          <v-col cols="12">
            <v-row>
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
          </v-col>
          <v-col cols="12">
            <v-btn class="mt-6" flat @click="plansCallback">Continue</v-btn>
          </v-col>
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

.register-v-col > .v-col {
  transition-property: all;
  transition-duration: 0.5s;
  height: 100vh !important;
  margin: 12px 0 0 0;
  transform: translateY(0px);
  opacity: 0;
  overflow: hidden;
}

.register-v-col.current-step-2 > .v-col {
  transform: translateY(-100vh);
}

.register-v-col.current-step-3 > .v-col {
  transform: translateY(-200vh);
}

.register-v-col.current-step-4 > .v-col {
  transform: translateY(-300vh);
}

.register-v-col.current-step-1 > .v-col:nth-child(1) {
  opacity: 1;
}

.register-v-col.current-step-2 > .v-col:nth-child(2) {
  opacity: 1;
}

.register-v-col.current-step-3 > .v-col:nth-child(3) {
  opacity: 1;
}

.register-v-col.current-step-4 > .v-col:nth-child(4) {
  opacity: 1;
}

.register-v-col .v-col-plans {
  
}

.selected {
  border: thin solid currentColor;
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
      email: 'testo13@gmail.com',
      name: 'test',
      pwd: '123456',
      pwdRepeat: '123456',
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
      plan: '',
      mailError: false,
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
        return value.length >= 6
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
    async submitCallback(event) {
      event.preventDefault();
      const validations = [
        this.emailRule(this.email),
        this.validateRequired(this.email, this.name, this.pwd, this.pwdRepeat),
        this.lengthRule(this.pwd),
        this.lengthRule(this.pwdRepeat),
        this.pwdMatchRule(this.pwdRepeat),
        await this.mailChangeCallback(this.email),
      ];
      for (let i = 0; i < validations.length; i++) {
        const validation = validations[i];
        if (validation !== true) {
          return;
        }
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
    async mailChangeCallback() {
      const res = await $fetch('/api/register/validEmail', {
        method: 'POST',
        body: JSON.stringify({ mail: this.email }),
      });
      if (res) {
        this.mailError = false;
        return true;
      } else {
        this.mailError = true;
        return false;
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
      }
    },
    plansCallback() {
      const arr = Object.keys(this.plans);
      const index = parseInt(
        arr.find((key) => {
          console.log(this.plans[key]);
          return this.plans[key].selected === true;
        })
      );
      this.plan = this.plans[index];
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
        console.log(this.plan);
        const res = await createUser(
          this.name,
          this.email,
          this.pwd,
          this.plan.title
        );

        if (res) {
          this.stepCallback(this.currentStep + 1, 'continue');
          for (let i = 0; i < this.steps.length; i++) {
            this.steps[i].disabled = true;
          }
          this.signUpCallback();
        }
      }
    },
    signUpCallback() {
      // Animations?
      setTimeout(() => {
        this.$router.push('/');
      }, 1000);
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
