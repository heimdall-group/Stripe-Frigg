<template>
  <div>
    <profile />
  </div>
</template>

<script>
export default {
  setup() {
    definePageMeta({
        middleware: ['step-redirect', 'restrict-auth']
      })
  },
  name: 'profilePage',
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
