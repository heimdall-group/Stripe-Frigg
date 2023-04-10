<template>
  <register-step1 />
</template>

<script>
export default {
  setup() {
    useHead({
      title: '',
    });
    definePageMeta({
      middleware: ['step-redirect', 'restrict-no-auth']
    })
  },
  name: 'registerStep1Page',
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
