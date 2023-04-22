<template>
  <admin></admin>
</template>

<script>
export default {
  setup() {
    definePageMeta({
        middleware: ['step-redirect', 'restrict-auth', 'restrict-admin']
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
