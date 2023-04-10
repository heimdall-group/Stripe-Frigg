<template>
  <register-step2 />
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
  name: 'registerStep2Page',
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
