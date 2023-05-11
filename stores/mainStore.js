import { defineStore } from 'pinia';

export const useMainStore = defineStore('MainStore', {
  state: () => {
    return {
      user: null,
      profile: null,
      plans: [],
      expired: {
        status: false,
        message: '',
      },
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
      currencies: [],
      currency: '',
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
    getCurrencies() {
      return this.currencies;
    },
    getCurrency() {
      return this.currency;
    },
    getExpired() {
      return this.expired;
    },
  },
  actions: {
    setUser(user) {
      this.user = user;
    },
    setUserStep(step) {
      this.user.step = step;
    },
    setUserStatus(status, expires) {
      this.user.status = status;
      if (status === 'canceled') {
        statusCanceledWarning(expires);
      } else if (status === 'expired') {
        this.expired = true;
      }
    },
    setUserExpires(expires) {
      this.user.expires = expires;
    },
    setExpired(expired, message) {
      this.expired.status = expired;
      this.expired.message = message;
    },
    setAlert(alert) {
      this.alert = alert;
    },
    setPlans(plans) {
      this.plans = plans;
    },
    setCurrencies(currencies) {
      this.currencies = currencies;
      this.setCurrency(currencies[0]);
    },
    setCurrency(currency) {
      this.currency = currency;
    },
    getUserData(payload) {
      fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify(payload)
      }).then(res => res.json()).then(async data => {
        this.profile = data.profile
      })
    }
  },
});
