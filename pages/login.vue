<template>
  <div>
    <login/>
  </div>
</template>

<script>
export default {
  setup() {
    definePageMeta({
        middleware: ['step-redirect', 'restrict-no-auth']
      })
  },
  name: 'loginPage',
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
