import { defineStore } from 'pinia';

export const useMainStore = defineStore('MainStore', {
  state: () => {
    return {
      user: null,
      profile: null,
      plans: [],
      registerSummary: {
        email: '',
        name: '',
        number: '',
        dateOfBirth: '',
        plan: '',
      },
      alert: {
        type: 'warning',
        status: false,
        message: '',
      },
      currencies: ['sek', 'usd'],
      currency: 'usd',
    };
  },
  getters: {
    getUser() {
      return this.user;
    },
    getProfile() {
      return this.profile;
    },
    getPlans() {
      return this.plans;
    },
    getAlert() {
      return this.alert;
    },
    getCurrency() {
      return this.currency;
    },
  },
  actions: {
    setUser(user) {
      this.user = user;
    },
    setStep(step) {
      console.log('this.setStep')
      this.user.step = step;
    },
    setAlert(alert) {
      this.alert = alert;
    },
    setPlans(plans) {
      this.plans = plans
    },
    getUserData(payload) {
      fetch('/api/profile', {
        method: 'POST',
        body: JSON.stringify(payload)
      }).then(res => res.json()).then(async data => {
        this.profile = data.profile
      })
    }
  },
});
