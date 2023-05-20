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
      expired: false,
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
      (status)
      if (status === 'canceled') {
        alert_statusCanceled(expires);
      } else if (status === 'invoice-failed') {
        alert_statusInvoiceFailed();
      } else if (status === 'invoice-requires-action') {
        alert_statusInvoiceRequiresAction();
      } else if (status === 'expired') {
        this.expired = true;
      }
    },
    setUserExpires(expires) {
      this.user.expires = expires;
    },
    setExpired(expired) {
      this.expired = expired;
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
    },
    verify_requiredRule(value) {
      ('verify_requiredRule')
      return !!value || 'Required.'
    },
    verify_emailRule: (value) => {
      ('verify_emailRule')
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return pattern.test(value) || 'Invalid e-mail.';
    },
    verify_pwdMatchRule: (value, repeat) => {
      ('verify_pwdMatchRule')
      return repeat === value ? true : 'Password doesnt match';
    },
    verify_LengthRule: (value) => {
      ('verify_LengthRule')
      return value.length >= 6
        ? true
        : 'Password length needs to be atleast 6 characters';
    },
    verify_validateRequired(arr) {
      ('verify_validateRequired')
      for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        if (this.verify_requiredRule(item)) {
          continue;
        } else {
          return false;
        }
      }
      return true;
    },
    verify_validEmail() {

    },
  },
});
