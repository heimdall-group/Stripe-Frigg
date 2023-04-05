<template>
  <register-step3 />
</template>

<script>
export default {
  setup() {
    useHead({
      title: '',
    });
    definePageMeta({
      middleware: 'restrict-auth'
    })
  },
  name: 'registerStep3Page',
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
