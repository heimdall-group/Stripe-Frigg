import { defineStore, storeToRefs } from 'pinia'


export const useMainStore = defineStore("MainStore", {
    state: () => {
        return {
            user: null,
            firebaseAuth: false,
            error: null,
            count: 0
        }

    },
    getters: {
        getUser() {
            return this.user
        },
        getFirebaseAuth() {
            return this.firebaseAuth
        },
    },
    actions: {
        setUser(user) {
            this.user = user
        },
        setFirebaseAuth(firebaseAuth) {
            this.firebaseAuth = firebaseAuth
        }
    }
})