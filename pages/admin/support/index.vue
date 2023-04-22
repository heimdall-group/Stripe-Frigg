<template>
  <admin-support></admin-support>
</template>

<script>
export default {
  setup() {
    definePageMeta({
        middleware: ['step-redirect', 'restrict-auth', 'restrict-admin-support']
      })
  },
  name: 'adminPage',
  data() {
    return {};
  },
  computed: {},
  methods: {},
  mounted() {},
  updated() {},
  components: {},
  
};
</script>
