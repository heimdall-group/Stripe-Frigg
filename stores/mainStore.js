import { defineStore } from 'pinia';

export const useMainStore = defineStore('MainStore', {
  state: () => {
    return {
      user: null,
      plans: [],
      expired: false,
      alerts: [],
      currencies: [],
      currency: '',
      expired: false,
      mobile: true,
    };
  },
  getters: {
    getUser() {
      return this.user;
    },
    getUserProfile() {
      return this.profile;
    },
    getPlans() {
      return this.plans;
    },
    getAlerts() {
      return this.alerts;
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
    getMobile() {
      return this.mobile;
    }
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
      this.alerts.push(alert);
    },
    patchAlerts(alert) {
      const index = this.alerts.indexOf(alert);
      const arr = [...this.alerts];
      arr.splice(index, 1);
      this.alerts = arr;
    },
    resetAlerts() {
      this.alerts = [];
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
    setMobile() {
      this.mobile = window.innerWidth < 850;;
    },

    verify_requiredRule(value) {
      return !!value || 'Required.'
    },
    verify_emailRule: (value) => {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return pattern.test(value) || 'Invalid e-mail.';
    },
    verify_pwdMatchRule: (value, repeat) => {
      return repeat === value ? true : 'Password doesnt match';
    },
    verify_LengthRule: (value) => {
      return value.length >= 6
        ? true
        : 'Password length needs to be atleast 6 characters';
    },
    verify_validateRequired(arr) {
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
  },
});
