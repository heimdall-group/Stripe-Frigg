<template>
  <register-summary-error />
</template>

<script>
export default {
  setup() {
    useHead({
      title: '',
    });
    definePageMeta({
      middleware: ['restrict-auth']
    })
  },
  name: 'registerSummaryErrorPage',
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
