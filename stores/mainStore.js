import { defineStore, storeToRefs } from 'pinia';
import { useTheme } from 'vuetify';

export const useMainStore = defineStore('MainStore', {
  state: () => {
    return {
      user: false,
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
    getPlans() {
      return this.plans;
    },
  },
  actions: {
    setUser(user) {
      this.user = user;
    },
  },
});
