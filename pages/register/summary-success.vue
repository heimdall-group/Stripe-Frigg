<template>
  <register-summary-success />
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
  name: 'registerSummarySuccessPage',
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
