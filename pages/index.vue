<template>
    <dashboard v-if="user"></dashboard>
    <landing-page v-else></landing-page>
</template>
  
<script>
import { useMainStore } from '~~/stores/mainStore';
export default {
    setup() {
        const store = useMainStore();
        definePageMeta({
          middleware: ['step-redirect']
        })
        return {
            store,
        };
    },
    name: "indexPage",
    data() {
        return {};
    },
    computed: {
        user() {
            return this.store.getUser;
        },
    },
    methods: {},
    mounted() { },
    updated() { },
};
</script>
  