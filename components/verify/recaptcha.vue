<template>
  <client-only>
    <div
      id="recaptcha-container"
      class="d-flex justify-center mb-4"
      :data-sitekey="recaptchaSitekey"
    ></div>
  </client-only>
</template>

<script>
export default {
  setup() {
    useHead({
      script: [
        {
          hid: 'recaptcha v2',
          src: `https://www.google.com/recaptcha/api.js?render=${
            useRuntimeConfig().public.recaptcha_v3
          }`,
          defer: true,
          async: true,
        },
      ],
    });
    return {};
  },
  name: 'verifyRecaptchaComponent',
  data() {
    return {
      recaptchaSitekey: useRuntimeConfig().public.recaptcha_v2,
    };
  },
  computed: {},
  methods: {},
  mounted() {},
  updated() {},
  components: {},
  emits: [],
};
</script>
