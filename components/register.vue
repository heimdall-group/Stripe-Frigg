<template>
  <v-container fluid class="component-main-container">
    <v-row class="fill-height" justify="center" no-gutters align="center">
      <v-col cols="1">
        <v-list density="comfortable" bg-color="transparent">
          <v-list-item
            v-for="(step, index) in steps"
            :key="index"
            class="pa-2 d-flex justify-center"
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
        <v-col>
          <v-radio-group v-model="plan">
            <v-row justify="space-around">
              <v-card
                v-for="(plan, index) in plans"
                :key="index"
                width="300px"
                height="520px"
              >
                <v-card-title>{{ plan.title }}</v-card-title>
                <v-card-title>{{ plan.price }}</v-card-title>
                <!-- <v-card-text> -->
                <v-list>
                  <v-list-item
                    size="small"
                    v-for="(perk, index2) in plan.perks"
                    :key="index2"
                  >
                    {{ perk }}
                  </v-list-item>
                </v-list>
                <!-- </v-card-text> -->
                <v-card-actions>
                  <v-radio :value="index + 1"></v-radio>
                </v-card-actions>
              </v-card>
            </v-row>
          </v-radio-group>
          <v-row justify="center" align="center" class="ma-1"
            ><v-btn flat @click="plansCallback">Continue</v-btn></v-row
          >
        </v-col>
        <v-col>
          Stripe
          <v-btn flat @click="stripeCallback">Continue</v-btn>
        </v-col>
        <v-col>
          Sign up successfull
          <v-btn flat @click="signUpCallback">Continue</v-btn>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.register-v-col {
  height: 610px;
  overflow: hidden;
}

.register-v-col > * {
  transition-property: all;
  transition-duration: 0.5s;
  height: 600px;
  margin: 12px 0 0 0;
  transform: translateY(0px);
  opacity: 0;
}

.register-v-col.current-step-2 > * {
  transform: translateY(-600px);
}

.register-v-col.current-step-3 > * {
  transform: translateY(-1200px);
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
      email: 'test@gmail.com',
      name: 'test',
      pwd: '1234567',
      pwdRepeat: '1234567',
      plan: 1,
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
    plansCallback() {},
    // When all stripe stuff is confirmed call this.
    async stripeCallback() {
      // Signup user to firebase
      if (this.pwd === this.pwdRepeat) {
        const res = await createUser(this.name, this.email, this.pwd);
        if (res) {
          this.stepCallback(this.currentStep + 1, 'continue');
          setTimeout(() => {
            this.signUpCallback();
          }, 2);
        }
      }
    },
    // When firebase responds that
    signUpCallback() {},
  },
  mounted() {},
  updated() {},
  components: {},
};
</script>
