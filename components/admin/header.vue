<template>
  <!-- Desktop Admin Toolbar -->
  <v-toolbar v-if="!mobile" color="primary" location="top">
    <v-spacer></v-spacer>
    <v-row justify="end">
      <v-btn
        v-for="(link, index) in links"
        :key="index"
        nuxt 
        :to="link.to"
        rounded
      >
        {{ link.title }}
      </v-btn>
    </v-row>
  </v-toolbar>

  <!-- Mobile Admin Toolbar -->
  <v-toolbar v-if="mobile" color="primary" location="top">
    <v-spacer></v-spacer>
    <v-btn
      @click="mobile_sub_menu = !mobile_sub_menu"
      rounded
      flat
    >
      <client-only>
        <font-awesome-icon icon="fa-solid fa-bars" />
      </client-only>
    </v-btn>
  </v-toolbar>

  <!-- Mobile Navigation Drawer -->
  <v-navigation-drawer
    v-if="mobile"
    color="primary"
    temporary
    app
    v-model="mobile_sub_menu"
  >
    <v-list>
      <v-list-item
        v-for="(link, index) in links" 
        :key="index" 
        rounded 
        class="my-2"
      >
        <v-btn nuxt :to="link.to" rounded flat width="100%">
          {{ link.title }}
        </v-btn>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  setup() {},
  name: 'adminHeaderComponent',
  data() {
    return {
      mobile_sub_menu: false,
      links: [
      ]
    };
  },
  computed: {},
  props: {
    mobile: {
      required: true,
      type: Boolean,
    }
  },
  methods: {},
  mounted() {},
  updated() {},
  components: {},
  emits: []
};
</script>
