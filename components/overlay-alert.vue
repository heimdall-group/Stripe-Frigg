<template>
  <client-only>
    <v-list class="pa-0 pt-1 alert-list">
      <v-list-item
        class="px-4 py-1"
        v-for="(alert, index) in alerts"
        :key="index"
      >
        <v-alert
          :icon="alert.icon"
          :type="alert.type"
        >
          <v-row align="center">
            <v-col>
              <span v-if="typeof alert.message === 'object'">
                {{ alert.message.prepend }}
                <a 
                  v-if="alert.message.button.type === 'button-callback'"
                  @click="() => {alert.message.button.callback(alert)}"
                >
                  {{ alert.message.button.text }}
                </a>
                <nuxt-link
                  v-else-if="alert.message.button.type === 'button-link'"
                  nuxt
                  :to="alert.message.button.link"
                >
                  {{ alert.message.button.text }}
                </nuxt-link>
                {{ alert.message.append }}
              </span>
              <span v-if="typeof alert.message === 'string'">
                {{ alert.message }}
              </span>
            </v-col>
            <v-col cols="auto">
              <v-btn
                flat
                color="transparent"
                @click="() => {alertCallback(alert)}"
              >
                <font-awesome-icon icon="fa-solid fa-xmark" />
              </v-btn>
            </v-col>
          </v-row>
        </v-alert>
      </v-list-item>
      <v-list-item
        v-if="alerts.length > 1"
        class="px-4 py-1 alert-button-list-item"
      >
        <v-btn position="relative" class="alert-button" color="transparent" flat @click="alert_resetAlert">Clear all</v-btn>    
      </v-list-item>
    </v-list>
  </client-only>
</template>

<style>
.alert-list.v-list {
  position: fixed;
  z-index: 2000;
  background: transparent;
}

.alert-button-list-item {
  display: flex;
  justify-content: flex-end;
}

.alert-list.v-list, .alert-list .v-list-item, .alert-list .v-alert {
  width: 100%;
}

.alert-list .v-alert {
  border-radius: 0px;
  transform: translateX(0px);
  transition-property: transform;
  transition-duration: 500ms;
  border-radius: 8px;
}

.alert-list .v-alert__prepend {
  height: 36px;
}

.alert-list .v-alert__prepend .v-icon {
  color: unset;
}

.alert-list a {
  text-decoration: underline;
  color: unset;
  cursor: pointer;
}

/* .bg-warning {
  border-bottom: rgb(250, 171, 75) 3px solid;
} */

/* .bg-error {
  border-bottom: rgb(179, 80, 98) 3px solid;
} */

/* .bg-success {
  border-bottom: rgb(121, 197, 123) 3px solid;
} */

/* .bg-info {
  border-bottom: rgb(125, 185, 235) 3px solid;
} */
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
    };
  },
  computed: {
    alerts() {
      return this.store.getAlerts;
    },
  },
  methods: {
    alertCallback(alert) {
      this.store.patchAlerts(alert)
    },
  },
  mounted() {},
};
</script>
