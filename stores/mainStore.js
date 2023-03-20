import { defineStore, storeToRefs } from 'pinia';
import { useTheme } from 'vuetify';

export const useMainStore = defineStore('MainStore', {
  state: () => {
    return {
      user: false,
      profile: null,
      plans: [
        {
          title: 'Name',
          price: 'Price',
          perks: [
            'Perk 1',
            'Perk 2',
            'Perk 3',
            'Perk 4',
            'Perk 5',
            'Perk 6',
            'Perk 7',
            'Perk 8',
          ],
        },
        {
          title: 'Name',
          price: 'Price',
          perks: [
            'Perk 1',
            'Perk 2',
            'Perk 3',
            'Perk 4',
            'Perk 5',
            'Perk 6',
            'Perk 7',
            'Perk 8',
          ],
        },
        {
          title: 'Name',
          price: 'Price',
          perks: [
            'Perk 1',
            'Perk 2',
            'Perk 3',
            'Perk 4',
            'Perk 5',
            'Perk 6',
            'Perk 7',
            'Perk 8',
          ],
        },
      ],
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
  },
  actions: {
    setUser(user) {
      this.user = user;
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
