<template>
  <client-only>
    <v-alert
      :icon="alert.icon"
      position="absolute"
      :class="class"
      width="100%"
      v-if="alert.status"
      :type="alert.type"
    >
      <v-row align="center">
        <v-col>
          <span>
            {{ alert.message }}
          </span>
        </v-col>
        <v-col cols="auto">
          <v-btn
            flat
            color="transparent"
            @click="alertCallback"
          >
            <font-awesome-icon icon="fa-solid fa-xmark" />
          </v-btn>
        </v-col>
      </v-row>
    </v-alert>
  </client-only>
</template>

<style scoped>
.v-alert {
  z-index: 2000;
  border-radius: 0px;
  transform: translateX(0px);
  transition-property: transform;
  transition-duration: 500ms;
}

.fade-out {
  transform: translateY(-200px);
}

.v-alert__prepend {
  margin: 3px 0 0 0 !important;
}

.bg-warning {
  border-bottom: rgb(250, 171, 75) 3px solid;
}

.bg-error {
  border-bottom: rgb(179, 80, 98) 3px solid;
}

.bg-success {
  border-bottom: rgb(121, 197, 123) 3px solid;
}

.bg-info {
  border-bottom: rgb(125, 185, 235) 3px solid;
}
</style>

<script>
import { useMainStore } from '~~/stores/mainStore';

export default {
  setup() {
    const store = useMainStore();

    return {
      store,
    };
  },
  name: 'alertComponent',
  data() {
    return {
      clear: '',
      class: '',
    };
  },
  computed: {
    alert() {
      return this.store.getAlert;
    },
  },
  watch: {
    alert() {
      this.watcherCallback()
    },
  },
  methods: {
    alertCallback() {
      this.store.setAlert({
        type: 'warning',
        status: false,
        message: '',
      });
    },
    watcherCallback() {
        if(this.alert.type === 'success') {
          this.clear = setInterval(() => {
            this.class = 'fade-out';
            console.log('fadeout')
            setTimeout(() => {
              console.log('timeout')
              this.alertCallback();
            }, 500)
            clearInterval(this.clear);
          }, 3000);
        } else {
          clearInterval(this.clear);
          this.class = '';
        }
    }
  },
  mounted() {
    this.watcherCallback();
  },
};
</script>
